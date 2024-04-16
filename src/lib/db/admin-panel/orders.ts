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
