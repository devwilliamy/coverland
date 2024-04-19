import {
  createServerClient,
  type CookieOptions,
  createBrowserClient,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database as AdminDatabase } from './adminPanelTypes'
import { SupabaseClient, createClient } from '@supabase/supabase-js';

export const supabaseAdminPanelDatabaseClient = createClient<AdminDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_KEY!
);

export const createSupabaseAdminPanelServerClient = (
  cookieStore: ReturnType<typeof cookies>
): SupabaseClient => {
  return createServerClient<AdminDatabase>(
    process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createSupabaseAdminPanelBrowserClient = (): SupabaseClient => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ADMIN_NODE_KEY!
  );
};
