-- Table for storing rental requests submitted via the on-site form
-- Captures lead data before redirecting to WhatsApp

CREATE TABLE IF NOT EXISTS public.rental_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Client info
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- Request details
  vehicle_name TEXT,
  vehicle_slug TEXT,
  city TEXT NOT NULL,
  pickup_date DATE,
  return_date DATE,
  message TEXT,

  -- Source / tracking
  source_page TEXT,
  source_page_title TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,

  -- Workflow
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  whatsapp_sent BOOLEAN NOT NULL DEFAULT false,
  whatsapp_sent_at TIMESTAMPTZ,
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS rental_requests_created_at_idx ON public.rental_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS rental_requests_status_idx ON public.rental_requests (status);
CREATE INDEX IF NOT EXISTS rental_requests_phone_idx ON public.rental_requests (phone);
CREATE INDEX IF NOT EXISTS rental_requests_city_idx ON public.rental_requests (city);

CREATE OR REPLACE FUNCTION public.set_rental_requests_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS rental_requests_updated_at ON public.rental_requests;
CREATE TRIGGER rental_requests_updated_at
  BEFORE UPDATE ON public.rental_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_rental_requests_updated_at();

ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert rental requests" ON public.rental_requests;
CREATE POLICY "Anyone can insert rental requests"
  ON public.rental_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view rental requests" ON public.rental_requests;
CREATE POLICY "Admins can view rental requests"
  ON public.rental_requests FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update rental requests" ON public.rental_requests;
CREATE POLICY "Admins can update rental requests"
  ON public.rental_requests FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete rental requests" ON public.rental_requests;
CREATE POLICY "Admins can delete rental requests"
  ON public.rental_requests FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

COMMENT ON TABLE public.rental_requests IS 'Leads captured before WhatsApp redirect';
