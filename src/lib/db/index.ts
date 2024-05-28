import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
import { slugToCoverType } from '../constants';
import { slugify } from '../utils';
import {
  MAKE_TABLE,
  MODEL_TABLE,
  PRODUCT_DATA_TABLE,
  PRODUCT_METADATA_TABLE,
  RELATIONS_PRODUCT_TABLE,
  RPC_GET_DISTINCT_MAKES_BY_TYPE,
  RPC_GET_DISTINCT_MAKES_BY_TYPE_SEATCOVERS,
  RPC_GET_DISTINCT_MODELS_BY_TYPE_MAKE,
  RPC_GET_DISTINCT_YEARS_BY_TYPE_MAKE_MODEL,
  RPC_GET_DISTINCT_YEAR_GENERATION_BY_TYPE_MAKE_MODEL,
  RPC_GET_MAKE_RELATION,
  RPC_GET_MODEL_BY_TYPE_ID_MAKE_ID_RElATION,
  RPC_GET_UNIQUE_YEARS,
  SEAT_COVERS_TABLE,
  TYPE_TABLE,
  YEARS_TABLE,
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

  fetch = fetch.neq('quantity', '0');

  const { data, error } = await fetch.limit(1000);

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
  typeId,
  yearId,
}: {
  typeId: string;
  yearId: string;
}) {
  const { data, error } = await supabase.rpc(RPC_GET_MAKE_RELATION, {
    type_id_web: Number(typeId),
    year_id_web: Number(yearId),
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
  const { data, error } = await supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(
      `*,Model(*),${PRODUCT_DATA_TABLE}(id,model,model_slug, parent_generation, submodel1, submodel2, submodel3, quantity)`
    )
    .eq('year_id', Number(yearId))
    .eq('type_id', Number(typeId))
    .eq('make_id', Number(makeId))
    .neq(`${PRODUCT_DATA_TABLE}.quantity`, 0)
    .order('name', { foreignTable: MODEL_TABLE, ascending: false });

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

  return { uniqueCars, uniqueModels, data };
}

export async function getAllYearsByTypeMakeModel(
  typeId: number,
  makeId: number,
  modelId: number
) {
  const { data, error } = await supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(
      `*,Model(*),Years(*),${PRODUCT_DATA_TABLE}(id,model,model_slug, quantity, parent_generation, submodel1, submodel2, submodel3)`
    )
    .eq('type_id', Number(typeId))
    .eq('make_id', Number(makeId))
    .eq('model_id', Number(modelId))
    .filter(`${PRODUCT_DATA_TABLE}.quantity`, 'not.eq', '0');

  if (error) {
    throw new Error(error.message);
  }

  const allProductData = data
    .map((relation) => relation[PRODUCT_DATA_TABLE])
    .filter((product) => product != null);

  const allYears = data
    .filter((product) => {
      const dataYears = product.Years;
      if (product.Products?.quantity && product.Products?.quantity != '0') {
        return dataYears;
      }
    })
    .map((relation) => relation.Years);

  const uniqueYears = allYears.filter(
    (currentYear, index, self) =>
      index === self.findIndex((year) => year.id === currentYear.id)
  );

  const yearData = allProductData.filter(
    (year, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.year_generation === year.year_generation &&
          t.submodel1 === year.submodel1 &&
          t.submodel2 === year.submodel2 &&
          t.submodel3 === year.submodel3
      )
  );
  let submodelData: any[] = [];

  submodelData = yearData.filter(
    (year) => !submodelData.includes(year) && year
  );

  return {
    allYears,
    uniqueYears,
    yearData,
    submodelData,
  };
}

export async function getAllSubmodelsByTypeMakeModelYear(
  typeId: number,
  makeId: number,
  modelId: number,
  yearId: number
) {
  const { data, error } = await supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(
      `${PRODUCT_DATA_TABLE}(id,model,model_slug, parent_generation, submodel1, submodel2, submodel3)`
    )
    .eq('type_id', Number(typeId))
    .eq('make_id', Number(makeId))
    .eq('model_id', Number(modelId))
    .eq('year_id', Number(yearId));

  if (error) {
    throw new Error(error.message);
  }

  const allProductData = data.map((relation) => relation[PRODUCT_DATA_TABLE]);

  let uniqueSubmodel1s: string[] = [];
  let uniqueSubmodel2s: any[] = [];

  allProductData.forEach((modelData) => {
    const submodel1 = String(modelData?.submodel1);
    const submodel2 = String(modelData?.submodel2);
    if (submodel1 !== 'null' && !uniqueSubmodel1s.includes(submodel1)) {
      uniqueSubmodel1s.push(submodel1);
    }
    if (submodel2 !== 'null' && !uniqueSubmodel2s.includes(submodel2)) {
      uniqueSubmodel2s.push(submodel2);
    }
  });

  return {
    allProductData,
    uniqueSubmodel1s,
    uniqueSubmodel2s,
  };
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

export async function getDistinctMakesByType(type: string) {
  const { data, error } = await supabase.rpc(RPC_GET_DISTINCT_MAKES_BY_TYPE, {
    type: type,
  });

  if (error) {
    throw new Error(error.message);
  }

  const filteredMakes = data.map((obj: any) => obj?.make);

  return filteredMakes;
}

export async function getDistinctMakesByTypeSeatCover(type: string) {
  const { data, error } = await supabase.rpc(
    RPC_GET_DISTINCT_MAKES_BY_TYPE_SEATCOVERS,
    {
      type: type,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  const filteredMakes = data.map((obj: any) => {
    return obj?.make;
  });

  return filteredMakes;
}

export async function getDistinctModelsByTypeMake(
  type_id: number,
  make_id: number
) {
  const { data, error } = await supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(
      `*,Model(*),${PRODUCT_DATA_TABLE}(id,model,model_slug, quantity, parent_generation, submodel1, submodel2, submodel3)`
    )
    .eq('type_id', Number(type_id))
    .eq('make_id', Number(make_id))
    .filter(`${PRODUCT_DATA_TABLE}.quantity`, 'not.eq', '0');

  if (error) {
    throw new Error(error.message);
  }

  const allProductData = data
    .map((relation) => relation[PRODUCT_DATA_TABLE])
    .filter((product) => product != null);

  const models = data
    .filter((product) => {
      const dataModels = product.Model;
      if (product.Products?.quantity && product.Products?.quantity != '0') {
        return dataModels;
      }
    })
    .map((relation) => relation.Model)
    .sort((a, b) => a.name.localeCompare(b.name));
  console.log({ allProductData, models });

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

  return { modelData: models, uniqueModels, uniqueCars };
}

export async function breadcrumbsGetDistinctModelByTypeMake(
  type: string,
  make: string
) {
  const { data, error } = await supabase.rpc(
    RPC_GET_DISTINCT_MODELS_BY_TYPE_MAKE,
    {
      type: type,
      make: make,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  const filteredData = data.map((obj: any) => {
    return obj?.model;
  });

  return filteredData;
}

export async function getDistinctModelsByTypeMakeSlug(
  type: string,
  make_slug: string
) {
  const { data, error } = await supabase.rpc(
    RPC_GET_DISTINCT_MODELS_BY_TYPE_MAKE_SLUG,
    {
      type: type,
      make: make_slug,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDistinctYearsByTypeMakeModel(
  type: string,
  make: string,
  model: string
) {
  const { data, error } = await supabase.rpc(
    RPC_GET_DISTINCT_YEARS_BY_TYPE_MAKE_MODEL,
    {
      type: type,
      make: make,
      model: model,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  const distinctYearsSet = new Set<string>();

  data.forEach(({ year_options }) => {
    year_options.split(',').forEach((year) => {
      distinctYearsSet.add(year);
    });
  });

  const distinctYears = Array.from(distinctYearsSet);

  distinctYears.sort((a: string, b: string) => Number(b) - Number(a));

  return distinctYears;
}

export async function getDistinctYearGenerationByTypeMakeModelYear(
  type: string,
  make: string,
  model: string,
  year: string
) {
  const { data, error } = await supabase.rpc(
    RPC_GET_DISTINCT_YEAR_GENERATION_BY_TYPE_MAKE_MODEL,
    {
      type,
      make,
      model,
      year,
    }
  );

  if (error) {
    throw new Error(error.message);
  }
  const filteredYearGens = data.map((obj: any) => obj?.year_generation);

  return filteredYearGens;
}

export async function getTypeId(type: string) {
  const { data, error } = await supabase
    .from(TYPE_TABLE)
    .select('id')
    .eq('name', type);

  if (error) {
    throw new Error(error.message);
  }
  return data[0].id;
}

export async function editVehicleGetAllMakes() {
  const { data, error } = await supabase
    .from(MAKE_TABLE)
    .select('id, name, slug');
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function editVehicleGetAllModelsByTypeIdMakeId(
  type_id: number,
  make_id: number
) {
  const { data, error } = await supabase.rpc(
    RPC_GET_MODEL_BY_TYPE_ID_MAKE_ID_RElATION,
    {
      type_id_web: type_id,
      make_id_web: make_id,
    }
  );

  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function getMakeIdByMakeSlug(make: string) {
  const { data, error } = await supabase
    .from(MAKE_TABLE)
    .select('id')
    .eq('slug', make);

  if (error) {
    throw new Error(error.message);
  }
  const id = data[0].id;

  return id;
}

export async function getModelIdByModelSlug(model: string) {
  const { data, error } = await supabase
    .from(MODEL_TABLE)
    .select('id')
    .eq('slug', model);

  if (error) {
    throw new Error(error.message);
  }
  const id = data[0].id;

  return id;
}

export async function getYearIdByYear(year: string) {
  const { data, error } = await supabase
    .from(YEARS_TABLE)
    .select(`id`)
    .eq('name', year);

  if (error) {
    throw new Error(error.message);
  }

  const id = data[0].id;

  return id;
}

export async function getYearGenById(
  typeId: number,
  makeId: number,
  modelId: number,
  yearId: number
) {
  const { data, error } = await supabase
    .from(RELATIONS_PRODUCT_TABLE)
    .select(`id, ${PRODUCT_DATA_TABLE}(parent_generation)`)
    .eq('type_id', typeId)
    .eq('make_id', makeId)
    .eq('model_id', modelId)
    .eq('year_id', yearId);
  if (error) {
    throw new Error(error.message);
  }
  let parentGens: string[] = [];

  // Adding Parent Gens
  data
    .map((relation) => relation[PRODUCT_DATA_TABLE])
    .map((product) => {
      return product?.parent_generation;
    })
    .map((incomingParentGen) => {
      const gen = String(incomingParentGen);
      if (!parentGens.includes(gen)) {
        parentGens.push(gen);
      }
    });

  const parentGen = parentGens[0];

  return parentGen;
}
