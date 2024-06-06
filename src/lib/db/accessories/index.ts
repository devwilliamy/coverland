import { ACCESSORIES_TABLE } from './../constants/databaseTableNames';
import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export type TAccessoriesData = Tables<'Accessories'>;

export async function getAllAcessories() {
  const { data, error } = await supabase.from(ACCESSORIES_TABLE).select('*');

  if (error) {
    throw new Error(error.message);
  }
  // console.log('[Accessories]: ', { data });

  return data;
}

export async function getAccessoryBySKU(sku: string) {
  const { data, error } = await supabase
    .from(ACCESSORIES_TABLE)
    .select('*')
    .eq('sku', sku);
  // acc[1]?.images?.split(',');

  if (error) {
    throw new Error(error.message);
  }
  // console.log('[Single Accessory]: ', { data });

  return data;
}
