import { createSupabaseAdminPanelServerClient } from '@/lib/db/adminPaneSupabaseClient';
import {
  ADMIN_PANEL_CUSTOMERS,
  ADMIN_PANEL_ORDERS,
} from '@/lib/db/constants/databaseTableNames';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const createOrUpdateUser = async (customerInput) => {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient =
    createSupabaseAdminPanelServerClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from(ADMIN_PANEL_CUSTOMERS)
      .upsert(customerInput, {
        onConflict: 'email',
        
      })
      .select('*');
    if (error) {
      console.error('An error occurred:', error.message);
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
};
