-- Allow service role to insert analytics events (used by SECURITY DEFINER functions)
CREATE POLICY "Service role can insert analytics events"
ON public.analytics_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow service role to insert analytics sessions
CREATE POLICY "Service role can insert analytics sessions"
ON public.analytics_sessions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow service role to update analytics sessions
CREATE POLICY "Service role can update analytics sessions"
ON public.analytics_sessions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);