-- Privileged verification of actual RLS/RPC behavior using synthetic fixtures.
-- All temporary events, sessions and leads are rolled back. No Auth user is created.
BEGIN;
DO $$ BEGIN
 IF (SELECT count(*) FROM public.user_roles WHERE role='admin') <> 1 THEN RAISE EXCEPTION 'Expected exactly one administrator'; END IF;
 PERFORM set_config('benatna.verify_event_id',gen_random_uuid()::text,true);
 PERFORM set_config('benatna.verify_lead_id',gen_random_uuid()::text,true);
 PERFORM set_config('benatna.verify_sid','s_verification'||md5(random()::text),true);
 PERFORM set_config('benatna.verify_vid','v_verification'||md5(random()::text),true);
END $$;
SET LOCAL ROLE anon;
DO $$ DECLARE blocked boolean := false; BEGIN
 BEGIN PERFORM 1 FROM public.rental_requests LIMIT 1; EXCEPTION WHEN insufficient_privilege THEN blocked := true; END;
 IF NOT blocked THEN RAISE EXCEPTION 'Anonymous table read should be denied'; END IF;
 PERFORM public.insert_analytics_event('conversion','whatsapp_handoff','/faq?text=SYNTHETIC_VERIFICATION','https://example.test/?text=SYNTHETIC_VERIFICATION','Direct','desktop','SYNTHETIC_VERIFICATION',current_setting('benatna.verify_sid'),current_setting('benatna.verify_vid'),jsonb_build_object('event_id',current_setting('benatna.verify_event_id'),'is_test',true,'href','https://example.test/?text=SYNTHETIC_VERIFICATION','message','SYNTHETIC_VERIFICATION'));
 PERFORM public.insert_analytics_event('conversion','whatsapp_handoff','/faq',null,'Direct','desktop',null,current_setting('benatna.verify_sid'),current_setting('benatna.verify_vid'),jsonb_build_object('event_id',current_setting('benatna.verify_event_id'),'is_test',true));
 PERFORM public.touch_analytics_session(current_setting('benatna.verify_sid'),current_setting('benatna.verify_vid'),'/faq?text=SYNTHETIC_VERIFICATION','desktop','Direct');
END $$;
RESET ROLE;
DO $$ BEGIN
 IF (SELECT count(*) FROM public.analytics_events WHERE session_id=current_setting('benatna.verify_sid')) <> 1 THEN RAISE EXCEPTION 'Handoff deduplication failed'; END IF;
 IF NOT EXISTS (SELECT 1 FROM public.analytics_events WHERE session_id=current_setting('benatna.verify_sid') AND page_path='/faq' AND referrer IS NULL AND user_agent IS NULL AND NOT (properties ?| ARRAY['href','message','phone','email'])) THEN RAISE EXCEPTION 'Analytics sanitization failed'; END IF;
 IF NOT EXISTS (SELECT 1 FROM public.analytics_sessions WHERE session_id=current_setting('benatna.verify_sid') AND entry_page='/faq' AND exit_page='/faq') THEN RAISE EXCEPTION 'Session path sanitization failed'; END IF;
 PERFORM set_config('request.jwt.claim.sub',(SELECT user_id::text FROM public.user_roles WHERE role='admin'),true);
END $$;
SET LOCAL ROLE authenticated;
DO $$ DECLARE blocked boolean := false; BEGIN
 INSERT INTO public.rental_requests(id,full_name,phone,city,pickup_date,return_date,status,received_at,notes)
 VALUES(current_setting('benatna.verify_lead_id')::uuid,'Synthetic SQL verification','0000000000','Casablanca','2027-01-01','2027-01-04','new',now(),'__BENATNA_SQL_VERIFICATION__');
 UPDATE public.rental_requests SET status='qualified' WHERE id=current_setting('benatna.verify_lead_id')::uuid;
 UPDATE public.rental_requests SET status='confirmed' WHERE id=current_setting('benatna.verify_lead_id')::uuid;
 UPDATE public.rental_requests SET status='completed' WHERE id=current_setting('benatna.verify_lead_id')::uuid;
 IF NOT EXISTS (SELECT 1 FROM public.rental_requests WHERE id=current_setting('benatna.verify_lead_id')::uuid AND status='completed') THEN RAISE EXCEPTION 'Admin workflow failed'; END IF;
 BEGIN UPDATE public.rental_requests SET status='qualified',return_date='2027-01-03' WHERE id=current_setting('benatna.verify_lead_id')::uuid; EXCEPTION WHEN check_violation THEN blocked := true; END;
 IF NOT blocked THEN RAISE EXCEPTION 'Two-day qualification should be denied'; END IF;
END $$;
RESET ROLE;
DO $$ BEGIN PERFORM set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000000',true); END $$;
SET LOCAL ROLE authenticated;
DO $$ DECLARE blocked boolean := false; changed integer; BEGIN
 IF EXISTS(SELECT 1 FROM public.rental_requests WHERE id=current_setting('benatna.verify_lead_id')::uuid) THEN RAISE EXCEPTION 'Non-admin can read private lead'; END IF;
 UPDATE public.rental_requests SET status='spam' WHERE id=current_setting('benatna.verify_lead_id')::uuid;
 GET DIAGNOSTICS changed=ROW_COUNT;
 IF changed <> 0 THEN RAISE EXCEPTION 'Non-admin can update private lead'; END IF;
 BEGIN INSERT INTO public.rental_requests(full_name,phone,city) VALUES('Synthetic denied verification','0000000000','À préciser'); EXCEPTION WHEN insufficient_privilege THEN blocked := true; END;
 IF NOT blocked THEN RAISE EXCEPTION 'Non-admin insert should be denied'; END IF;
END $$;
RESET ROLE;
ROLLBACK;
SELECT json_build_object(
 'verification_events_after_rollback',(SELECT count(*) FROM public.analytics_events WHERE session_id LIKE 's_verification%'),
 'verification_sessions_after_rollback',(SELECT count(*) FROM public.analytics_sessions WHERE session_id LIKE 's_verification%'),
 'verification_leads_after_rollback',(SELECT count(*) FROM public.rental_requests WHERE notes='__BENATNA_SQL_VERIFICATION__'),
 'admin_count',(SELECT count(*) FROM public.user_roles WHERE role='admin'),
 'application_tables_with_rls',(SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relname IN ('analytics_events','analytics_sessions','rental_requests','user_roles') AND c.relrowsecurity)
) AS verification_rollback_summary;
