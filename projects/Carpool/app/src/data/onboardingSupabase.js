import { getSupabase, isSupabaseConfigured } from './supabase.js';

/**
 * First Supabase-backed write path.
 *
 * For the pilot, we use Supabase anonymous auth so we get a durable auth.uid()
 * without forcing email/Apple/Google setup before the core data model is proven.
 * Later, swapping to real auth only changes ensureSupabaseSession(); the RPC
 * payload/transaction stays the same.
 */
async function ensureSupabaseSession() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;

  const { data: anonData, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw new Error(
      `Could not create Supabase session. In Supabase, enable Auth -> Sign In / Providers -> Anonymous sign-ins. Details: ${error.message}`,
    );
  }
  return anonData.session;
}

export async function completeOnboardingInSupabase(payload) {
  if (!isSupabaseConfigured()) {
    return { ok: false, skipped: true, reason: 'supabase_not_configured' };
  }

  await ensureSupabaseSession();
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('complete_onboarding', { payload });
  if (error) {
    return { ok: false, reason: error.message };
  }
  return { ok: true, data };
}
