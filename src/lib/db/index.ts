import { slugify } from './../utils';
import { createClient } from '@supabase/supabase-js';
import { Database, Enums, Tables } from './types';
import {
  TPDPPathParams,
  TPDPQueryParams,
} from '@/app/[productType]/[...product]/page';
import { deslugify } from '../utils';
import { refreshRoute } from '@/app/[productType]/[...product]/actions';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

console.log(supabaseUrl, supabaseKey);

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TProductData = Database['public']['Tables']['Products-2024']['Row'];
export type TModelFitData = Database['public']['Tables']['Products']['Row'];

export type TTables = keyof Database['public']['Tables'];

export type TableRow = keyof Database['public']['Tables'];

export type TableColumn<T extends TableRow> =
  keyof Database['public']['Tables'][T]['Row'];

export type TProducts20204 = Tables<'Products-2024'>;

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

// Define the type for filters
interface FilterCriterion {
  filterBy: string;
  filterValue: any;
}

// Adjust the type definition
export const fetchModelsOfMake = async (make: string) => {
  let { data: Models, error } = await supabase
    .from('Models')
    .select('model')
    .eq('make', make);
  console.log('ran');

  // console.log(Models);

  if (error) {
    console.log(error);
  }
  return Models;
};

export async function fetchSubmodelsOfModel(model: string) {
  let { data, error } = await supabase
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

export async function fetchFilteredProducts({
  where,
  includes,
}: TProductsInColumnArgs) {
  console.log(where);
  if (!where?.type || !includes?.year_range) return [];
  try {
    console.log('fetching products');
    let query = supabase.from('Products-2024').select();

    if (where) {
      Object.entries(where).forEach(([key, value]) => {
        if (!key || !value) return;
        console.log('updating query');

        if (key && value) query = query.eq(key, value);
      });
    }

    if (includes) {
      Object.entries(includes).forEach(([key, value]) => {
        console.log('updating query');

        if (key && typeof value === 'string')
          query = query.textSearch(key, value);
      });
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }
    const uniqueModels = data
      .map((item) => {
        return {
          model: item.model,
          make: item.make,
          submodel1: item.submodel1,
          submodel2: item.submodel2,
          year_range: item.year_range,
          slug: item.product_url_slug,
          generation: item.year_generation,
          sku: item.sku,
        };
      })
      .filter(
        (value, index, self) => self.indexOf(value) === index && !!value.model
      );

    // console.log('models', uniqueModels, data.length);

    return uniqueModels.length ? uniqueModels : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const getAllDefaultGenerations = async () => {
  const { data, error } = await supabase
    .from('Products')
    .select('generation_default')
    .not('generation_default', 'is', null);

  if (error) {
    console.log(error);
  }

  const set = Array.from(new Set(data?.map((row) => row.generation_default)));
  return set;
};

export const getGenerationData = async () => {
  let fetch = supabase.from('Products').select(`fk, generation_default`);

  const { data, error } = await fetch;

  if (error) {
    console.log(error);
  }

  return data;
};

export async function fetchPDPData(
  pathParams: TPDPPathParams
): Promise<TProductData[] | null> {
  const makeFromPath = pathParams?.product[0];
  const modelFromPath = pathParams?.product[1];
  const yearFromPath = pathParams?.product[2];

  console.log(
    makeFromPath,
    modelFromPath,
    yearFromPath,
    pathParams?.product[2]
  );

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

export async function addOrderToDb(order: any) {
  const { data, error } = await supabase
    .from('_temp_orders')
    .insert({ order: order });

  if (error) {
    console.log(error);
  }
  return data;
}

export async function fetchDropdownData(fkey: string) {
  // const { data, error } = await supabase
  //   .from('Products')
  //   .select('*')
  //   .eq('fk', fkey);

  const modelData = await supabase
    .from('Products-2024')
    .select('*')
    .textSearch('sku', fkey);
  // console.log(modelData);

  return modelData;
}

export async function fetchModelToDisplay(fk: string) {
  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('fk', fk);

  // console.log(data);

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
  const year = params?.product[2];
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
    const submodelDisplayname = deslugify(submodel1);
    // console.log('submodel1', submodel1);
    fetch = fetch.textSearch('submodel1', submodelDisplayname);
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
