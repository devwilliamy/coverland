import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export async function signOut() {
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

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const sessionUser = supabase.auth.user();
  //   if (sessionUser) {
  //     setEmail(sessionUser.email);
  //     setUser(sessionUser);
  //   }
  // }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Redirect to home page or login page after logout
  };

  const handleChangePassword = async (e) => {
    'use server';
    e.preventDefault();
    // Implement password change logic here
    // You might need to call an API or use Supabase methods
  };

  return user ? (
    <div className="flex gap-4">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">Profile</h1>

          <p className="mb-2">Email: {user.email}</p>
          <form action={signOut}>
            <Button>Log Out</Button>
          </form>

          {/* <form className="mt-4" action={handleChangePassword}>
            <div>
              <label className="mb-2 block">New Password:</label>
              <input
                type="password"
                // value={newPassword}
                // onChange={(e) => setNewPassword(e.target.value)}
                className="text-grey-darker mb-2 appearance-none rounded border px-3 py-2 shadow"
              />
            </div>
            <div className="flex justify-center">
              <Button

              // onClick={handleSubmitDropdown}
              >
                Change Password
              </Button>
            </div>
          </form> */}
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
