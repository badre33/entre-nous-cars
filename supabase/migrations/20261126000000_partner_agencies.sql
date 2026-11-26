-- Loueurs partenaires, étape 1 (décisions de Badre du 18/11/2026) : inscription sans frein
-- (agence, ville, téléphone ou e-mail), suivi et vérification dans le back-office.
-- Aucune diffusion automatique des demandes à ce stade : Badre transmet à la main.
-- À appliquer d'abord en préproduction ; production uniquement avec le feu vert de Badre.
BEGIN;
SET LOCAL lock_timeout = '5s';

DO $$
BEGIN
  IF to_regclass('public.partner_agencies') IS NOT NULL THEN
    RAISE EXCEPTION 'partner_agencies already exists: inspect target';
  END IF;
  IF to_regprocedure('public.has_role(uuid, public.app_role)') IS NULL THEN
    RAISE EXCEPTION 'has_role missing: inspect target';
  END IF;
END $$;

CREATE TABLE public.partner_agencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  agency_name text NOT NULL CHECK (length(btrim(agency_name)) BETWEEN 2 AND 80),
  city text NOT NULL CHECK (city IN ('Casablanca','Rabat')),
  phone text CHECK (phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$'),
  email text CHECK (email IS NULL OR (length(email) <= 120 AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')),
  fleet_size integer CHECK (fleet_size IS NULL OR fleet_size BETWEEN 1 AND 5000),
  message text CHECK (message IS NULL OR length(message) <= 1000),
  language text NOT NULL DEFAULT 'fr' CHECK (language IN ('fr','en','es')),
  -- Suivi administrateur
  status text NOT NULL DEFAULT 'inscrit'
    CHECK (status IN ('inscrit','attribution_provisoire','verifie','suspendu')),
  registre_commerce text CHECK (registre_commerce IS NULL OR length(registre_commerce) <= 60),
  ice text CHECK (ice IS NULL OR length(ice) <= 30),
  bank_account text CHECK (bank_account IS NULL OR length(bank_account) <= 60),
  admin_notes text CHECK (admin_notes IS NULL OR length(admin_notes) <= 4000),
  verified_at timestamptz,
  CONSTRAINT partner_contact_required CHECK (phone IS NOT NULL OR email IS NOT NULL)
);
COMMENT ON TABLE public.partner_agencies IS
  'Loueurs partenaires inscrits sur /partenaires. Lecture et suivi réservés à l''administrateur.';
COMMENT ON COLUMN public.partner_agencies.bank_account IS
  'Numéros bancaires seulement (jamais le nom du titulaire), pour le paiement direct éventuel.';

ALTER TABLE public.partner_agencies ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.partner_agencies FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT, UPDATE ON public.partner_agencies TO authenticated;
CREATE POLICY partner_admin_read ON public.partner_agencies FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY partner_admin_update ON public.partner_agencies FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE FUNCTION public.set_partner_agencies_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $fn$
BEGIN NEW.updated_at := now(); RETURN NEW; END;
$fn$;
REVOKE ALL ON FUNCTION public.set_partner_agencies_updated_at() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER partner_agencies_updated_at BEFORE UPDATE ON public.partner_agencies
  FOR EACH ROW EXECUTE FUNCTION public.set_partner_agencies_updated_at();

-- Registre privé d'idempotence (non exposé) : même clé = même inscription, jamais de doublon.
CREATE SCHEMA partner_intake_private;
REVOKE ALL ON SCHEMA partner_intake_private FROM PUBLIC, anon, authenticated;
CREATE TABLE partner_intake_private.submissions (
  idempotency_key uuid PRIMARY KEY,
  partner_id uuid NOT NULL UNIQUE REFERENCES public.partner_agencies(id),
  contact text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX partner_submissions_contact_time ON partner_intake_private.submissions(contact, created_at);
REVOKE ALL ON ALL TABLES IN SCHEMA partner_intake_private FROM PUBLIC, anon, authenticated;

CREATE FUNCTION public.register_partner(
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
  v_id uuid;
BEGIN
  IF p_idempotency_key IS NULL OR v_name IS NULL OR length(v_name) NOT BETWEEN 2 AND 80
     OR p_city IS NULL OR p_city NOT IN ('Casablanca','Rabat')
     OR coalesce(p_language,'fr') NOT IN ('fr','en','es')
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

  PERFORM pg_advisory_xact_lock(hashtextextended('partner:key:'||p_idempotency_key::text,0));
  IF EXISTS (SELECT 1 FROM partner_intake_private.submissions s WHERE s.idempotency_key=p_idempotency_key) THEN
    RETURN QUERY SELECT false; RETURN;
  END IF;
  -- Protection partielle contre l'abus : 3 inscriptions par contact sur 24 h.
  PERFORM pg_advisory_xact_lock(hashtextextended('partner:contact:'||coalesce(v_phone,v_email),0));
  IF (SELECT count(*) FROM partner_intake_private.submissions s
      WHERE s.contact=coalesce(v_phone,v_email) AND s.created_at > now() - interval '24 hours') >= 3 THEN
    RAISE EXCEPTION 'partner_rate_limited' USING ERRCODE='P0001';
  END IF;

  INSERT INTO public.partner_agencies(agency_name, city, phone, email, fleet_size, message, language)
    VALUES (v_name, p_city, v_phone, v_email, p_fleet_size, v_message, coalesce(p_language,'fr'))
    RETURNING id INTO v_id;
  INSERT INTO partner_intake_private.submissions(idempotency_key, partner_id, contact)
    VALUES (p_idempotency_key, v_id, coalesce(v_phone,v_email));
  RETURN QUERY SELECT true;
END;
$fn$;
REVOKE ALL ON FUNCTION public.register_partner(uuid,text,text,text,text,integer,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_partner(uuid,text,text,text,text,integer,text,text) TO anon, authenticated;
NOTIFY pgrst,'reload schema';
COMMIT;
