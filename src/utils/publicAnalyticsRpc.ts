import type { Database } from '@/integrations/supabase/types';

type PublicAnalyticsFunction = 'insert_analytics_event' | 'touch_analytics_session';
// These two existing RPCs accept anonymous writes. Keep Auth, private reads,
// and the full SDK in the authenticated pages instead of the visitor bundle.
export async function publicAnalyticsRpc<Name extends PublicAnalyticsFunction>(
  name: Name,
  args: Database['public']['Functions'][Name]['Args'],
): Promise<{ error: boolean }> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || key.startsWith('sb_secret_')) return { error: true };
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  // Legacy anon JWTs work as bearer tokens; publishable keys belong only in apikey.
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST', headers, body: JSON.stringify(args), credentials: 'omit', keepalive: true,
  });
  return { error: !response.ok };
}
