import { createSupabaseAdminPanelServerClient } from '@/lib/db/adminPanelSupabaseClient';
import { ADMIN_PANEL_ORDERS } from '@/lib/db/constants/databaseTableNames';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { order } = await request.json();
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient =
    createSupabaseAdminPanelServerClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from(ADMIN_PANEL_ORDERS)
      .insert(order)
      .select('*');
    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Order Already Exists');
        return NextResponse.json(
          { error: 'Order Already Exists' },
          { status: 409 }
        );
      } else {
        console.error('An error occurred:', error.message);
        return NextResponse.json(
          { error: 'An unexpected error occurred' },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { order, order_id } = await request.json();

  if (!order_id) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }

  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient =
    createSupabaseAdminPanelServerClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from(ADMIN_PANEL_ORDERS)
      .update(order)
      .match({ order_id })
      .select('*');

    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Order Already Exists');
        return NextResponse.json(
          { error: 'Order Already Exists' },
          { status: 409 }
        );
      } else {
        console.error('An error occurred:', error.message);
        return NextResponse.json(
          { error: 'An unexpected error occurred' },
          { status: 500 }
        );
      }
    }

    if (data && data?.length === 0) {
      return NextResponse.json(
        { error: 'No order found with the specified ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
