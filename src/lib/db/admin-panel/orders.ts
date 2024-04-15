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
