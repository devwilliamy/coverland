import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export type TReviewData = Tables<'Accessories'>;

export async function getAllAcessories() {
  const { data, error } = await supabase.from('Accessories').select('*');

  if (error) {
    throw new Error(error.message);
  }
  console.log('[Accessories]: ', { data });

  //   return data;
}
