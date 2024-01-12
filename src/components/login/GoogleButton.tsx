'use client';
import { createSupabaseFrontendClient } from '@/lib/db/supabaseClients';
import { SupabaseClient } from '@supabase/supabase-js';

const handleGoogleLogin = async (): Promise<void> => {
  const supabase: SupabaseClient = createSupabaseFrontendClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.log({ error });
  }
};

export default function GoogleButton(): JSX.Element {
  return <button onClick={handleGoogleLogin}>Google Login</button>;
}
