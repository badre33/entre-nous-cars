-- Correctif incrémental de 20261126000000_partner_agencies.sql (revue Codex du 26/11/2026, PR #141).
-- S'applique sur une base qui a déjà la migration initiale (préproduction), ou juste après elle (production).
-- Conserve les inscriptions existantes ; aucune table n'est supprimée ni recréée.
--  1. Même clé + même contenu normalisé = rejeu ; même clé + contenu différent = conflit 23505, sans écrasement.
--  2. Statut « verifie » impossible sans registre de commerce, ICE et date de vérification (vides et espaces refusés).
--  3. bank_account limité au RIB marocain : 24 chiffres, sans espace ni texte (donc sans nom du titulaire).
--  4. Limite de 3 inscriptions sur 24 h comptée sur le téléphone ET sur l'e-mail fournis.
BEGIN;
SET LOCAL lock_timeout = '5s';
LOCK TABLE public.partner_agencies, partner_intake_private.submissions IN SHARE ROW EXCLUSIVE MODE;

DO $$
DECLARE v_bad integer;
BEGIN
  IF to_regprocedure('public.register_partner(uuid,text,text,text,text,integer,text,text)') IS NULL THEN
    RAISE EXCEPTION 'register_partner missing: apply 20261126000000 first';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='partner_intake_private' AND table_name='submissions' AND column_name='payload') THEN
    RAISE EXCEPTION 'fix already applied: inspect target';
  END IF;
  SELECT count(*) INTO v_bad FROM public.partner_agencies
   WHERE (status='verifie' AND (nullif(btrim(coalesce(registre_commerce,'')),'') IS NULL
                               OR nullif(btrim(coalesce(ice,'')),'') IS NULL OR verified_at IS NULL))
      OR (bank_account IS NOT NULL AND bank_account !~ '^[0-9]{24}$');
  IF v_bad > 0 THEN
    RAISE EXCEPTION '% partner row(s) violate the new rules: fix them by hand first', v_bad;
  END IF;
  SELECT count(*) INTO v_bad FROM partner_intake_private.submissions s
   WHERE NOT EXISTS (SELECT 1 FROM public.partner_agencies a WHERE a.id=s.partner_id);
  IF v_bad > 0 THEN RAISE EXCEPTION 'orphan submissions: inspect target'; END IF;
END $$;

-- 1 et 4 : contenu normalisé et contacts séparés dans le registre privé.
ALTER TABLE partner_intake_private.submissions
  ADD COLUMN payload jsonb, ADD COLUMN phone text, ADD COLUMN email text;
UPDATE partner_intake_private.submissions s SET
  payload = jsonb_build_object('agency_name',a.agency_name,'city',a.city,'phone',a.phone,'email',a.email,
                               'fleet_size',a.fleet_size,'message',a.message,'language',a.language),
  phone = a.phone, email = a.email
FROM public.partner_agencies a WHERE a.id = s.partner_id;
ALTER TABLE partner_intake_private.submissions
  ALTER COLUMN payload SET NOT NULL,
  ADD CONSTRAINT submissions_contact_required CHECK (phone IS NOT NULL OR email IS NOT NULL);
DROP INDEX partner_intake_private.partner_submissions_contact_time;
ALTER TABLE partner_intake_private.submissions DROP COLUMN contact;
CREATE INDEX partner_submissions_phone_time ON partner_intake_private.submissions(phone, created_at) WHERE phone IS NOT NULL;
CREATE INDEX partner_submissions_email_time ON partner_intake_private.submissions(email, created_at) WHERE email IS NOT NULL;

-- 2 et 3 : règles garanties par la base, pas seulement par l'écran.
ALTER TABLE public.partner_agencies
  ADD CONSTRAINT partner_verified_requires_documents CHECK (
    status <> 'verifie' OR (
      nullif(btrim(coalesce(registre_commerce,'')),'') IS NOT NULL
      AND nullif(btrim(coalesce(ice,'')),'') IS NOT NULL
      AND verified_at IS NOT NULL)),
  ADD CONSTRAINT partner_bank_account_rib CHECK (bank_account IS NULL OR bank_account ~ '^[0-9]{24}$');
COMMENT ON COLUMN public.partner_agencies.bank_account IS
  'RIB marocain : 24 chiffres seulement (banque, ville, compte, clé), jamais le nom du titulaire. IBAN non accepté à ce stade.';

