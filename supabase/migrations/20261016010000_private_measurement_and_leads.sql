-- R09: controlled analytics and administrator-only manual lead tracking.
-- Apply to the existing new project only after reviewing and approving the
-- administrator access change. No row is deleted or rewritten by this migration.
BEGIN;
DO $$ BEGIN
 IF (SELECT count(*) FROM public.user_roles WHERE role='admin') > 1 THEN
  RAISE EXCEPTION 'Expected at most one administrator; review roles before continuing';
 END IF;
 IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid='public.rental_requests'::regclass) THEN
  RAISE EXCEPTION 'RLS must be enabled before granting private lead access';
 END IF;
END $$;
CREATE OR REPLACE FUNCTION public.analytics_safe_path(value text) RETURNS text LANGUAGE sql IMMUTABLE SET search_path=public,pg_temp AS $$ SELECT CASE WHEN split_part(split_part(coalesce(value,''),'?',1),'#',1) = ANY(ARRAY['/','/a-propos','/accident-voiture-location-maroc-que-faire','/age-minimum-location-voiture-maroc','/analytics','/auth','/avis-clients-benatna-2026','/benatna-vs-avis-hertz-europcar-sixt','/blog','/blog/assurance-voiture-maroc','/blog/budget-location-maroc','/blog/budget-voyage-maroc-2025','/blog/carburant-maroc','/blog/conduire-au-maroc-quand-on-est-etranger','/blog/conseils-conduite-maroc','/blog/guide-complet-location-voiture-maroc-2025','/blog/guide-quartier-maarif-casablanca-voiture','/blog/louer-voiture-maroc-sans-carte-credit-mre','/blog/marrakech-en-voiture-guide','/blog/marrakech-merzouga-voiture-itineraire','/blog/meilleurs-spots-ain-diab-casablanca-voiture','/blog/pourquoi-benatna','/blog/quartier-gueliz-marrakech-guide-voiture','/blog/road-trip-atlas-marrakech-4x4','/blog/road-trips-maroc','/blog/stationnement-maroc','/caution-location-voiture-maroc','/comparatif/dacia-duster-vs-renault-captur-maroc','/comparatif/location-aeroport-vs-centre-ville-maroc','/comparatif/location-courte-duree-vs-longue-duree-maroc','/comparatif/location-economique-vs-premium-maroc','/comparatif/location-voiture-casablanca-vs-marrakech','/comparatif/renault-clio-vs-dacia-sandero-maroc','/comparatifs','/conduire-maroc-permis-etranger','/contact','/courte-vs-longue-duree-location-voiture-maroc','/demandes','/en','/en/a-propos','/en/blog','/en/contact','/en/louer','/en/partenaires','/es','/es/a-propos','/es/blog','/es/contact','/es/louer','/es/partenaires','/essence-ou-diesel-location-voiture-maroc','/eviter-arnaques-location-voiture-maroc','/faq','/glossaire','/guide-maroc','/location-4x4-desert','/location-cabriolet-agadir','/location-jeune-conducteur-casablanca','/location-jeune-conducteur-marrakech','/location-jeune-conducteur-rabat','/location-longue-duree-casablanca','/location-longue-duree-marrakech','/location-suv-atlas','/location-suv-sud-maroc','/location-utilitaire-demenagement-casablanca','/location-van-famille-maroc','/location-voiture-aeroport-agadir','/location-voiture-aeroport-casablanca','/location-voiture-aeroport-fes','/location-voiture-aeroport-marrakech','/location-voiture-aeroport-rabat','/location-voiture-aeroport-tanger','/location-voiture-agadir','/location-voiture-agdal-rabat','/location-voiture-ain-diab-casablanca','/location-voiture-anfa-casablanca','/location-voiture-automatique-casablanca','/location-voiture-automatique-marrakech','/location-voiture-avec-chauffeur-maroc','/location-voiture-can-2025-agadir','/location-voiture-can-2025-casablanca','/location-voiture-can-2025-fes','/location-voiture-can-2025-maroc','/location-voiture-can-2025-marrakech','/location-voiture-can-2025-rabat','/location-voiture-can-2025-tanger','/location-voiture-casablanca','/location-voiture-circuit-villes-imperiales','/location-voiture-coupe-monde-2026-maroc','/location-voiture-electrique-casablanca','/location-voiture-ete-2026-maroc','/location-voiture-fes','/location-voiture-gare-casa-voyageurs','/location-voiture-gare-marrakech','/location-voiture-gare-oncf-maroc','/location-voiture-gueliz-marrakech','/location-voiture-hassan-casablanca','/location-voiture-hivernage-marrakech','/location-voiture-luxe-evenement','/location-voiture-maarif-casablanca','/location-voiture-mariage-maroc','/location-voiture-marrakech','/location-voiture-medina-marrakech','/location-voiture-mre-maroc','/location-voiture-palmeraie-marrakech','/location-voiture-rabat','/location-voiture-route-ourika-marrakech','/location-voiture-sans-carte-credit-casablanca','/location-voiture-sans-carte-credit-marrakech','/location-voiture-sidi-maarouf-casablanca','/location-voiture-souissi-rabat','/location-voiture-tanger','/location-voiture-tanger-med-port','/location-weekend-marrakech','/louer','/louer-voiture-maroc-faq-complete','/nos-services','/notre-histoire','/other','/partenaires','/peages-autoroute-maroc-tarifs-2026','/permis-etranger-douane-mre-location-voiture','/permis-international-maroc-location-voiture','/prise-en-charge-casablanca-rabat','/prix-essence-gasoil-maroc-2026','/prix-location-voiture-maroc-2026','/top-activites-marrakech-en-voiture','/top-agences-location-voiture-maroc-2026','/vehicule/audi-a3','/vehicule/audi-a4','/vehicule/audi-a6','/vehicule/audi-q3','/vehicule/audi-q5','/vehicule/audi-q7','/vehicule/audi-q8','/vehicule/bmw-5','/vehicule/bmw-x5','/vehicule/cupra-formentor','/vehicule/dacia-duster','/vehicule/dacia-jogger','/vehicule/dacia-logan','/vehicule/dacia-sandero','/vehicule/dacia-sandero-stepway','/vehicule/hyundai-accent','/vehicule/hyundai-bayon','/vehicule/hyundai-i20','/vehicule/hyundai-santa-fe','/vehicule/hyundai-staria','/vehicule/hyundai-tucson','/vehicule/kia-sportage','/vehicule/mercedes-cla','/vehicule/mercedes-classe-a','/vehicule/mercedes-classe-c','/vehicule/mercedes-classe-e','/vehicule/mercedes-classe-g','/vehicule/mercedes-gla','/vehicule/mercedes-glb','/vehicule/mercedes-glc','/vehicule/mercedes-gle','/vehicule/opel-corsa','/vehicule/peugeot-208','/vehicule/porsche-cayenne','/vehicule/porsche-macan','/vehicule/range-rover-evoque','/vehicule/range-rover-sport','/vehicule/renault-clio','/vehicule/seat-ibiza','/vehicule/vw-golf','/vehicule/vw-t-roc','/vehicule/vw-touareg']) THEN split_part(split_part(value,'?',1),'#',1) ELSE '/other' END $$;
CREATE OR REPLACE FUNCTION public.analytics_safe_properties(payload jsonb) RETURNS jsonb LANGUAGE sql IMMUTABLE SET search_path=public,pg_temp AS $$
 SELECT coalesce(jsonb_object_agg(key, CASE WHEN key IN ('path','page','landing_path','first_landing_path') THEN to_jsonb(public.analytics_safe_path(value #>> '{}')) ELSE value END),'{}'::jsonb)
 FROM jsonb_each(CASE WHEN jsonb_typeof(payload)='object' THEN payload ELSE '{}'::jsonb END)
 WHERE CASE
 WHEN key IN ('path','page','landing_path','first_landing_path') THEN jsonb_typeof(value)='string'
 WHEN key='event_id' THEN jsonb_typeof(value)='string' AND (value #>> '{}') ~* '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'
 WHEN key='is_test' THEN jsonb_typeof(value)='boolean'
 WHEN key=ANY(ARRAY['seconds','percentage','results_count','fields_count','price','days','quantity']) THEN jsonb_typeof(value)='number'
 WHEN key=ANY(ARRAY['utm_source','first_source']) THEN jsonb_typeof(value)='string' AND (value #>> '{}')=ANY(ARRAY['instagram','facebook','google','bing','partenaire_identifie'])
 WHEN key=ANY(ARRAY['utm_medium','first_medium']) THEN jsonb_typeof(value)='string' AND (value #>> '{}')=ANY(ARRAY['organic_social','paid_social','organic','referral'])
 WHEN key=ANY(ARRAY['utm_campaign','first_campaign']) THEN jsonb_typeof(value)='string' AND (value #>> '{}')=ANY(ARRAY['casa_arrivee_2026q4','casa_choix_voiture_2026q4','casa_gares_2026q4'])
 WHEN key=ANY(ARRAY['utm_content']) THEN jsonb_typeof(value)='string' AND (value #>> '{}')=ANY(ARRAY['video_arrivee_v1','carrousel_etapes_v1','carte_gares_v1'])
 WHEN key=ANY(ARRAY['city','pickup_point','vehicle_id','vehicle_slug','vehicle_name','vehicle_ids','car_model','brand','model','category','chat_type','source_attr','form_name','cta_name','cta_location','campaign_id','campaign_name','platform','content_type','content_id','element_id','element_type','file_name','duration_bucket']) THEN jsonb_typeof(value)='string' AND length(value #>> '{}')<=100 AND (value #>> '{}') ~ '^[-[:alnum:] _.,:/()]+$' AND (value #>> '{}') !~ '://|[0-9][0-9 -]{7,}[0-9]'
 ELSE false END
$$;
REVOKE ALL ON FUNCTION public.analytics_safe_path(text), public.analytics_safe_properties(jsonb) FROM PUBLIC, anon, authenticated, service_role;
CREATE OR REPLACE FUNCTION public.insert_analytics_event(p_event_type text, p_event_name text, p_page_path text DEFAULT NULL::text, p_referrer text DEFAULT NULL::text, p_source text DEFAULT NULL::text, p_device_type text DEFAULT NULL::text, p_user_agent text DEFAULT NULL::text, p_session_id text DEFAULT NULL::text, p_visitor_id text DEFAULT NULL::text, p_properties jsonb DEFAULT '{}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE event_id uuid;
BEGIN
 IF p_event_type IS NULL OR length(p_event_type) NOT BETWEEN 1 AND 100
 OR p_event_name IS NULL OR length(p_event_name) NOT BETWEEN 1 AND 100
 OR p_session_id IS NULL OR length(p_session_id) NOT BETWEEN 1 AND 100
 OR p_visitor_id IS NULL OR length(p_visitor_id) NOT BETWEEN 1 AND 100
 OR coalesce(length(p_page_path),0) > 2048 OR coalesce(length(p_referrer),0) > 2048
 OR coalesce(length(p_source),0) > 100 OR coalesce(length(p_device_type),0) > 50
 OR coalesce(length(p_user_agent),0) > 500
 OR jsonb_typeof(coalesce(p_properties,'{}'::jsonb)) <> 'object'
 OR octet_length(coalesce(p_properties,'{}'::jsonb)::text) > 10000 THEN
 RAISE EXCEPTION 'Invalid analytics payload' USING ERRCODE = '22023';
 END IF;
 IF p_event_type NOT IN ('traffic','behavior','conversion','marketing','engagement')
 OR p_event_name !~ '^[a-z][a-z0-9_]{0,63}$'
 OR p_event_name IN ('whatsapp_message_sent','booking_completed','lead_received','lead_qualified','offer_sent','rental_confirmed','rental_completed','lead_lost')
 OR p_session_id !~ '^s_[a-zA-Z0-9-]{8,80}$' OR p_visitor_id !~ '^v_[a-zA-Z0-9-]{8,80}$' THEN
 RAISE EXCEPTION 'Unsupported analytics event' USING ERRCODE='22023';
 END IF;
 p_page_path := public.analytics_safe_path(p_page_path);
 IF p_page_path IN ('/auth','/analytics','/demandes') THEN RETURN NULL; END IF;
 p_source := CASE WHEN p_source=ANY(ARRAY['Direct','Other','Google','Bing','Facebook','Instagram','ChatGPT','Perplexity','YouTube','LinkedIn','Twitter/X','instagram','facebook','google','bing','partenaire_identifie']) THEN p_source ELSE 'Other' END;
 p_referrer := NULL;
 p_user_agent := NULL;
 p_properties := public.analytics_safe_properties(coalesce(p_properties,'{}'::jsonb));
 IF p_event_name='whatsapp_handoff' AND NOT (p_properties ? 'event_id') THEN
 RAISE EXCEPTION 'Handoff event identifier required' USING ERRCODE='22023';
 END IF;
 -- Serialize per-session checks to avoid concurrent requests bypassing the limit.
 PERFORM pg_advisory_xact_lock(hashtextextended(p_session_id, 0));
 IF p_event_name='whatsapp_handoff' THEN
 SELECT id INTO event_id FROM public.analytics_events
 WHERE session_id=p_session_id AND event_name='whatsapp_handoff' AND properties->>'event_id'=p_properties->>'event_id' LIMIT 1;
 IF FOUND THEN RETURN event_id; END IF;
 END IF;
 IF (SELECT count(*) FROM public.analytics_events WHERE session_id=p_session_id
 AND created_at > now() - interval '1 hour') >= 120 THEN
 RAISE EXCEPTION 'Session event limit reached' USING ERRCODE = '22023';
 END IF;
 INSERT INTO public.analytics_events(event_type,event_name,page_path,referrer,source,device_type,user_agent,session_id,visitor_id,properties)
 VALUES(p_event_type,p_event_name,p_page_path,p_referrer,p_source,p_device_type,p_user_agent,p_session_id,p_visitor_id,coalesce(p_properties,'{}'::jsonb)) RETURNING id INTO event_id;
 RETURN event_id;
END $function$
;
CREATE OR REPLACE FUNCTION public.touch_analytics_session(p_session_id text, p_visitor_id text, p_path text, p_device_type text DEFAULT NULL::text, p_source text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
 IF p_session_id IS NULL OR length(p_session_id) NOT BETWEEN 1 AND 100
 OR p_visitor_id IS NULL OR length(p_visitor_id) NOT BETWEEN 1 AND 100
 OR p_path IS NULL OR length(p_path) NOT BETWEEN 1 AND 2048
 OR coalesce(length(p_device_type),0) > 50 OR coalesce(length(p_source),0) > 100 THEN
 RAISE EXCEPTION 'Invalid session payload' USING ERRCODE = '22023';
 END IF;
 IF p_session_id !~ '^s_[a-zA-Z0-9-]{8,80}$' OR p_visitor_id !~ '^v_[a-zA-Z0-9-]{8,80}$' THEN
 RAISE EXCEPTION 'Unsupported session identifier' USING ERRCODE='22023'; END IF;
 p_path := public.analytics_safe_path(p_path);
 IF p_path IN ('/auth','/analytics','/demandes') THEN RETURN; END IF;
 p_source := CASE WHEN p_source=ANY(ARRAY['Direct','Other','Google','Bing','Facebook','Instagram','ChatGPT','Perplexity','YouTube','LinkedIn','Twitter/X','instagram','facebook','google','bing','partenaire_identifie']) THEN p_source ELSE 'Other' END;
 INSERT INTO public.analytics_sessions(session_id,visitor_id,entry_page,exit_page,device_type,source)
 VALUES(p_session_id,p_visitor_id,p_path,p_path,p_device_type,p_source)
 ON CONFLICT(session_id) DO UPDATE SET
 page_views=least(coalesce(analytics_sessions.page_views,0)+1,10000),
 exit_page=EXCLUDED.exit_page, end_time=now()
 WHERE analytics_sessions.visitor_id=EXCLUDED.visitor_id;
END $function$
;
ALTER TABLE public.rental_requests ADD COLUMN IF NOT EXISTS received_at timestamptz;
ALTER TABLE public.rental_requests ADD COLUMN IF NOT EXISTS loss_reason text;
ALTER TABLE public.rental_requests ADD COLUMN IF NOT EXISTS attribution_confidence text NOT NULL DEFAULT 'unknown';
ALTER TABLE public.rental_requests ALTER COLUMN pickup_date DROP NOT NULL;
ALTER TABLE public.rental_requests ALTER COLUMN return_date DROP NOT NULL;
ALTER TABLE public.rental_requests DROP CONSTRAINT IF EXISTS rental_requests_status_check;
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_requests_status_check CHECK (status IN ('new','contacted','qualified','quoted','confirmed','completed','lost','spam','won'));
-- Received or lost contacts are not rental offers. Qualification and later
-- business stages require the actual service area and rental duration.
ALTER TABLE public.rental_requests DROP CONSTRAINT IF EXISTS rental_period_limits;
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_request_qualification_limits CHECK (
 (pickup_date IS NULL OR return_date IS NULL OR return_date > pickup_date)
 AND (status NOT IN ('qualified','quoted','confirmed','completed','won') OR (
  city IN ('Casablanca','Rabat') AND pickup_date IS NOT NULL AND return_date IS NOT NULL
  AND return_date >= pickup_date + 3 AND return_date <= (pickup_date + interval '6 months')::date
 ))
) NOT VALID;
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_request_loss_reason CHECK (loss_reason IS NULL OR loss_reason IN ('hors_zone','duree','indisponibilite','conditions','sans_suite','autre'));
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_request_lost_reason_required CHECK (status <> 'lost' OR loss_reason IS NOT NULL) NOT VALID;
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_request_attribution_confidence CHECK (attribution_confidence IN ('unknown','declared','observed_code'));
ALTER TABLE public.rental_requests ADD CONSTRAINT rental_request_observed_campaign CHECK (attribution_confidence <> 'observed_code' OR coalesce(utm_campaign,'')=ANY(ARRAY['casa_arrivee_2026q4','casa_choix_voiture_2026q4','casa_gares_2026q4'])) NOT VALID;
DO $$ DECLARE p record; BEGIN
 FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='rental_requests' LOOP
 EXECUTE format('DROP POLICY %I ON public.rental_requests',p.policyname);
 END LOOP;
END $$;
REVOKE ALL ON public.rental_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT,INSERT,UPDATE ON public.rental_requests TO authenticated;
CREATE POLICY rental_admin_read ON public.rental_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY rental_admin_insert ON public.rental_requests FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY rental_admin_update ON public.rental_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
NOTIFY pgrst, 'reload schema';
COMMIT;
