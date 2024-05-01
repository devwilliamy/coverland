import {
  TYPE_MAKE_MODEL,
  VEHICLE_TYPE_VIDEO,
} from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

export async function getAllVideos() {
  const { data, error } = await supabaseDatabaseClient
    .from(VEHICLE_TYPE_VIDEO)
    .select('*');
  console.log('data:', data);

  if (error) {
    console.error('Video:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function getVideoByType(type: string) {
  const { data, error } = await supabaseDatabaseClient
    .from(VEHICLE_TYPE_VIDEO)
    .select('*')
    .eq('type', type);

  if (error) {
    console.error('Video:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function getType(make: string, model: string) {
  const { data, error } = await supabaseDatabaseClient
    .from(TYPE_MAKE_MODEL)
    .select('*')
    .eq('make_slug', make)
    .eq('model_slug', model);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
