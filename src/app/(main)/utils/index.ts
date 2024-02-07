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

  if (!!params.productType) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.type, params.productType as string)
    );
  }

  if (!!params.make) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.make, params.make as string)
    );
  }

  if (params.model) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.model, params.model as string)
    );
  }

  if (params.year) {
    if (queryParams.submodel) {
      filteredData = data.filter(
        (item) =>
          item.year_generation === params.year &&
          compareRawStrings(item.submodel1, queryParams.submodel as string)
      );
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
    }
    filteredData = data.filter((item) =>
      compareRawStrings(item.parent_generation, params.year as string)
    );
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
  console.log(data);
  const defaultImages =
    productType === 'car-covers'
      ? DEFAULT_PRODUCT_IMAGES.carImages
      : productType === 'suv-covers'
        ? DEFAULT_PRODUCT_IMAGES.suvImages
        : DEFAULT_PRODUCT_IMAGES.truckImages;

  return data.map((item) => {
    let fullProductName = '';
    const coverColor = item.display_color as (typeof colorOrder)[number];
    let mainImage = '';
    let productImages: string | string[] = '';

    if (submodel || secondSubmodel) {
      console.log('here');

      fullProductName =
        `${item.year_generation ?? ''} ${item.make ?? ''} ${item.model ?? ''} ${submodel ?? ''} ${secondSubmodel ?? ''}`.trim();
      mainImage = item.feature as string;
      productImages = item.product as string;
    } else if (productType && make && model && year) {
      console.log('here');

      fullProductName = `${item.parent_generation} ${item.make} ${item.model}`;
      mainImage = item.feature as string;
      productImages = item.product as string;
    } else if (!year && make && model) {
      console.log('here');

      fullProductName = `${item.make} ${item.model}`;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    } else if (!model && make && !year && item.make) {
      console.log('here');
      fullProductName = `${item.make} ${item.type}`;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    } else if (!make && !model && !year && item.type) {
      console.log('here');

      fullProductName = item.type;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
      console.log(mainImage);
    } else {
      console.log('here');

      fullProductName = item.type as string;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor]?.slice(1) as string[];
    }

    console.log(mainImage, productImages);

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
  console.log(data.length);

  let filteredData = data.filter((item) => {
    return compareRawStrings(item.type, queryState.type);
  });

  if (queryState.make) {
    filteredData = filteredData.filter((item) =>
      compareRawStrings(item.make, queryState.make)
    );
  }

  filteredData.forEach((item) => {
    if (item.make) uniqueValues.makes.add(item.make);
    if (item.model && compareRawStrings(item.make, queryState.make))
      uniqueValues.models.add(item.model);
    if (item.year_options && compareRawStrings(item.model, queryState.model)) {
      item.year_options
        .split(',')
        .forEach((year) => uniqueValues.years.add(year));
    }
    if (
      item.submodel1 &&
      item.year_options?.includes(queryState.year) &&
      compareRawStrings(queryState.model, item.model)
    )
      uniqueValues.submodels.add(item.submodel1);
    if (
      item.submodel2 &&
      compareRawStrings(queryState.submodel, item.submodel1) &&
      item.year_options?.includes(queryState.year) &&
      compareRawStrings(queryState.model, item.model)
    )
      uniqueValues.secondSubmodels.add(item.submodel2);
  });

  console.log(filteredData.length);

  return {
    uniqueMakes: Array.from(uniqueValues.makes).sort(),
    uniqueModels: Array.from(uniqueValues.models).sort(),
    uniqueYears: Array.from(uniqueValues.years).sort(
      (a, b) => parseInt(b) - parseInt(a)
    ),
    uniqueSubmodels: Array.from(uniqueValues.submodels).sort(),
    uniqueSecondSubmodels: Array.from(uniqueValues.secondSubmodels).sort(),
  };
};
