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

export type TInitialProductDataDB = Tables<'Products'>;
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

  const { data, error } = await fetch.limit(1000);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Using this to warm up the database
export async function getProductDataByPage() {
  const fetch = supabase.from('Products').select('*').range(0, 1);

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
    .from('Products')
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
  const { data, error } =
    // type === 'Seat Covers'
    //   ? await supabase
    //       .from(SEAT_COVERS_TABLE) // OR PRODUCT_DATA_TABLE
    //       .select('make, make_slug')
    //       .eq('type', type)
    //       .eq('display_id', cover)
    //       .like('year_options', `%${year}%`)
    //       .order('make_slug', { ascending: true })
    //   :
    await supabase.rpc('get_make_relation', {
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
  const tableName =
    type === 'Seat Covers' ? SEAT_COVERS_TABLE : PRODUCT_DATA_TABLE;

  // const { data, error } = await supabase
  //   .from(tableName)
  //   .select(
  //     'model, model_slug, parent_generation, submodel1, submodel2, submodel3'
  //   )
  //   .eq('type', type)
  //   .eq('display_id', cover)
  //   .like('year_options', `%${year}%`)
  //   .eq('make_slug', slugify(make))
  //   .order('model_slug', { ascending: true });

  const { data, error } = await supabase
    .from('relations_product')
    .select(
      '*,Model(*),Products(id,model,model_slug, parent_generation, submodel1, submodel2, submodel3)'
    )
    .eq('year_id', yearId)
    .eq('type_id', typeId)
    .eq('make_id', makeId)
    .order('name', { foreignTable: 'Model', ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const allProductData = data.map((relation) => relation.Products);

  const models = data
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
    .from('Products')
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
    .from('Products')
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
  const { data, error } = await supabase.rpc('get_unique_years', {
    type_id_web: type,
  });

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function getAllType() {
  const { data, error } = await supabase
    .from('Type')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
