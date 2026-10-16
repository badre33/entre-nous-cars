-- Reconcile application schema to metadata read from new project on 2026-10-16.
-- No production data, account identifier or credential is included.
-- Run the whole historical chain on a fresh Supabase project; do not apply
-- blindly to another environment. NULL legacy dates cause rollback, not data repair.
BEGIN;
DO $$ DECLARE p record; BEGIN FOR p IN SELECT schemaname,tablename,policyname FROM pg_policies WHERE schemaname='public' AND tablename IN ('user_roles','rental_requests','analytics_events','analytics_sessions') LOOP EXECUTE format('DROP POLICY %I ON %I.%I',p.policyname,p.schemaname,p.tablename); END LOOP; END $$;
ALTER TABLE public."user_roles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."user_roles" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE public."user_roles" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE public."user_roles" ALTER COLUMN "role" SET NOT NULL;
ALTER TABLE public."user_roles" ALTER COLUMN "created_at" SET NOT NULL;
REVOKE ALL ON public."user_roles" FROM PUBLIC, anon, authenticated, service_role;
ALTER TABLE public."rental_requests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."rental_requests" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "created_at" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "updated_at" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "full_name" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "phone" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "vehicle_name" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "vehicle_slug" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "city" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "pickup_date" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "return_date" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "message" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "source_page" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "source_page_title" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "utm_source" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "utm_medium" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "utm_campaign" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "user_agent" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "status" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "whatsapp_sent" SET NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "whatsapp_sent_at" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "notes" DROP NOT NULL;
ALTER TABLE public."rental_requests" ALTER COLUMN "assigned_to" DROP NOT NULL;
REVOKE ALL ON public."rental_requests" FROM PUBLIC, anon, authenticated, service_role;
ALTER TABLE public."analytics_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."analytics_events" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "event_type" SET NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "event_name" SET NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "page_path" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "referrer" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "source" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "device_type" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "user_agent" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "session_id" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "visitor_id" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "properties" DROP NOT NULL;
ALTER TABLE public."analytics_events" ALTER COLUMN "created_at" SET NOT NULL;
REVOKE ALL ON public."analytics_events" FROM PUBLIC, anon, authenticated, service_role;
ALTER TABLE public."analytics_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "session_id" SET NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "visitor_id" SET NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "start_time" SET NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "end_time" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "page_views" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "events_count" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "entry_page" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "exit_page" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "device_type" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "source" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "country" DROP NOT NULL;
ALTER TABLE public."analytics_sessions" ALTER COLUMN "created_at" SET NOT NULL;
REVOKE ALL ON public."analytics_sessions" FROM PUBLIC, anon, authenticated, service_role;
ALTER TABLE public.rental_requests DROP CONSTRAINT IF EXISTS rental_period_within_business_limits;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.analytics_events'::regclass AND conname='analytics_events_pkey') THEN ALTER TABLE public."analytics_events" ADD CONSTRAINT "analytics_events_pkey" PRIMARY KEY (id); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.analytics_sessions'::regclass AND conname='analytics_sessions_pkey') THEN ALTER TABLE public."analytics_sessions" ADD CONSTRAINT "analytics_sessions_pkey" PRIMARY KEY (id); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.analytics_sessions'::regclass AND conname='analytics_sessions_session_id_key') THEN ALTER TABLE public."analytics_sessions" ADD CONSTRAINT "analytics_sessions_session_id_key" UNIQUE (session_id); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.rental_requests'::regclass AND conname='rental_requests_status_check') THEN ALTER TABLE public."rental_requests" ADD CONSTRAINT "rental_requests_status_check" CHECK ((status = ANY (ARRAY['new'::text, 'contacted'::text, 'quoted'::text, 'won'::text, 'lost'::text, 'spam'::text]))); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.rental_requests'::regclass AND conname='rental_requests_pkey') THEN ALTER TABLE public."rental_requests" ADD CONSTRAINT "rental_requests_pkey" PRIMARY KEY (id); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.rental_requests'::regclass AND conname='rental_requests_assigned_to_fkey') THEN ALTER TABLE public."rental_requests" ADD CONSTRAINT "rental_requests_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES auth.users(id); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='public.rental_requests'::regclass AND conname='rental_period_limits') THEN ALTER TABLE public."rental_requests" ADD CONSTRAINT "rental_period_limits" CHECK (((return_date >= (pickup_date + 3)) AND (return_date <= ((pickup_date + '6 mons'::interval))::date))); END IF; END $$;
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_pkey ON public.user_roles USING btree (id);
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_user_id_role_key ON public.user_roles USING btree (user_id, role);
CREATE UNIQUE INDEX IF NOT EXISTS rental_requests_pkey ON public.rental_requests USING btree (id);
CREATE INDEX IF NOT EXISTS rental_requests_created_at_idx ON public.rental_requests USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS rental_requests_status_idx ON public.rental_requests USING btree (status);
CREATE INDEX IF NOT EXISTS rental_requests_phone_idx ON public.rental_requests USING btree (phone);
CREATE INDEX IF NOT EXISTS rental_requests_city_idx ON public.rental_requests USING btree (city);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON public.analytics_events USING btree (event_type);
CREATE UNIQUE INDEX IF NOT EXISTS analytics_events_pkey ON public.analytics_events USING btree (id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events USING btree (event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON public.analytics_events USING btree (page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events USING btree (session_id);
CREATE UNIQUE INDEX IF NOT EXISTS analytics_sessions_pkey ON public.analytics_sessions USING btree (id);
CREATE UNIQUE INDEX IF NOT EXISTS analytics_sessions_session_id_key ON public.analytics_sessions USING btree (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_created_at ON public.analytics_sessions USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_session_id ON public.analytics_sessions USING btree (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor_id ON public.analytics_sessions USING btree (visitor_id);
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
 SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$function$
;
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
 -- Serialize per-session checks to avoid concurrent requests bypassing the limit.
 PERFORM pg_advisory_xact_lock(hashtextextended(p_session_id, 0));
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
 INSERT INTO public.analytics_sessions(session_id,visitor_id,entry_page,exit_page,device_type,source)
 VALUES(p_session_id,p_visitor_id,p_path,p_path,p_device_type,p_source)
 ON CONFLICT(session_id) DO UPDATE SET
 page_views=least(coalesce(analytics_sessions.page_views,0)+1,10000),
 exit_page=EXCLUDED.exit_page, end_time=now()
 WHERE analytics_sessions.visitor_id=EXCLUDED.visitor_id;
END $function$
;
CREATE OR REPLACE FUNCTION public.set_rental_requests_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$function$
;
DROP FUNCTION IF EXISTS public.is_analytics_admin();
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
REVOKE ALL ON FUNCTION public.insert_analytics_event(text,text,text,text,text,text,text,text,text,jsonb) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.insert_analytics_event(text,text,text,text,text,text,text,text,text,jsonb) TO anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_analytics_session(text,text,text,text,text) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.touch_analytics_session(text,text,text,text,text) TO anon, authenticated;
REVOKE ALL ON FUNCTION public.set_rental_requests_updated_at() FROM PUBLIC, anon, authenticated, service_role;
CREATE POLICY "analytics_admin_read" ON public."analytics_events" FOR SELECT TO "authenticated" USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "sessions_admin_read" ON public."analytics_sessions" FOR SELECT TO "authenticated" USING (has_role(auth.uid(), 'admin'::app_role));
GRANT TRUNCATE ON public."user_roles" TO "service_role";
GRANT REFERENCES ON public."user_roles" TO "service_role";
GRANT TRIGGER ON public."user_roles" TO "service_role";
GRANT TRUNCATE ON public."rental_requests" TO "service_role";
GRANT REFERENCES ON public."rental_requests" TO "service_role";
GRANT TRIGGER ON public."rental_requests" TO "service_role";
GRANT TRUNCATE ON public."analytics_events" TO "service_role";
GRANT REFERENCES ON public."analytics_events" TO "service_role";
GRANT TRIGGER ON public."analytics_events" TO "service_role";
GRANT SELECT ON public."analytics_events" TO "authenticated";
GRANT TRUNCATE ON public."analytics_sessions" TO "service_role";
GRANT REFERENCES ON public."analytics_sessions" TO "service_role";
GRANT TRIGGER ON public."analytics_sessions" TO "service_role";
GRANT SELECT ON public."analytics_sessions" TO "authenticated";
COMMIT;
