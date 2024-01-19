import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';

const DynamicUpdatePasswordForm = dynamic(
  () => import('@/components/update-password/UpdatePasswordForm'),
  {
    ssr: false,
  }
);
export default async function UpdatePassword() {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <DynamicUpdatePasswordForm user={session?.user} />;
}
