import { Tables } from '../types';
import {
  SEAT_COVERS_TABLE,
} from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
import { slugToCoverType } from '@/lib/constants';
import { slugify } from '@/lib/utils';

export type TSeatCoverDataDB = Tables<'seat_cover_20240401'>;

// URL: supabase.com/dashboard/project/<project_id>/api?pages=tables-intro
//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

export async function getAllSeatCovers() {
  const { data, error } = await supabaseDatabaseClient
    .from(SEAT_COVERS_TABLE)
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUniqueSeatProduct({
  product_id,
}: {
  product_id: any;
}) {
  const { data, error } = await supabaseDatabaseClient
    .from('seat_cover_20240401')
    .select('*')
    .eq('sku', product_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUniqueSeatCoverProductSingle({
  type,
  cover,
  make,
  model,
  year,
  submodel1,
}: {
  type: string;
  cover: string;
  make: string;
  model: string;
  year: string;
  submodel1: string;
}) {
  const { data, error } = await supabaseDatabaseClient
    .from('seat_cover_20240401')
    .select('sku')
    .eq('type', type)
    .eq('display_id', cover)
    .eq('make', make)
    .eq('model', model)
    .eq('submodel1', submodel1)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSeatCoverColors({
  type,
  cover,
  make,
  model,
  parent_generation,
  submodel1,
}: {
  type: string;
  cover: string;
  make?: string;
  model?: string;
  parent_generation?: string;
  submodel1?: string;
}) {
  let fetch = supabaseDatabaseClient.from(SEAT_COVERS_TABLE).select('*');
  if (type) {
    fetch = fetch.eq('type', type);
  }

  if (cover) {
    fetch = fetch.eq('display_id', cover);
  }

  if (parent_generation) {
    fetch = fetch.eq('parent_generation', parent_generation);
  }

  if (make) {
    fetch = fetch.eq('make_slug', make);
  }

  if (model) {
    fetch = fetch.eq('model_slug', model);
  }

  if (submodel1) {
    fetch = fetch.eq('submodel1', submodel1);
  }

  const { data, error } = await fetch.limit(1000);

  if (error) {
    throw new Error(error.message);
  }

  // Leaving this for now for filtering. In the future will want to create an RPC
  const uniqueProductDataColor = [
    ...new Map(data.map((item) => [item.display_color, item])).values(),
  ];

  return uniqueProductDataColor;
}

export async function getSeatCoverProductData({
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
  // const seatCoverTypes = ['Seat Covers', 'seat-cover']
  let fetch = supabaseDatabaseClient.from(SEAT_COVERS_TABLE).select('*');

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
  const { data, error } = await supabaseDatabaseClient
    .from(SEAT_COVERS_TABLE) // OR PRODUCT_DATA_TABLE
    .select('make, make_slug')
    .eq('type', type)
    .eq('display_id', cover)
    .like('year_options', `%${year}%`)
    .order('make_slug', { ascending: true });
  // get_distinct_makes_by_year

  // This RPC is making it so the distinct calculation and ordering is happening on the DB side instead of on the server.
  // const { data, error } = await supabase.rpc('get_make_and_slug', {
  //   type_param: type,
  //   display_id_param: cover,
  //   year_param: year,
  // });

  if (error) {
    throw new Error(error.message);
  }
  // If we want to use the original table, have to do this to make it distinct
  const uniqueCars = data.filter(
    (car, index, self) =>
      index === self.findIndex((t) => t.make_slug === car.make_slug)
  );
  return uniqueCars;

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
  const { data, error } = await supabaseDatabaseClient
    .from(SEAT_COVERS_TABLE)
    .select('model, model_slug, parent_generation, submodel1, submodel2')
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
          t.submodel2 === car.submodel2
      )
  );
  // console.log('[Server]: getAllUniqueModelsByYearMake Params & Response:', {
  //   data,
  //   uniqueCars,
  //   type,
  //   cover,
  //   year,
  //   make,
  // });
  return uniqueCars;
}

export async function getSeatCoverProductsByDisplayColor({
  type,
  year,
  make,
  model,
  submodel,
  submodel2,
}: {
  type: string;
  year?: string;
  make?: string;
  model?: string;
  submodel?: string;
  submodel2?: string;
}) {
  const { data, error } = await supabaseDatabaseClient.rpc(
    'get_seat_cover_products_sorted_by_color',
    {
      p_type: type,
      p_make: make,
      p_model: model,
      p_year: year,
      p_submodel: submodel,
      p_submodel2: submodel2,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
