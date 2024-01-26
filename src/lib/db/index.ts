import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import {
  TPDPPathParams,
  TPDPQueryParams,
} from '@/app/(main)/[productType]/[...product]/page';
import { deslugify } from '../utils';
import { refreshRoute } from '@/app/(main)/[productType]/[...product]/actions';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TProductData = Database['public']['Tables']['Products-2024']['Row'];
export type TModelFitData = Database['public']['Tables']['Products']['Row'];

export type TTables = keyof Database['public']['Tables'];

export type TableRow = keyof Database['public']['Tables'];

export type TableColumn<T extends TableRow> =
  keyof Database['public']['Tables'][T]['Row'];

export type TProducts20204 = Tables<'Products-2024'>;

export type TCarDataMaster = Tables<'Car-Data-Master'>;

export type TReviewData = Tables<'Product-Reviews'>;
export interface TProductsInColumnArgs {
  where?: {
    [key in keyof TProducts20204]?: TProducts20204[key];
  };
  includes?: {
    [key in keyof TProducts20204]?: TProducts20204[key];
  };
}

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

export async function fetchPDPData(
  pathParams: TPDPPathParams
): Promise<TProductData[] | null> {
  const makeFromPath = pathParams?.product[0];
  const modelFromPath = pathParams?.product[1];
  const yearFromPath = pathParams?.product[2];

  // console.log(
  //   makeFromPath,
  //   modelFromPath,
  //   yearFromPath,
  //   pathParams?.product[2]
  // );

  const { data, error } = await supabase
    .from('Products-2024')
    .select('*')
    .eq('model_slug', modelFromPath);

  console.log(data?.length);
  if (error) {
    console.log(error);
  }
  refreshRoute('/');

  return data;
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

export async function fetchReviewData(
  queryParams: TPDPQueryParams,
  params: TPDPPathParams
) {
  const make = params?.product[0];
  const model = params?.product[1];
  // const year = params?.product[2];
  const submodel1 = queryParams?.submodel;
  const submodel2 = queryParams?.second_submodel;

  const modelDisplayName = deslugify(model);
  const makeDisplayName = deslugify(make);

  // console.log(modelDisplayName, makeDisplayName);

  let fetch = supabase
    .from('Product-Reviews')
    .select('*')
    .eq('model', modelDisplayName)
    .eq('make', makeDisplayName);

  if (submodel1) {
    // const submodelDisplayname = deslugify(submodel1);
    // console.log('submodel1', submodelDisplayname);
    fetch = fetch.textSearch('submodel1', `'${submodel1}'`);
  }

  if (submodel2) {
    const submodelDisplayname = deslugify(submodel2);
    // console.log('submodel1', submodel2);

    fetch = fetch.eq('submodel2', submodelDisplayname);
  }

  const { data, error } = await fetch;
  if (error) {
    console.log(error);
  }
  // console.log(data);

  if (data?.length) {
    return data;
  }

  return null;
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

export async function getReviewData({
  year,
  make,
  model,
}: {
  year?: string;
  make?: string;
  model?: string;
}) {
  let fetch = supabase.from('Product-Reviews').select('*');

  if (make) {
    fetch = fetch.textSearch('make', make);
  }

  if (model) {
    fetch = fetch.textSearch('model', model);
  }

  const { data, error } = await fetch;

  if (year) {
  }
  if (error) {
    console.log(error);
  }
  return data;
}

export async function fetchPDPDataWithQuery(
  queryParams: TPDPQueryParams,
  params: TPDPPathParams
): Promise<TProductData[] | null> {
  const make = params?.product[0];
  const model = params?.product[1];
  const submodel1 = queryParams?.submodel;
  const submodel2 = queryParams?.second_submodel;
  const yearFromPathStart = params?.product[2]?.split('-')[0];
  const yearFromPathEnd = params?.product[2]?.split('-')[1];

  let fetch = supabase
    .from('Products-2024')
    .select('*')
    .eq('model_slug', model)
    .eq('make_slug', make)
    .or(
      `year_range.ilike.%${yearFromPathStart}%,year_range.ilike.%${yearFromPathEnd}%`
    );

  if (submodel1) {
    // console.log('submodel1', submodel1);
    fetch = fetch.eq('submodel1_slug', submodel1);
  }

  if (submodel2) {
    fetch = fetch.textSearch('submodel2_slug', submodel2);
  }

  // console.log(make, model, submodel1);

  const { data, error } = await fetch;
  // console.log(data);

  console.log('fetching with query params', data?.length);
  if (error) {
    console.log(error);
  }
  return data;
}

export async function getProductData({
  year,
  make,
  model,
}: {
  year?: string;
  make?: string;
  model?: string;
}) {
  let fetch = supabase.from('Car-Data-Master').select('*');

  if (year) {
    fetch = fetch.eq('parent_generation', year);
  }

  if (make) {
    fetch = fetch.textSearch('make_string', make);
  }

  if (model) {
    fetch = fetch.textSearch('model_string', model);
  }

  const { data, error } = await fetch;

  console.log(data, year, model, make);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllProductData({
  year,
  make,
  model,
}: {
  year?: string;
  make?: string;
  model?: string;
}) {
  let fetch = supabase.from('Products-2024').select('*');

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

  console.log(data, year, model, make);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
