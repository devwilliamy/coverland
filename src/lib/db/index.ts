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
    fetch = fetch.eq('display_id', coverValue);
  }

  if (year) {
    fetch = fetch.eq('parent_generation', year);
  }

  if (make) {
    fetch = fetch.eq('make_slug', make);
  }

  if (model) {
    fetch = fetch.eq('model_slug', model);
  }

  const { data, error } = await fetch.limit(4000);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllMakes({
  type,
  cover,
}: {
  type: string;
  cover: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select('make_slug')
    .eq('type', type)
    .eq('display_id', cover);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllUniqueMakesByYear({
  type,
  cover,
  year,
}: {
  type: string;
  cover: string;
  year: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select('make, make_slug')
    .eq('type', type)
    .eq('display_id', cover)
    .like('year_options', `%${year}%`)
    .order('make_slug', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  const uniqueCars = data.filter(
    (car, index, self) =>
      index === self.findIndex((t) => t.make_slug === car.make_slug)
  );
  return uniqueCars;
}

export async function getAllUniqueModelsByYearMake({
  type,
  cover,
  year,
  make,
}: {
  type: string;
  cover: string;
  year: string;
  make: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select(
      'model, model_slug, parent_generation, submodel1, submodel2, submodel3'
    )
    .eq('type', type)
    .eq('display_id', cover)
    .like('year_options', `%${year}%`)
    .eq('make', make)
    .order('model_slug', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  const uniqueCars = data.filter(
    (car, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.model_slug === car.model_slug &&
          t.submodel1 === car.submodel1 &&
          t.submodel2 === car.submodel2 &&
          t.submodel3 === car.submodel3
      )
  );
  console.log('Modle Unque Car:', uniqueCars);
  return uniqueCars;
}

export async function getAllModels({
  type,
  cover,
  make,
}: {
  type: string;
  cover: string;
  make: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select('model_slug')
    .eq('type', type)
    .eq('display_id', cover)
    .eq('make', make);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllYears({
  type,
  cover,
  make,
  model,
}: {
  type: string;
  cover: string;
  make: string;
  model: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select('parent_generation')
    .eq('type', type)
    .eq('display_id', cover)
    .eq('make', make)
    .eq('model', model);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
