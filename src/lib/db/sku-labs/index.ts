import { SKU_LAB_SKU_ITEM_ID_MAP_TABLE } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

export async function getSkuLabItemId(sku: string, type: 'kit' | 'item') {
  try {
    const { data, error } = await supabaseDatabaseClient
      .from(SKU_LAB_SKU_ITEM_ID_MAP_TABLE)
      .select('item_id')
      .eq('sku', sku)
      .eq('type', type)
      .maybeSingle();

    if (error) {
      if (error.code === 'PGRST116') {
        // This error code indicates no rows were returned
        console.warn(`[getSkuLabItemId]: No item found for sku: ${sku}`);
        return null;
      }
      throw new Error(
        `[getSkuLabItemId]: Failed to fetch item with sku: ${sku}. ${error.message}`
      );
    }

    return data?.item_id ?? null;
  } catch (error) {
    console.error(`[getSkuLabItemId]: An unexpected error occurred`, error);
    throw error; // Re-throw the error for the caller to handle
  }
}
