-- Apply only after checking the production roles and taking a database backup.
-- Do not rewrite historical migrations or validate legacy lead dates implicitly.
BEGIN;

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NULL
    OR to_regclass('public.analytics_events') IS NULL
    OR to_regclass('public.analytics_sessions') IS NULL
    OR to_regclass('public.rental_requests') IS NULL THEN
    RAISE EXCEPTION 'Required production tables are missing; inspect the database before applying this migration';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_analytics_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_analytics_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_analytics_admin() TO anon, authenticated;

-- Restrictive policies intersect existing permissive policies instead of relying
-- on the absence of another broad SELECT/UPDATE policy in production.
CREATE POLICY "Analytics read requires admin"
ON public.analytics_events AS RESTRICTIVE FOR SELECT
TO PUBLIC USING (public.is_analytics_admin());

CREATE POLICY "Session read requires admin"
ON public.analytics_sessions AS RESTRICTIVE FOR SELECT
TO PUBLIC USING (public.is_analytics_admin());

CREATE POLICY "Session update requires admin"
ON public.analytics_sessions AS RESTRICTIVE FOR UPDATE
TO PUBLIC USING (public.is_analytics_admin())
WITH CHECK (public.is_analytics_admin());

-- Public intake cannot forge an internal workflow state or assignment.
CREATE POLICY "Public rental intake has initial state"
ON public.rental_requests AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (
  public.is_analytics_admin()
  OR (status = 'new' AND assigned_to IS NULL AND notes IS NULL
      AND whatsapp_sent = false AND whatsapp_sent_at IS NULL)
);

-- NOT VALID preserves legacy rows, but enforces the rule on new inserts/updates.
ALTER TABLE public.rental_requests
ADD CONSTRAINT rental_period_within_business_limits
CHECK (
  pickup_date IS NOT NULL AND return_date IS NOT NULL
  AND return_date >= pickup_date + 3
  AND return_date <= (pickup_date + interval '6 months')::date
) NOT VALID;

COMMIT;
