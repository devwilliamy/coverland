// import { Tables } from '../types';
import {  ADMIN_PANEL_ORDERS } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
// import { slugToCoverType } from '@/lib/constants';
// import { slugify } from '@/lib/utils';

// export type TSeatCoverDataDB = Tables<'seat_covers'>;

// URL: supabase.com/dashboard/project/<project_id>/api?pages=tables-intro
//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

export async function getAllCompleteOrders() {
  const { data, error } = await supabaseDatabaseClient
    .from(ADMIN_PANEL_ORDERS)
    .select('*')

    .eq('status', 'COMPLETE');

  if (error) {
    throw new Error(error.message);
  }

  console.log("orders", data[0]);
  return data;
}