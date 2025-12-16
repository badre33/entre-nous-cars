-- Create analytics_events table for storing all KPIs
CREATE TABLE public.analytics_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_path TEXT,
    referrer TEXT,
    source TEXT,
    device_type TEXT,
    user_agent TEXT,
    session_id TEXT,
    visitor_id TEXT,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_events_page_path ON public.analytics_events(page_path);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read analytics data
CREATE POLICY "Authenticated users can read analytics" 
ON public.analytics_events 
FOR SELECT 
TO authenticated
USING (true);

-- Allow anyone to insert analytics events (for tracking)
CREATE POLICY "Anyone can insert analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Create analytics_sessions table for session tracking
CREATE TABLE public.analytics_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    visitor_id TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    end_time TIMESTAMP WITH TIME ZONE,
    page_views INTEGER DEFAULT 1,
    events_count INTEGER DEFAULT 0,
    entry_page TEXT,
    exit_page TEXT,
    device_type TEXT,
    source TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for sessions
CREATE INDEX idx_analytics_sessions_created_at ON public.analytics_sessions(created_at DESC);
CREATE INDEX idx_analytics_sessions_session_id ON public.analytics_sessions(session_id);
CREATE INDEX idx_analytics_sessions_visitor_id ON public.analytics_sessions(visitor_id);

-- Enable RLS
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read sessions
CREATE POLICY "Authenticated users can read sessions" 
ON public.analytics_sessions 
FOR SELECT 
TO authenticated
USING (true);

-- Allow anyone to insert/update sessions
CREATE POLICY "Anyone can insert sessions" 
ON public.analytics_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update sessions" 
ON public.analytics_sessions 
FOR UPDATE 
USING (true);