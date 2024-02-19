import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { deslugify } from '../utils';
import { slugToCoverType } from '../constants';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TModelFitData = Database['public']['Tables']['Products']['Row'];

export type TTables = keyof Database['public']['Tables'];

export type TableRow = keyof Database['public']['Tables'];

export type TableColumn<T extends TableRow> =
  keyof Database['public']['Tables'][T]['Row'];

export type TInitialProductDataDB = Tables<'Products-Data-02-2024'>;

export type TCarDataMaster = Tables<'Car-Data-Master'>;

export type TReviewData = Tables<'reviews-2'>;

export interface ProductJson {
  fk: number;
  generation_default: number;
  year_generation: string;
  make: string;
  model: string;
  submodel1: string;
  submodel2: string | null;
  year_options: string;
}

//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

// Adjust the type definition
export const fetchModelsOfMake = async (make: string) => {
  const { data: Models, error } = await supabase
    .from('Models')
    .select('model')
    .eq('make', make);

  // console.log(Models);

  if (error) {
    console.log(error);
  }
  return Models;
};

export async function fetchSubmodelsOfModel(model: string) {
  const { data, error } = await supabase
    .from('Products-2024')
    .select('*')
    .eq('model', model);

  const submodels1 = data?.filter((row) => !!row.submodel1) ?? [];
  const submodels2 = data?.filter((row) => !!row.submodel2) ?? [];

  if (error) {
    console.log(error);
  }
  return {
    submodels1,
    submodels2,
  };
}

export async function addOrderToDb(order: string) {
  const { data, error } = await supabase
    .from('_temp_orders')
    .insert({ order: order });

  if (error) {
    console.log(error);
  }
  return data;
}

export async function fetchGenerationReviewData(fk: string) {
  const { data, error } = await supabase
    .from('Product-Reviews')
    .select('*')
    .textSearch('sku', fk);

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

export async function getAllProductData({
  year,
  make,
  model,
  type = null,
}: {
  year?: string;
  make?: string;
  model?: string;
  type?: string | null;
}) {
  let fetch = supabase.from('Products-2024').select('*');

  if (type) {
    const query = deslugify(type).toLowerCase();
    fetch = fetch.textSearch('type', query, {
      type: 'websearch',
    });
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

  const { data, error } = await fetch;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
