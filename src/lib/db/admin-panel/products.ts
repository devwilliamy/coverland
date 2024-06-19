import { supabaseAdminPanelDatabaseClient } from '../adminPanelSupabaseClient';
import { PRODUCT_DATA_TABLE } from '../constants/databaseTableNames';

export async function getProductAndPriceBySku(skus: string[]) {
  try {
    if (!skus.length) {
      throw new Error('No SKUs provided');
    }

    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(PRODUCT_DATA_TABLE) 
      .select('id, sku, msrp, price') 
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
