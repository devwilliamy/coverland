import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { slugToCoverType } from '../constants';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TInitialProductDataDB = Tables<'Products-Data-02-2024'>;

export type TReviewData = Tables<'reviews-2'>;

//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

// Adjust the type definition

export async function addOrderToDb(order: string) {
  const { data, error } = await supabase
    .from('_temp_orders')
    .insert({ order: order });

  if (error) {
    console.log(error);
  }
  return data;
}

export async function getProductData({
  year,
  make,
  model,
  type,
  cover,
}: {
  year?: string;
  make?: string;
  model?: string;
  type?: string;
  cover?: string;
}) {
  let fetch = supabase.from('Products-Data-02-2024').select('*');

  if (type) {
    fetch = fetch.eq('type', type);
  }

  if (cover) {
    const coverValue = slugToCoverType[cover as keyof typeof slugToCoverType];
    console.log(coverValue);
    fetch = fetch.eq('display_id', coverValue);
  }

  if (year) {
    console.log(year);
    fetch = fetch.eq('parent_generation', year);
  }

  if (make) {
    fetch = fetch.eq('make_slug', make);
    console.log(make);
  }

  if (model) {
    fetch = fetch.eq('model_slug', model);
    console.log(model);
  }

  const { data, error } = await fetch.limit(4000);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
