'use client';
import { createSupabaseBrowserClient } from '@/lib/db/supabaseClients';
import { SupabaseClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignIn } from '@supabase/auth-ui-react';
import Logo from '../header/Logo';

// const DynamicSignIn = dynamic(() =>
//   import('@supabase/auth-ui-react').then((mod) => mod.SignIn)
// );

export default function SignInForm() {
  const router = useRouter();
  const supabase: SupabaseClient = createSupabaseBrowserClient();

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      router.push('/profile');
    }
  });

  return (
    <div className="flex justify-center">
      <h1 className="hidden">Login</h1>
      <div className="w-11/12 rounded-lg p-12 px-6 py-10 sm:w-8/12 sm:px-10 sm:py-6 md:w-6/12 lg:w-5/12 2xl:w-3/12">
        <div className="flex justify-center pb-4">
          <Logo />
        </div>
        <SignIn
          supabaseClient={supabase}
          // view="magic_link"
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
          // idk why this works, does it get rendered on the server...
          // sometimes it errors out too and doesn't i don't get it
          redirectTo={`${origin}/api/auth/callback`}
        />
        <div className="pt-4 text-center">
          <Link className="block pb-2" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div className="pt-4 text-center">
          Not registered yet?{' '}
          <Link href="/signup" className="underline">
            Create an account
          </Link>
        </div>
        <div className="pt-4 text-center text-red-500">
        <span className="font-bold">NOTICE</span>: If you made an account with us before <span className="font-bold">May 8th, 2024</span>, please remake your account. We apologize for any inconvenience.
        </div>
      </div>
    </div>
  );
}
