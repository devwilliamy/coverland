import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { slugToCoverType } from '../constants';
import { slugify } from '../utils';
import {
  PRODUCT_DATA_TABLE,
  PRODUCT_METADATA_TABLE,
  RELATIONS_PRODUCT_TABLE,
  RPC_GET_MAKE_RELATION,
  RPC_GET_UNIQUE_YEARS,
  TYPE_TABLE,
} from './constants/databaseTableNames';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TInitialProductDataDB = Tables<'Products'>;
export type TSeatCoverDataDB = Tables<'Products'>;

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
    const coverValue =
      slugToCoverType[cover as keyof typeof slugToCoverType] ?? cover;
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

  const { data, error } = await fetch.limit(750);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Takes the first 10 ids of each color and grabs them for car covers
 * This is to ensure /car-covers/premium-plus has all the colors displaying
 * and there's enough choices to activate searching for your custom cover
 * @returns
 */
export async function getDefaultProductData() {
  const ids = [
    // Black Red Stripe
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    // Black Gray Stripe
    2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292,
    // Gray Black Stripe
    4565, 4566, 4567, 4568, 4569, 4570, 4571, 4572, 4573, 4574,
    // Black Gray 2-Tone
    9129, 9130, 9131, 9132, 9133, 9134, 9135, 9136, 9137, 9138,
    // Black Red 2-Tone
    6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856,
  ];
  let fetch = supabase.from(PRODUCT_DATA_TABLE).select('*').in('id', ids);

  const { data, error } = await fetch;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Using this to warm up the database
export async function getProductDataByPage() {
  const fetch = supabase.from(PRODUCT_DATA_TABLE).select('*').range(0, 1);

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
    .from(PRODUCT_DATA_TABLE)
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
  typeId,
  yearId,
}: {
  type: string;
  cover: string;
  year: string;
  typeId: string;
  yearId: string;
}) {
  const { data, error } = await supabase.rpc(RPC_GET_MAKE_RELATION, {
    type_id_web: typeId,
    year_id_web: yearId,
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
  makeId,
  typeId,
  yearId,
}: {
  type: string;
  cover: string;
  year: string;
  make: string;
  makeId: string;
  typeId: string;
  yearId: string;
}) {
  let query = supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(
      `*,Model(*),${PRODUCT_DATA_TABLE}(id,model,model_slug, parent_generation, submodel1, submodel2, submodel3, quantity)`
    )
    .eq('year_id', yearId)
    .eq('type_id', typeId)
    .eq('make_id', makeId);

  query = query.order('name', { foreignTable: 'Model', ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const allProductData = data
    .map((relation) => relation[PRODUCT_DATA_TABLE])
    .filter((item) => item !== null);
  const models = data
    .filter((relation) => relation[PRODUCT_DATA_TABLE] !== null)
    .map((relation) => relation.Model)
    .sort((a, b) => a.name.localeCompare(b.name));
  const uniqueModels = models.filter(
    (model, index, self) => index === self.findIndex((m) => m.id === model.id)
  );

  const uniqueCars = allProductData.filter(
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

  // const uniqueCars = data.filter(
  //   (car, index, self) =>
  //     index ===
  //     self.findIndex(
  //       (t) =>
  //         t.model_slug === car.model_slug &&
  //         t.submodel1 === car.submodel1 &&
  //         t.submodel2 === car.submodel2 &&
  //         t?.submodel3 === car?.submodel3
  //     )
  // );

  // console.log('[Server]: getAllUniqueModelsByYearMake Params & Response:', {
  //   data,
  //   uniqueCars,
  //   type,
  //   cover,
  //   year,
  //   make,
  // });
  return { uniqueCars, uniqueModels, data };
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
    .from(PRODUCT_DATA_TABLE)
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
    .from(PRODUCT_DATA_TABLE)
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

export async function getAllYearByType({ type }: { type: any }) {
  const { data, error } = await supabase.rpc(RPC_GET_UNIQUE_YEARS, {
    type_id_web: type,
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function getAllType() {
  const { data, error } = await supabase
    .from(TYPE_TABLE)
    .select('*')
    .order('id', { ascending: true });

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
    .from(PRODUCT_DATA_TABLE)
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
    .from(PRODUCT_METADATA_TABLE)
    .select('description')
    .ilike('URL', URL)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
