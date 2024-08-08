import { Tables } from '../types';
import { RPC_GET_SEAT_COVER_SORTED_BY_COLOR } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

// export type TSeatCoverDataDB = Tables<'Products'>;
export type TSeatCoverDataDB = Tables<'Products'>;

// URL: supabase.com/dashboard/project/<project_id>/api?pages=tables-intro
//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

export async function getSeatCoverProductsByDisplayColor({
  type,
  cover,
  year,
  make,
  model,
  submodel,
  submodel2,
  submodel3,
}: {
  type: string;
  cover?: string;
  year?: string;
  make?: string;
  model?: string;
  submodel?: string;
  submodel2?: string;
  submodel3?: string;
}) {
  const { data, error } = await supabaseDatabaseClient.rpc(
    RPC_GET_SEAT_COVER_SORTED_BY_COLOR,
    {
      p_type: type,
      p_cover: 'Leather',
      p_make: make,
      p_model: model,
      p_year: year,
      p_submodel: submodel,
      p_submodel2: submodel2,
      p_submodel3: submodel3,
    }
  );

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
