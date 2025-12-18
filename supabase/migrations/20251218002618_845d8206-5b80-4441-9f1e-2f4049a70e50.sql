-- Create a validated RPC function for inserting analytics events
-- This replaces direct INSERT to enforce server-side validation

CREATE OR REPLACE FUNCTION public.insert_analytics_event(
  p_event_type text,
  p_event_name text,
  p_page_path text DEFAULT NULL,
  p_referrer text DEFAULT NULL,
  p_source text DEFAULT NULL,
  p_device_type text DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_session_id text DEFAULT NULL,
  p_visitor_id text DEFAULT NULL,
  p_properties jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_event_id uuid;
BEGIN
  -- Validate event_type (required, max 50 chars, must be valid type)
  IF p_event_type IS NULL OR length(p_event_type) = 0 THEN
    RAISE EXCEPTION 'event_type is required';
  END IF;
  
  IF length(p_event_type) > 50 THEN
    RAISE EXCEPTION 'event_type must be 50 characters or less';
  END IF;
  
  IF p_event_type NOT IN ('traffic', 'behavior', 'conversion', 'marketing', 'engagement') THEN
    RAISE EXCEPTION 'Invalid event_type. Must be one of: traffic, behavior, conversion, marketing, engagement';
  END IF;

  -- Validate event_name (required, max 100 chars)
  IF p_event_name IS NULL OR length(p_event_name) = 0 THEN
    RAISE EXCEPTION 'event_name is required';
  END IF;
  
  IF length(p_event_name) > 100 THEN
    p_event_name := substring(p_event_name FOR 100);
  END IF;

  -- Validate and truncate optional text fields
  IF p_page_path IS NOT NULL AND length(p_page_path) > 2048 THEN
    p_page_path := substring(p_page_path FOR 2048);
  END IF;

  IF p_referrer IS NOT NULL AND length(p_referrer) > 2048 THEN
    p_referrer := substring(p_referrer FOR 2048);
  END IF;

  IF p_source IS NOT NULL AND length(p_source) > 200 THEN
    p_source := substring(p_source FOR 200);
  END IF;

  IF p_device_type IS NOT NULL AND p_device_type NOT IN ('mobile', 'tablet', 'desktop') THEN
    p_device_type := NULL;
  END IF;

  IF p_user_agent IS NOT NULL AND length(p_user_agent) > 500 THEN
    p_user_agent := substring(p_user_agent FOR 500);
  END IF;

  IF p_session_id IS NOT NULL AND length(p_session_id) > 120 THEN
    p_session_id := substring(p_session_id FOR 120);
  END IF;

  IF p_visitor_id IS NOT NULL AND length(p_visitor_id) > 120 THEN
    p_visitor_id := substring(p_visitor_id FOR 120);
  END IF;

  -- Validate properties JSONB size (max 10KB)
  IF p_properties IS NOT NULL AND length(p_properties::text) > 10000 THEN
    p_properties := '{}'::jsonb;
  END IF;

  -- Insert the validated event
  INSERT INTO public.analytics_events (
    event_type,
    event_name,
    page_path,
    referrer,
    source,
    device_type,
    user_agent,
    session_id,
    visitor_id,
    properties
  ) VALUES (
    p_event_type,
    p_event_name,
    p_page_path,
    p_referrer,
    p_source,
    p_device_type,
    p_user_agent,
    p_session_id,
    p_visitor_id,
    COALESCE(p_properties, '{}'::jsonb)
  )
  RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$;