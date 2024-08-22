import { ORDER_TAXES } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

export const postTaxData = async (taxEntries) => {
  try {
    const { data, error } = await supabaseDatabaseClient
      .from(ORDER_TAXES)
      .insert(taxEntries);
    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Tax ID Exists');
      } else {
        console.error('An error occurred:', error.message);
      }
    }
    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};
