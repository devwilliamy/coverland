import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// NOTE: - Might not actually need this. Thought it was needed for the forgot password but
// this might be messing with session token
export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  console.log('Inside forgot-password callback');

  if (code) {
    const cookieStore = cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    // const supabase = createRouteHandlerClient(
    //   { cookies: () => cookieStore },
    //   {
    //     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    //   }
    // );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + '/account/update-password');
}
