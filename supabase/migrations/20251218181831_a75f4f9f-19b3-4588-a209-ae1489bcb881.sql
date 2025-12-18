-- Remove legacy direct INSERT policy
-- Analytics events should only be inserted via insert_analytics_event RPC
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

-- Also remove legacy session insert policy (same issue)
DROP POLICY IF EXISTS "Anyone can insert sessions" ON public.analytics_sessions;