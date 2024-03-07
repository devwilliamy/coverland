import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { SEAT_COVERS_TABLE } from '../constants/databaseTableNames';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type TSeatCoverDataDB = Tables<'Seat-Cover'>;

// URL: supabase.com/dashboard/project/<project_id>/api?pages=tables-intro
//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

export async function getAllSeatCovers() {
  const { data, error } = await supabase.from(SEAT_COVERS_TABLE).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