CREATE OR REPLACE FUNCTION public.register_partner(
  p_idempotency_key uuid, p_agency_name text, p_city text, p_phone text, p_email text,
  p_fleet_size integer, p_message text, p_language text
) RETURNS TABLE(created boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $fn$
DECLARE
  v_name text := btrim(p_agency_name);
  v_phone text := nullif(regexp_replace(coalesce(btrim(p_phone),''), '[[:space:].()-]', '', 'g'), '');
  v_email text := nullif(lower(btrim(coalesce(p_email,''))), '');
  v_message text := nullif(btrim(coalesce(p_message,'')), '');
  v_language text := coalesce(p_language,'fr');
  v_payload jsonb;
  v_existing jsonb;
  v_contact text;
  v_id uuid;
BEGIN
  IF p_idempotency_key IS NULL OR v_name IS NULL OR length(v_name) NOT BETWEEN 2 AND 80
     OR p_city IS NULL OR p_city NOT IN ('Casablanca','Rabat')
     OR v_language NOT IN ('fr','en','es')
     OR (p_fleet_size IS NOT NULL AND p_fleet_size NOT BETWEEN 1 AND 5000)
     OR (v_message IS NOT NULL AND length(v_message) > 1000) THEN
    RAISE EXCEPTION 'invalid_partner' USING ERRCODE='22023';
  END IF;
  IF left(v_phone,2)='00' THEN v_phone := '+' || substr(v_phone,3); END IF;
  IF v_phone IS NOT NULL AND v_phone !~ '^\+[1-9][0-9]{7,14}$' THEN
    RAISE EXCEPTION 'invalid_partner_phone' USING ERRCODE='22023';
  END IF;
  IF v_email IS NOT NULL AND (length(v_email) > 120 OR v_email !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$') THEN
    RAISE EXCEPTION 'invalid_partner_email' USING ERRCODE='22023';
  END IF;
  IF v_phone IS NULL AND v_email IS NULL THEN
    RAISE EXCEPTION 'partner_contact_required' USING ERRCODE='22023';
  END IF;
  v_payload := jsonb_build_object('agency_name',v_name,'city',p_city,'phone',v_phone,'email',v_email,
                                  'fleet_size',p_fleet_size,'message',v_message,'language',v_language);

  -- Verrou de la clé d'abord, puis des contacts dans un ordre fixe (pas d'interblocage).
  PERFORM pg_advisory_xact_lock(hashtextextended('partner:key:'||p_idempotency_key::text,0));
  SELECT s.payload INTO v_existing FROM partner_intake_private.submissions s WHERE s.idempotency_key=p_idempotency_key;
  IF FOUND THEN
    IF v_existing = v_payload THEN RETURN QUERY SELECT false; RETURN; END IF;
    RAISE EXCEPTION 'partner_idempotency_conflict' USING ERRCODE='23505';
  END IF;
  FOR v_contact IN
    SELECT c FROM unnest(ARRAY['phone:'||v_phone, 'email:'||v_email]) AS c WHERE c IS NOT NULL ORDER BY c
  LOOP
    PERFORM pg_advisory_xact_lock(hashtextextended('partner:contact:'||v_contact,0));
  END LOOP;
  -- Protection partielle : 3 inscriptions sur 24 h par téléphone et par e-mail fournis.
  -- Des coordonnées toutes différentes à chaque envoi ne sont pas freinées par cette règle.
  IF (SELECT count(*) FROM partner_intake_private.submissions s
      WHERE s.created_at > now() - interval '24 hours'
        AND ((v_phone IS NOT NULL AND s.phone = v_phone) OR (v_email IS NOT NULL AND s.email = v_email))) >= 3 THEN
    RAISE EXCEPTION 'partner_rate_limited' USING ERRCODE='P0001';
  END IF;

  INSERT INTO public.partner_agencies(agency_name, city, phone, email, fleet_size, message, language)
    VALUES (v_name, p_city, v_phone, v_email, p_fleet_size, v_message, v_language)
    RETURNING id INTO v_id;
  INSERT INTO partner_intake_private.submissions(idempotency_key, partner_id, payload, phone, email)
    VALUES (p_idempotency_key, v_id, v_payload, v_phone, v_email);
  RETURN QUERY SELECT true;
END;
$fn$;
REVOKE ALL ON FUNCTION public.register_partner(uuid,text,text,text,text,integer,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_partner(uuid,text,text,text,text,integer,text,text) TO anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA partner_intake_private FROM PUBLIC, anon, authenticated;
NOTIFY pgrst,'reload schema';
COMMIT;
