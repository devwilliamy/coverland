import { supabaseAdminPanelDatabaseClient } from '../adminPaneSupabaseClient';
import { ADMIN_PANEL_PRODUCTS } from '../constants/databaseTableNames';

export async function getProductAndPriceBySku(skus: string[]) {
  try {
    if (!skus.length) {
      throw new Error('No SKUs provided');
    }

    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_PRODUCTS) 
      .select('id, sku, msrp') 
      .in('sku', skus); 
    if (error) {
      console.error('Error fetching product details:', error.message);
      throw error; 
    }

    return data; 
  } catch (error: any) {
    console.error('Failed to fetch product details:', error.message);
    
    throw error;
  }
}
