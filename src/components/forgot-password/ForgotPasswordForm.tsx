import { createSupabaseBrowserClient } from '@/lib/db/supabaseClients';
import { ForgottenPassword } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const supabase: SupabaseClient = createSupabaseBrowserClient();
  return (
    <div className="w-11/12 rounded-lg p-12 px-6 py-10 sm:w-8/12 sm:px-10 sm:py-6 md:w-6/12 lg:w-5/12 2xl:w-3/12">
      <h2 className="mb-4 text-4xl font-semibold">Forgot Password</h2>
      <p className="mb-4 font-medium">
        Looks like you&apos;ve forgotten your password
      </p>
      <ForgottenPassword
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
        localization={{
          variables: {
            forgotten_password: {
              email_label: 'Email',
              button_label: 'Send',
            },
          },
        }}
      />
      <div className="pt-4 text-center">
        Not registered yet?{' '}
        <Link href="/signup" className="text-blue-500 underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
