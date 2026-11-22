-- REVIEW CANDIDATE ONLY. Not applied to production.
-- Catalogue checked against main files fetched 21 November; blob SHAs in source-manifest.json.
-- Fresh install ONLY: submit_booking must not exist. Supersedes the 18 November candidate.
-- For the already installed preproduction, use the separate remove_seat_ibiza patch.
-- Run preflight.sql first on the target; compare with the repository schema.
-- Keep VITE_BOOKING_PERSISTENCE off until target integration tests pass.
BEGIN;
SET LOCAL lock_timeout = '5s';

DO $$
BEGIN
  IF to_regclass('public.rental_requests') IS NULL THEN
    RAISE EXCEPTION 'rental_requests missing: inspect target schema';
  END IF;
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid='public.rental_requests'::regclass) THEN
    RAISE EXCEPTION 'rental_requests must have RLS enabled';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public'
                AND tablename='rental_requests' AND policyname='rental_admin_read') THEN
    RAISE EXCEPTION 'Expected admin policies missing: inspect target schema';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
             WHERE n.nspname='public' AND p.proname='submit_booking') THEN
    RAISE EXCEPTION 'submit_booking already exists: do not overwrite another implementation';
  END IF;
END $$;

-- Additive change: no existing row, workflow value, grant or RLS policy rewritten.
ALTER TABLE public.rental_requests
  ADD COLUMN booking_reference text UNIQUE,
  ADD COLUMN requested_vehicles text[],
  ADD COLUMN other_vehicle_name text,
  ADD COLUMN estimated_totals_client integer[],
  ADD COLUMN pickup_point text,
  ADD COLUMN pickup_address text,
  ADD COLUMN payment_choice text,
  ADD COLUMN booking_language text,
  ADD COLUMN intake_test_hint boolean NOT NULL DEFAULT false,
  ADD COLUMN intake_test_verified boolean NOT NULL DEFAULT false;
ALTER TABLE public.rental_requests ADD CONSTRAINT booking_reference_format
  CHECK (booking_reference IS NULL OR booking_reference ~ '^BN-[A-Z0-9]{6}$');
COMMENT ON COLUMN public.rental_requests.estimated_totals_client IS
  'Unverified client estimates, total rental MAD per vehicle in preference order. Never authoritative for payment.';
COMMENT ON COLUMN public.rental_requests.other_vehicle_name IS
  'Customer-entered off-catalogue model, 2-60 characters after trimming. Position is the Autre modèle marker in requested_vehicles. Not analytics data.';
COMMENT ON COLUMN public.rental_requests.intake_test_hint IS
  'Untrusted browser hint. Does not exclude the request from admin lists.';
COMMENT ON COLUMN public.rental_requests.intake_test_verified IS
  'Admin-reviewed test flag. submit_booking always inserts false.';

-- This schema must NOT be in PostgREST exposed schemas.
CREATE SCHEMA booking_intake_private;
REVOKE ALL ON SCHEMA booking_intake_private FROM PUBLIC, anon, authenticated;
CREATE TABLE booking_intake_private.vehicle_allowlist (
  name text PRIMARY KEY, slug text NOT NULL UNIQUE
);
INSERT INTO booking_intake_private.vehicle_allowlist(name,slug) VALUES
 ('Renault Clio','renault-clio'),('Dacia Duster','dacia-duster'),
 ('Volkswagen Golf','vw-golf'),('Hyundai Tucson','hyundai-tucson'),
 ('Kia Sportage','kia-sportage'),
 ('Hyundai Accent','hyundai-accent'),('Dacia Sandero','dacia-sandero'),
 ('Dacia Logan','dacia-logan'),('Dacia Sandero Stepway','dacia-sandero-stepway'),
 ('Dacia Jogger','dacia-jogger'),('Opel Corsa','opel-corsa'),
 ('Peugeot 208','peugeot-208'),('Hyundai i20','hyundai-i20'),('Hyundai i10','hyundai-i10'),
 ('Volkswagen T-Roc','vw-t-roc'),('Audi A3','audi-a3'),
 ('Mercedes Classe A','mercedes-classe-a'),('Range Rover Evoque','range-rover-evoque'),
 ('Range Rover Sport','range-rover-sport'),('Mercedes CLA','mercedes-cla'),
 ('Audi Q3 Sportback','audi-q3-sportback'),('Mercedes GLA','mercedes-gla'),
 ('Volkswagen Touareg','vw-touareg'),('Cupra Formentor','cupra-formentor'),
 ('Mercedes Classe C','mercedes-classe-c'),('Porsche Macan','porsche-macan');
