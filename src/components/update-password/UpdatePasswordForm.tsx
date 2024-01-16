'use client';
import { createSupabaseBrowserClient } from '@/lib/db/supabaseClients';
import { UpdatePassword } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { User } from '@supabase/supabase-js';

export default function PasswordForm({ user }: { user: User | undefined }) {
  const supabase = createSupabaseBrowserClient();
  return (
    <div className="flex justify-center">
      <div className="w-11/12 rounded-lg p-12 px-6 py-10 sm:w-8/12 sm:px-10 sm:py-6 md:w-6/12 lg:w-5/12 2xl:w-3/12">
        {/* <p className="mb-4 font-medium">
          Hi {user?.email}, Enter your new password below and confirm it
        </p> */}
        <UpdatePassword
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
          //@ts-ignore
          providers={['google']}
          redirectTo={`${origin}/api/auth/callback`}
          showLinks={false}
          // Might not need this localization
          localization={{
            variables: {
              forgotten_password: {
                email_label: 'Email',
                button_label: 'Send',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
