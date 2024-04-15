import { createSupabaseAdminPanelServerClient, supabaseAdminPanelDatabaseClient } from '@/lib/db/adminPaneSupabaseClient';
import { ADMIN_PANEL_ORDERS } from '@/lib/db/constants/databaseTableNames';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const sampleInput = {
  order_id: 'CL-253086',
//   order_date: '',
  total_amount: 780,
  status: true, //paid
  transaction_id: 'pi_3P4snMDnAldfe1lt4xhsKzMN',
  payment_status: 'complete',
  payment_method: 'card',
  card_amount: 78000,
  card_brand: "Visa",
  card_country: "US",
  card_exp_month: 12,
  card_exp_year: 2033,
  card_fingerprint: "TQvfz2g4Iq6DtrG1",
  card_funding: "credit",
  card_installments: null,
  card_last4: "4242",
  card_three_d_secure: null,
  card_wallet: null,
  customer_id: 1,
//   payment_date: '',
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  shipping_address_line_1: '',
  shipping_address_line_2: '',
  shipping_address_city: '',
  shipping_address_state: '',
  shipping_address_postal_code: '',
  shipping_address_country: '',
  shipping_carrier: '',
  shipping_tracking_number: '',
  billing_address_line_1: '',
  billing_address_line_2: '',
  billing_address_city: '',
  billing_address_state: '',
  billing_address_postal_code: '',
  billing_address_country: '',
  notes: '',
};

export async function POST(request: NextRequest) {
  // const { items, promoCode } = await request.json();
  try {
    // const cookieStore: ReadonlyRequestCookies = cookies();
    // const supabase: SupabaseClient = supabaseAdminPanelDatabaseClient;
    const cookieStore: ReadonlyRequestCookies = cookies();
    const supabase: SupabaseClient = createSupabaseAdminPanelServerClient(cookieStore);
    // const supabase: SupabaseClient = supabaseAdminPanelDatabaseClient;
    const { data, error } = await supabase
      .from(ADMIN_PANEL_ORDERS)
      .insert(sampleInput)
      .select();

    if (error) {
      if (Number(error.code) === 23505) {
        console.log('Order Already Exists');
        throw error
      } else {
        console.error('An error occurred:', error.message);
        throw error
      }
    }
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({
        error
    })
  }
}