CREATE TABLE booking_intake_private.pickup_allowlist (
  id text PRIMARY KEY, city text NOT NULL
);
INSERT INTO booking_intake_private.pickup_allowlist(id,city) VALUES
 ('cmn','Casablanca'),('casa-voyageurs','Casablanca'),('casa-port','Casablanca'),
 ('oasis','Casablanca'),('ain-sebaa','Casablanca'),('rba','Rabat'),
 ('rabat-agdal','Rabat'),('rabat-ville','Rabat');
CREATE TABLE booking_intake_private.submissions (
  idempotency_key uuid PRIMARY KEY,
  rental_request_id uuid NOT NULL UNIQUE REFERENCES public.rental_requests(id),
  reference text NOT NULL UNIQUE,
  payload jsonb NOT NULL,
  session_id text,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX booking_submissions_phone_time ON booking_intake_private.submissions(phone,created_at);
CREATE INDEX booking_submissions_session_time ON booking_intake_private.submissions(session_id,created_at);
REVOKE ALL ON ALL TABLES IN SCHEMA booking_intake_private FROM PUBLIC, anon, authenticated;

CREATE FUNCTION public.submit_booking(
  p_idempotency_key uuid, p_vehicles text[], p_other_vehicle text, p_estimates_client integer[],
  p_start_date date, p_end_date date, p_city text, p_pickup_id text,
  p_pickup_address text, p_payment text, p_phone text, p_language text,
  p_session_id text, p_test_hint boolean
) RETURNS TABLE(reference text, created boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $fn$
DECLARE
  v_payload jsonb;
  v_previous booking_intake_private.submissions%ROWTYPE;
  v_phone text := regexp_replace(btrim(p_phone), '[[:space:].()-]', '', 'g');
  v_address text := nullif(btrim(p_pickup_address),'');
  v_other_vehicle text := btrim(p_other_vehicle);
  v_other_count integer;
  v_estimates integer[];
  v_reference text;
  v_id uuid;
  v_slug text;
  v_saved boolean := false;
BEGIN
  -- Cheap shape/size checks happen before locks or JSON construction.
  IF p_idempotency_key IS NULL OR p_vehicles IS NULL
     OR cardinality(p_vehicles) NOT BETWEEN 1 AND 3
     OR array_ndims(p_vehicles) <> 1 OR array_lower(p_vehicles,1) <> 1
     OR EXISTS (SELECT 1 FROM unnest(p_vehicles) v WHERE v IS NULL OR length(v)>80)
     OR (p_estimates_client IS NOT NULL AND
         (cardinality(p_estimates_client)<>cardinality(p_vehicles)
          OR array_ndims(p_estimates_client)<>1 OR array_lower(p_estimates_client,1)<>1))
     OR coalesce(length(p_phone),0)>40 OR coalesce(length(p_pickup_address),0)>200
     OR coalesce(length(p_city),0)>40 OR coalesce(length(p_pickup_id),0)>80
     OR coalesce(length(p_payment),0)>20 OR coalesce(length(p_language),0)>5
     OR coalesce(length(p_session_id),0)>100 THEN
    RAISE EXCEPTION 'invalid_booking_payload' USING ERRCODE='22023';
  END IF;
  IF left(v_phone,2)='00' THEN v_phone := '+' || substr(v_phone,3); END IF;
  IF v_phone IS NULL OR v_phone !~ '^\+[1-9][0-9]{7,14}$' THEN
    RAISE EXCEPTION 'invalid_phone' USING ERRCODE='22023';
  END IF;
  v_estimates := coalesce(p_estimates_client, array_fill(NULL::integer, ARRAY[cardinality(p_vehicles)]));
  IF EXISTS (SELECT 1 FROM unnest(v_estimates) e WHERE e<0 OR e>200000) THEN
    RAISE EXCEPTION 'invalid_estimate' USING ERRCODE='22023';
  END IF;
  SELECT count(*) INTO v_other_count FROM unnest(p_vehicles) v WHERE v='Autre modèle';
  IF v_other_count>1
     OR (v_other_count=1 AND (v_other_vehicle IS NULL OR length(v_other_vehicle) NOT BETWEEN 2 AND 60))
     OR (v_other_count=0 AND p_other_vehicle IS NOT NULL) THEN
    RAISE EXCEPTION 'invalid_other_vehicle' USING ERRCODE='22023';
  END IF;
  IF v_other_count=1 AND v_estimates[array_position(p_vehicles,'Autre modèle')] IS NOT NULL THEN
    RAISE EXCEPTION 'invalid_other_vehicle_estimate' USING ERRCODE='22023';
  END IF;
  IF p_pickup_id <> 'other' THEN v_address := NULL; END IF;
  -- Immutable business payload; session and test hints do not alter identity.
  v_payload := jsonb_build_object('vehicles',p_vehicles,'other_vehicle',v_other_vehicle,'estimates_client',v_estimates,
    'start',p_start_date,'end',p_end_date,'city',p_city,'pickup',p_pickup_id,
    'address',v_address,'payment',p_payment,'phone',v_phone,'language',p_language);
  PERFORM pg_advisory_xact_lock(hashtextextended('booking:key:'||p_idempotency_key::text,0));
  SELECT s.* INTO v_previous FROM booking_intake_private.submissions s
    WHERE s.idempotency_key=p_idempotency_key;
  IF FOUND THEN
    IF v_previous.payload IS DISTINCT FROM v_payload THEN
      RAISE EXCEPTION 'idempotency_conflict' USING ERRCODE='23505';
    END IF;
    -- Replays remain possible after midnight or a catalogue update.
    RETURN QUERY SELECT v_previous.reference,false;
    RETURN;
  END IF;
  IF p_start_date IS NULL OR p_end_date IS NULL
     OR NOT isfinite(p_start_date) OR NOT isfinite(p_end_date)
     OR p_start_date < (current_timestamp AT TIME ZONE 'Africa/Casablanca')::date
     OR p_start_date > DATE '9999-01-01'
     OR p_end_date < p_start_date + 3
     OR p_end_date > (p_start_date + interval '6 months')::date THEN
    RAISE EXCEPTION 'invalid_rental_period' USING ERRCODE='22023';
  END IF;
  IF p_city IS NULL OR p_city NOT IN ('Casablanca','Rabat')
     OR p_payment IS NULL OR p_payment NOT IN ('deposit','full')
     OR p_language IS NULL OR p_language NOT IN ('fr','en','es')
     OR p_pickup_id IS NULL THEN
    RAISE EXCEPTION 'invalid_booking_option' USING ERRCODE='22023';
  END IF;
  IF p_pickup_id='other' THEN
    IF v_address IS NULL OR length(v_address) NOT BETWEEN 5 AND 200 THEN
      RAISE EXCEPTION 'invalid_pickup_address' USING ERRCODE='22023';
    END IF;
  ELSIF NOT EXISTS (SELECT 1 FROM booking_intake_private.pickup_allowlist p
                    WHERE p.id=p_pickup_id AND p.city=p_city) THEN
    RAISE EXCEPTION 'invalid_pickup_city' USING ERRCODE='22023';
  END IF;
  IF (SELECT count(DISTINCT v) FROM unnest(p_vehicles) v) <> cardinality(p_vehicles)
     OR EXISTS (SELECT 1 FROM unnest(p_vehicles) v
                WHERE v<>'Autre modèle' AND NOT EXISTS (SELECT 1 FROM booking_intake_private.vehicle_allowlist a WHERE a.name=v)) THEN
    RAISE EXCEPTION 'invalid_vehicle' USING ERRCODE='22023';
  END IF;
  -- Partial abuse protection only. Phone/session are client supplied, not identity.
  -- Proposed thresholds for staging review: 5 / phone / 15 min, 10 / session / 15 min.
  PERFORM pg_advisory_xact_lock(hashtextextended('booking:phone:'||v_phone,0));
  IF p_session_id IS NOT NULL THEN
    PERFORM pg_advisory_xact_lock(hashtextextended('booking:session:'||p_session_id,0));
  END IF;
  IF (SELECT count(*) FROM booking_intake_private.submissions s
      WHERE s.phone=v_phone AND s.created_at>now()-interval '15 minutes')>=5
     OR (p_session_id IS NOT NULL AND (SELECT count(*) FROM booking_intake_private.submissions s
      WHERE s.session_id=p_session_id AND s.created_at>now()-interval '15 minutes')>=10) THEN
    RAISE EXCEPTION 'booking_rate_limited' USING ERRCODE='P0001';
  END IF;
  SELECT a.slug INTO v_slug FROM booking_intake_private.vehicle_allowlist a WHERE a.name=p_vehicles[1];
  FOR attempt IN 1..8 LOOP
    v_reference := 'BN-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
    INSERT INTO public.rental_requests(
      full_name,phone,vehicle_name,vehicle_slug,city,pickup_date,return_date,
      status,received_at,whatsapp_sent,attribution_confidence,
      booking_reference,requested_vehicles,other_vehicle_name,estimated_totals_client,
      pickup_point,pickup_address,payment_choice,booking_language,
      intake_test_hint,intake_test_verified,notes
    ) VALUES (
      'Réservation web '||v_reference,v_phone,array_to_string(p_vehicles,' / '),v_slug,
      p_city,p_start_date,p_end_date,'new',now(),false,'unknown',
      v_reference,p_vehicles,v_other_vehicle,v_estimates,p_pickup_id,v_address,p_payment,p_language,
      coalesce(p_test_hint,false),false,
      'Réservation web '||v_reference||E'\nVoitures (ordre de préférence) : '||array_to_string(p_vehicles,' / ')||
      coalesce(E'\nAutre modèle, sur demande : '||v_other_vehicle,'')||
      E'\nLieu : '||p_pickup_id||coalesce(' — '||v_address,'')||
      E'\nPaiement choisi : '||p_payment||E'\nEstimations client non vérifiées (MAD, ordre des voitures) : '||
      array_to_string(v_estimates,', ','non renseigné')||
      CASE WHEN coalesce(p_test_hint,false) THEN E'\nIndication TEST du navigateur, non vérifiée.' ELSE '' END
    ) ON CONFLICT (booking_reference) DO NOTHING RETURNING id INTO v_id;
    IF FOUND THEN v_saved := true; EXIT; END IF;
  END LOOP;
  IF NOT v_saved THEN RAISE EXCEPTION 'reference_generation_failed' USING ERRCODE='P0001'; END IF;
  INSERT INTO booking_intake_private.submissions(idempotency_key,rental_request_id,reference,payload,session_id,phone)
    VALUES(p_idempotency_key,v_id,v_reference,v_payload,p_session_id,v_phone);
  RETURN QUERY SELECT v_reference,true;
END;
$fn$;
REVOKE ALL ON FUNCTION public.submit_booking(uuid,text[],text,integer[],date,date,text,text,text,text,text,text,text,boolean)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_booking(uuid,text[],text,integer[],date,date,text,text,text,text,text,text,text,boolean)
  TO anon, authenticated;
NOTIFY pgrst,'reload schema';
COMMIT;
