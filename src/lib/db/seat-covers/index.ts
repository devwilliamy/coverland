import { Tables } from '../types';
import { SEAT_COVERS_TABLE, SEAT_COVERS_TABLE_NEW } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

export type TSeatCoverDataDB = Tables<'seat_covers_20240308_duplicate'>;
export type TSeatCoverDataNewDB = Tables<'seat_cover_20240322'>;

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

export async function getUniqueSeatProduct({ product_id }: { product_id: any }) {
  const { data, error } = await supabaseDatabaseClient
    .from('seat_cover_20240322')
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
    .from('seat_cover_20240322')
    .select('sku')
    .eq('type', type)
    .eq('display_id', cover)
    .eq('make', make)
    .eq('model', model)
    .eq('submodel1', submodel1)
    .limit(1)
    .single();

  // console.log(year,model,type,make,'search resutl for leather',data);

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
  let fetch = supabaseDatabaseClient.from(SEAT_COVERS_TABLE_NEW).select('*');
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

  console.log("GetSearCoverColors", data)
  if (error) {
    throw new Error(error.message);
  }

  // Leaving this for now for filtering. In the future will want to create an RPC
  const uniqueProductDataColor = [
    ...new Map(data.map((item) => [item.display_color, item])).values(),
  ];

  return uniqueProductDataColor;
}
