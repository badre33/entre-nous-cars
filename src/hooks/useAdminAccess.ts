import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
export type AdminAccess = 'loading' | 'anonymous' | 'denied' | 'admin' | 'error';
export function useAdminAccess(): AdminAccess {
  const [access, setAccess] = useState<AdminAccess>('loading');
  useEffect(() => {
    let active = true; let generation = 0; let authSignal = false; let timer: number | undefined;
    const check = async (session: Session | null) => {
      const current = ++generation;
      if (!active) return;
      if (!session?.user) { setAccess('anonymous'); return; }
      setAccess('loading');
      try {
        const { data, error } = await supabase.rpc('has_role', { _user_id: session.user.id, _role: 'admin' });
        if (active && current === generation) setAccess(error ? 'error' : data ? 'admin' : 'denied');
      } catch { if (active && current === generation) setAccess('error'); }
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authSignal = true;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { void check(session); }, 0);
    });
    void supabase.auth.getSession().then(({ data, error }) => { if (!active || authSignal) return; if (error) setAccess('error'); else void check(data.session); });
    return () => { active = false; generation++; window.clearTimeout(timer); subscription.unsubscribe(); };
  }, []);
  return access;
}
