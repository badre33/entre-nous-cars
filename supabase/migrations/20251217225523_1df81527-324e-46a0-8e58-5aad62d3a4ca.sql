-- 1) Roles enum
DO $$
BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2) Roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3) Security definer helper (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4) user_roles policies
DROP POLICY IF EXISTS "Users read own role" ON public.user_roles;
CREATE POLICY "Users read own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5) Lock down analytics reads to admins only
DROP POLICY IF EXISTS "Authenticated users can read analytics" ON public.analytics_events;
CREATE POLICY "Admins can read analytics events"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can read sessions" ON public.analytics_sessions;
CREATE POLICY "Admins can read analytics sessions"
ON public.analytics_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6) Remove unrestricted UPDATE policy on sessions
DROP POLICY IF EXISTS "Anyone can update sessions" ON public.analytics_sessions;

-- 7) Replace with a constrained RPC that increments page_views and updates exit/end
CREATE OR REPLACE FUNCTION public.touch_analytics_session(
  p_session_id TEXT,
  p_visitor_id TEXT,
  p_path TEXT,
  p_device_type TEXT DEFAULT NULL,
  p_source TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated INTEGER;
BEGIN
  -- Basic validation / limits
  IF p_session_id IS NULL OR length(p_session_id) = 0 OR length(p_session_id) > 120 THEN
    RAISE EXCEPTION 'Invalid session_id';
  END IF;

  IF p_visitor_id IS NULL OR length(p_visitor_id) = 0 OR length(p_visitor_id) > 120 THEN
    RAISE EXCEPTION 'Invalid visitor_id';
  END IF;

  IF p_path IS NULL OR length(p_path) = 0 OR length(p_path) > 2048 THEN
    RAISE EXCEPTION 'Invalid path';
  END IF;

  IF p_device_type IS NOT NULL AND p_device_type NOT IN ('mobile', 'tablet', 'desktop') THEN
    p_device_type := NULL;
  END IF;

  IF p_source IS NOT NULL AND length(p_source) > 200 THEN
    p_source := substring(p_source FOR 200);
  END IF;

  -- Update only the matching session for this visitor and only if it's recent
  UPDATE public.analytics_sessions
  SET
    page_views = COALESCE(page_views, 0) + 1,
    exit_page = substring(p_path FOR 2048),
    end_time = now()
  WHERE session_id = p_session_id
    AND visitor_id = p_visitor_id
    AND start_time >= now() - interval '2 hours';

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  -- If no row exists (or it's stale), start a new session row
  IF v_updated = 0 THEN
    INSERT INTO public.analytics_sessions (session_id, visitor_id, entry_page, exit_page, device_type, source)
    VALUES (
      p_session_id,
      p_visitor_id,
      substring(p_path FOR 2048),
      substring(p_path FOR 2048),
      p_device_type,
      p_source
    );
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.touch_analytics_session(TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
