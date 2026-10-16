-- OPTIONAL PRIVILEGED OPERATION: explicit owner approval required.
-- Irreversible field redaction. Rows, IDs, event names, dates and counts remain.
-- Requires 20261016010000_private_measurement_and_leads.sql first.
-- No lead/customer contact row is read, changed or deleted by this operation.
BEGIN;
UPDATE public.analytics_events
SET properties = public.analytics_safe_properties(properties),
    page_path = public.analytics_safe_path(page_path),
    referrer = NULL
WHERE properties IS DISTINCT FROM public.analytics_safe_properties(properties)
   OR page_path IS DISTINCT FROM public.analytics_safe_path(page_path)
   OR referrer IS NOT NULL;
UPDATE public.analytics_sessions
SET entry_page = CASE WHEN entry_page IS NULL THEN NULL ELSE public.analytics_safe_path(entry_page) END,
    exit_page = CASE WHEN exit_page IS NULL THEN NULL ELSE public.analytics_safe_path(exit_page) END
WHERE entry_page IS DISTINCT FROM CASE WHEN entry_page IS NULL THEN NULL ELSE public.analytics_safe_path(entry_page) END
   OR exit_page IS DISTINCT FROM CASE WHEN exit_page IS NULL THEN NULL ELSE public.analytics_safe_path(exit_page) END;
SELECT json_build_object(
  'events_total',(SELECT count(*) FROM public.analytics_events),
  'sessions_total',(SELECT count(*) FROM public.analytics_sessions),
  'events_with_free_url_fields',(SELECT count(*) FROM public.analytics_events WHERE properties ?| ARRAY['href','url','query','message','phone','email']),
  'events_with_query_path',(SELECT count(*) FROM public.analytics_events WHERE page_path ~ '[?#]'),
  'events_with_referrer',(SELECT count(*) FROM public.analytics_events WHERE referrer IS NOT NULL),
  'sessions_with_query_path',(SELECT count(*) FROM public.analytics_sessions WHERE entry_page ~ '[?#]' OR exit_page ~ '[?#]')
) AS redaction_summary;
COMMIT;
-- A Git rollback cannot restore the redacted values. Do not run without approval.
