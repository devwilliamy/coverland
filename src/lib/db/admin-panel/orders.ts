import { supabaseAdminPanelDatabaseClient } from '../adminPaneSupabaseClient';
import { ADMIN_PANEL_ORDERS } from '../constants/databaseTableNames';

export async function getAllAdminPanelOrders() {
  const { data, error } = await supabaseAdminPanelDatabaseClient
    .from(ADMIN_PANEL_ORDERS)
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

type GetOrderSequenceParams = {
  productType: string;
  date: string;
};

export async function getOrderIdSequence({
  productType,
  date,
}: GetOrderSequenceParams) {
  const { data, error } = await supabaseAdminPanelDatabaseClient.rpc(
    'get_next_sequence',
    {
      p_type: productType,
      p_date: date,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// export const updateAdminPanelOrder = async (mappedOrder, order_id, customer_id) => {
//   if (!order_id) {
//     return NextResponse.json(
//       { error: 'Order ID is required' },
//       { status: 400 }
//     );
//   }

//   const cookieStore: ReadonlyRequestCookies = cookies();
//   const supabase: SupabaseClient =
//     createSupabaseAdminPanelServerClient(cookieStore);
//   try {
//     const { data, error } = await supabase
//       .from(ADMIN_PANEL_ORDERS)
//       .update(order)
//       .match({ order_id })
//       .select('*');

//     if (error) {
//       if (Number(error.code) === 23505) {
//         console.error('Order Already Exists');
//       } else {
//         console.error('An error occurred:', error.message);
//       }
//     }

//     if (data && data?.length === 0) {
//       return NextResponse.json(
//         { error: 'No order found with the specified ID' },
//         { status: 404 }
//       );
//     }
// }