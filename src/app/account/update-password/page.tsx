import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';

const DynamicUpdatePasswordForm = dynamic(
  () => import('@/components/update-password/UpdatePasswordForm'),
  {
    ssr: false,
  }
);
export default async function UpdatePassword() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <DynamicUpdatePasswordForm user={session?.user} />;
}
