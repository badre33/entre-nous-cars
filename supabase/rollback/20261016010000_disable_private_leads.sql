-- Privileged rollback of new API access; keeps all lead data and stronger analytics sanitization.
BEGIN;
REVOKE SELECT,INSERT,UPDATE ON public.rental_requests FROM authenticated;
DROP POLICY IF EXISTS rental_admin_read ON public.rental_requests;
DROP POLICY IF EXISTS rental_admin_insert ON public.rental_requests;
DROP POLICY IF EXISTS rental_admin_update ON public.rental_requests;
COMMIT;
-- Do not drop columns or force old NOT NULL dates: unqualified real contacts may use them.
