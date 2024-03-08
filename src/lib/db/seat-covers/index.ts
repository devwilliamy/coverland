import { Tables } from '../types';
import { SEAT_COVERS_TABLE } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

export type TSeatCoverDataDB = Tables<'seat_covers_20240308'>;

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
