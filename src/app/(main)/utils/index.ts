import { DEFAULT_PRODUCT_IMAGES, colorOrder } from '@/lib/constants';
import { compareRawStrings } from '@/lib/utils';
import { TInitialProductDataDB } from '@/lib/db';
import { TQuery } from '../[productType]/components/CarPDP';

export type TPathParams = {
  productType: string;
  make?: string;
  model?: string;
  year?: string;
};

export type TQueryParams = {
  submodel?: string;
  secondSubmodel?: string;
};

export interface IProductData extends TInitialProductDataDB {
  fullProductName: string;
  mainImage: string;
  productImages: string | string[];
}

export function modelDataTransformer({
  data,
  params,
  queryParams,
}: {
  data: TInitialProductDataDB[];
  params: {
    productType: string;
    make?: string;
    model?: string;
    year?: string;
  };
  queryParams: { submodel?: string; secondSubmodel?: string };
}): IProductData[] {
  let filteredData: TInitialProductDataDB[] = data;

  console.log(filteredData.length);

  if (!!params.productType) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.type, params.productType as string)
    );
    console.log(filteredData.length);
  }

  if (!!params.make) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.make, params.make as string)
    );
    console.log(filteredData.length);
  }

  if (params.model) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.model, params.model as string)
    );
    console.log(filteredData.length);
  }

  if (params.year) {
    if (queryParams.submodel) {
      filteredData = data.filter(
        (item) =>
          item.year_generation === params.year &&
          compareRawStrings(item.submodel1, queryParams.submodel as string)
      );
      console.log(filteredData.length);
    }

    if (queryParams.secondSubmodel) {
      filteredData = data.filter(
        (item) =>
          item.year_generation === params.year &&
          compareRawStrings(
            item.submodel2,
            queryParams.secondSubmodel as string
          )
      );
      console.log(filteredData.length);
    }
    filteredData = data.filter((item) =>
      compareRawStrings(item.year_generation, params.year as string)
    );
    console.log(filteredData.length);
  }
  const finalFilteredData = generatePDPContent({
    data: filteredData,
    params,
    queryParams,
  });

  console.log(finalFilteredData.length);

  const filteredAndSortedData = finalFilteredData
    ?.filter((product) => product.msrp && product.price)
    .sort((a, b) => {
      let colorIndexA = colorOrder.indexOf(
        a?.display_color as (typeof colorOrder)[number]
      );
      let colorIndexB = colorOrder.indexOf(
        b?.display_color as (typeof colorOrder)[number]
      );

      if (colorIndexA === -1) colorIndexA = Infinity;
      if (colorIndexB === -1) colorIndexB = Infinity;

      return colorIndexA - colorIndexB;
    });

  console.log(filteredAndSortedData.length);

  return filteredAndSortedData;
}

function generatePDPContent({
  data,
  params,
  queryParams,
}: {
  data: TInitialProductDataDB[];
  params: {
    productType: string;
    make?: string;
    model?: string;
    year?: string;
  };
  queryParams: { submodel?: string; secondSubmodel?: string };
}): IProductData[] {
  const { productType, make, model, year } = params;
  const { submodel, secondSubmodel } = queryParams;
  const defaultImages =
    productType === 'car-covers'
      ? DEFAULT_PRODUCT_IMAGES.carImages
      : productType === 'suv-covers'
        ? DEFAULT_PRODUCT_IMAGES.suvImages
        : DEFAULT_PRODUCT_IMAGES.truckImages;

  return data.map((item) => {
    let fullProductName = '';
    const coverColor = item.display_color as (typeof colorOrder)[number];
    console.log(coverColor);
    let mainImage = '';
    let productImages: string | string[] = '';

    if (submodel) {
      fullProductName = `${item.year_generation} ${item.make} ${item.model} ${item.submodel1}`;
      mainImage = item.feature as string;
      productImages = item.product as string;

      if (secondSubmodel) {
        fullProductName = `${item.year_generation} ${item.make} ${item.model} ${item.submodel1}`;
      }
    }
    if (productType && make && model && year) {
      fullProductName = `${item.year_generation} ${item.make} ${item.model}`;
      mainImage = item.feature as string;
      productImages = item.product as string;
    }
    if (!year) {
      fullProductName = `${item.make} ${item.model}`;
      mainImage = defaultImages[coverColor]?.[0] as string;
      console.log(mainImage);
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    }
    if (!model && item.make) {
      console.log(item.type);

      fullProductName = item.make;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    }
    if (!make && item.type) {
      console.log(item.type);
      fullProductName = item.type;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    } else {
      console.log(item.type);
      fullProductName = item.type as string;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    }

    console.log(fullProductName);

    return {
      ...item,
      fullProductName: fullProductName,
      mainImage: mainImage,
      productImages: productImages,
    } as IProductData;
  });
}
export function getCompleteSelectionData({ data }: { data: IProductData[] }) {
  const completeSelectionState = {
    shouldDisplayType: true,
    shouldDisplayMake: true,
    shouldDisplayModel: true,
    shouldDisplayYears: true,
    shouldDisplaySubmodel: true,
    shouldDisplaySecondSubmodel: true,
    isComplete: true,
  };

  const checkUniformity = (property: keyof IProductData) =>
    data.every((item, _, arr) => item[property] === arr[0][property]);

  if (data.length > 0) {
    completeSelectionState.shouldDisplayType = !checkUniformity('type');
    completeSelectionState.shouldDisplayMake = !checkUniformity('make');
    completeSelectionState.shouldDisplayModel = !checkUniformity('model');
    completeSelectionState.shouldDisplayYears =
      !checkUniformity('year_generation');
    completeSelectionState.shouldDisplaySubmodel =
      !checkUniformity('submodel1');
    completeSelectionState.shouldDisplaySecondSubmodel =
      !checkUniformity('submodel2');

    completeSelectionState.isComplete = !(
      completeSelectionState.shouldDisplayType ||
      completeSelectionState.shouldDisplayMake ||
      completeSelectionState.shouldDisplayModel ||
      completeSelectionState.shouldDisplayYears ||
      completeSelectionState.shouldDisplaySubmodel ||
      completeSelectionState.shouldDisplaySecondSubmodel
    );
  } else {
    completeSelectionState.isComplete = false;
  }

  return {
    completeSelectionState,
  };
}

export const getUniqueValues = ({
  data,
  queryState,
}: {
  data: IProductData[];
  queryState: TQuery;
}) => {
  const uniqueValues = {
    makes: new Set<string>(),
    models: new Set<string>(),
    years: new Set<string>(),
    submodels: new Set<string>(),
    secondSubmodels: new Set<string>(),
  };

  data.forEach((item) => {
    if (item.make) uniqueValues.makes.add(item.make);
    if (item.model) uniqueValues.models.add(item.model);
    if (item.year_options) {
      item.year_options
        .split(',')
        .forEach((year) => uniqueValues.years.add(year));
    }
    if (item.submodel1 && item.year_options?.includes(queryState.year))
      uniqueValues.submodels.add(item.submodel1);
    if (
      item.submodel2 &&
      compareRawStrings(queryState.submodel, item.submodel1)
    )
      uniqueValues.secondSubmodels.add(item.submodel2);
  });

  return {
    uniqueMakes: Array.from(uniqueValues.makes).sort(),
    uniqueModels: Array.from(uniqueValues.models).sort(),
    uniqueYears: Array.from(uniqueValues.years).sort(),
    uniqueSubmodels: Array.from(uniqueValues.submodels).sort(),
    uniqueSecondSubmodels: Array.from(uniqueValues.secondSubmodels).sort(),
  };
};
