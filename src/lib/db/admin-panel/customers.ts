import { supabaseAdminPanelDatabaseClient } from '@/lib/db/adminPanelSupabaseClient';
import { ADMIN_PANEL_CUSTOMERS } from '@/lib/db/constants/databaseTableNames';

export const createOrUpdateUser = async (customerInput) => {
  try {
    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_CUSTOMERS)
      .upsert(customerInput, {
        onConflict: 'email',
      })
      .select('*');
    if (error) {
      console.error('An error occurred:', error.message);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};
