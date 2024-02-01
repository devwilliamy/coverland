import { TQuery } from '@/app/(main)/[productType]/components/CarPDP';
import { TCarDataMaster, TProductData } from '@/lib/db';

export function filterModelData(
  modelData: TProductData[],
  pathSegments: string[] | null
) {
  if (!pathSegments || pathSegments.length === 0) {
    return modelData;
  }

  const pathSegmentsSet = new Set(pathSegments);

  return modelData.filter(
    (car) =>
      pathSegmentsSet.has(car.make_slug as string) &&
      pathSegmentsSet.has(car.model_slug as string)
  );
}

export function getFilteredModelData({
  newQuery,
  modelData,
}: {
  newQuery: TQuery;
  modelData: TCarDataMaster[];
}) {
  let filteredData = modelData;

  if (newQuery.type) {
    filteredData = filteredData.filter((sku) => sku.type === newQuery.type);
  }
  if (newQuery.make) {
    filteredData = filteredData.filter((sku) => sku.make === newQuery.make);
  }
  if (newQuery.model) {
    filteredData = filteredData.filter((sku) => sku.model === newQuery.model);
  }
  if (newQuery.year) {
    filteredData = filteredData.filter((sku) =>
      sku.year_options?.includes(newQuery.year)
    );
  }
  if (newQuery.submodel) {
    console.log('check');

    filteredData = filteredData.filter(
      (sku) => sku.submodel1 === newQuery.submodel
    );
  } else {
    console.log('check');
    filteredData = filteredData.filter((sku) => !!sku.submodel1);
  }
  if (newQuery.secondSubmodel) {
    filteredData = filteredData.filter(
      (sku) => sku.submodel2 === newQuery.secondSubmodel
    );
  }

  return filteredData;
}
