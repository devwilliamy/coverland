'use client';
import { createSupabaseBrowserClient } from '@/lib/db/supabaseClients';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase: SupabaseClient = createSupabaseBrowserClient();
  return (
    // <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
    <Auth
      supabaseClient={supabase}
      // view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="light"
      // showLinks={false}
      providers={['google']}
      redirectTo="http://localhost:3000/api/auth/callback"
    />
    // </div>
  );
}
