import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

async function signOut() {
  'use server';
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  await supabase.auth.signOut();
  return redirect('/login');
}

export default async function Profile() {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex gap-4">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">Profile</h1>
          <p className="mb-2">Email: {user.email}</p>
          <Link
            className="mb-2 mt-2"
            href="/profile/orders"
          >
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              My Orders
            </Button>
          </Link>
          <form action={signOut}>
            <Button>Log Out</Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
    >
      Login
    </Link>
  );
}
