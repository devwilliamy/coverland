'use client';
import { createSupabaseBrowserClient } from '@/lib/db/supabaseClients';
import { SupabaseClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignUp } from '@supabase/auth-ui-react';

export default function SignupForm() {
  const router = useRouter();
  const supabase: SupabaseClient = createSupabaseBrowserClient();

  const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      router.push('/login');
    }
  });

  return (
    <div className="flex justify-center">
      <div className="w-11/12 rounded-lg p-12 px-6 py-10 sm:w-8/12 sm:px-10 sm:py-6 md:w-6/12 lg:w-5/12 2xl:w-3/12">
        <SignUp
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brandAccent: '#BE1B1B',
                  brand: '#BE1B1B',
                },
              },
            },
          }}
          theme="default"
          providers={['google']}
          redirectTo={`${origin}/api/auth/callback`}
        />
        <div className="pt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
