import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { slugToCoverType } from '../constants';
import { slugify } from '../utils';
import {
  PRODUCT_DATA_TABLE,
  SEAT_COVERS_TABLE,
} from './constants/databaseTableNames';

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
    console.error(error);
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
  let fetch = supabase.from(PRODUCT_DATA_TABLE).select('*');

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

  const { data, error } = await fetch.limit(1000);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Using this to warm up the database
export async function getProductDataByPage() {
  const fetch = supabase.from('Products-Data-02-2024').select('*').range(0, 1);

  const { data, error } = await fetch.limit(1);

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
  // Leaving this here if we want to go back to the original table
  // const { data, error } = await supabase
  //   .from(TYPE_MAKE_YEAR_DISTINCT) // OR PRODUCT_DATA_TABLE
  //   .select('make, make_slug')
  //   .eq('type', type)
  //   .eq('display_id', cover)
  //   .like('year_options', `%${year}%`)
  //   .order('make_slug', { ascending: true });
  // get_distinct_makes_by_year

  // This RPC is making it so the distinct calculation and ordering is happening on the DB side instead of on the server.
  const { data, error } =
    type === 'Seat Covers'
      ? await supabase
          .from(SEAT_COVERS_TABLE) // OR PRODUCT_DATA_TABLE
          .select('make, make_slug')
          .eq('type', type)
          .eq('display_id', cover)
          .like('year_options', `%${year}%`)
          .order('make_slug', { ascending: true })
      : await supabase.rpc('get_make_and_slug', {
          type_param: type,
          display_id_param: cover,
          year_param: year,
        });

  if (error) {
    throw new Error(error.message);
  }
  // If we want to use the original table, have to do this to make it distinct
  // const uniqueCars = data.filter(
  //   (car, index, self) =>
  //     index === self.findIndex((t) => t.make_slug === car.make_slug)
  // );
  // return uniqueCars;

  return data;
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
  const tableName =
    type === 'Seat Covers' ? SEAT_COVERS_TABLE : PRODUCT_DATA_TABLE;
  const { data, error } = await supabase
    .from(tableName)
    .select(
      'model, model_slug, parent_generation, submodel1, submodel2, submodel3'
    )
    .eq('type', type)
    .eq('display_id', cover)
    .like('year_options', `%${year}%`)
    .eq('make_slug', slugify(make))
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
          t?.submodel3 === car?.submodel3
      )
  );

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

export async function getProductWithoutType({
  make,
  model,
  year,
}: {
  make: string;
  model: string;
  year: string;
}) {
  const { data, error } = await supabase
    .from('Products-Data-02-2024')
    .select('*')
    .ilike('make', make)
    .ilike('model', model)
    .like('year_options', `%${year}%`)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function getProductMetadata(URL: string) {
  const { data, error } = await supabase
    .from('Product-Metadata')
    .select('description')
    .ilike('URL', URL)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function getDistinctMakesByType(type: string) {
  const { data, error } = await supabase.rpc('get_distinct_makes_by_type', {
    type: type,
  });

  if (error) {
    throw new Error(error.message);
  }

  const filteredMakes = data.map((obj: any) => {
    return obj?.make;
  });

  return filteredMakes;
}

export async function getDistinctModelsByTypeMake(type: string, make: string) {
  const { data, error } = await supabase.rpc(
    'get_distinct_models_by_type_make',
    {
      type: type,
      make: make,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  const filteredData = data.map((obj: any) => {
    return obj?.model;
  });

  return filteredData;
}

export async function getDistinctYearsByTypeMakeModel(
  type: string,
  make: string,
  model: string
) {
  const { data, error } = await supabase.rpc(
    'get_distinct_years_by_type_make_model',
    {
      type: type,
      make: make,
      model: model,
    }
  );

  if (error) {
    throw new Error(error.message);
  }
  let distinctYears: string[] = [];
  data.filter(({ year_options }) => {
    year_options.split(',').map((year: string) => {
      !distinctYears.includes(year) && distinctYears.push(year);
    });
    return;
  });

  distinctYears.sort((a: string, b: string) => {
    return Number(b) - Number(a);
  });
  console.log('[FILTERED DISTINCT YEARS: ', distinctYears);

  return distinctYears;
}

export async function getDistinctYearGenerationFromTypeMakeModelYear(
  type: string,
  make: string,
  model: string,
  year: string
) {
  const { data, error } = await supabase.rpc(
    'get_distinct_year_generation_by_type_make_model_year',
    {
      type: type,
      make: make,
      model: model,
      year: year,
    }
  );

  if (error) {
    throw new Error(error.message);
  }
  const filteredYearGens = data.map((obj: any) => {
    return obj?.year_generation;
  });

  return filteredYearGens;
}
