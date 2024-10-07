import { DEFAULT_PRODUCT_IMAGES, colorOrder } from '@/lib/constants';
import { compareRawStrings } from '@/lib/utils';
import { TInitialProductDataDB } from '@/lib/db';

import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { TQuery } from '@/contexts/CarSelectionContext';

export type TPathParams = {
  productType: string;
  make?: string;
  model?: string;
  year?: string;
  coverType?: string;
};

export type TQueryParams = {
  submodel?: string;
  submodel1?: string;
  secondSubmodel?: string;
  submodel2?: string;
  second_submodel?: string;
  submodel3?: string;
  third_submodel?: string;
};

export interface IProductData extends TInitialProductDataDB, TShopifyProductData {
  fullProductName: string;
  mainImage: string;
  productImages: string | string[];
}

export type TShopifyProductData = {
  title: string
}

type ShopifyTransformer = {
  data: TInitialProductDataDB[];
  params: TPathParams;
  queryParams: TQueryParams;
};

export function modelDataShopifyTransformer({
  data,
  params,
  queryParams,
}: ShopifyTransformer): IProductData[] {
  const { productType, make, model, year } = params;
  const { submodel1, submodel2, submodel3 } = queryParams;

  // Determine the default images based on product type
  const defaultImages =
    DEFAULT_PRODUCT_IMAGES[`${productType}Images`] ||
    DEFAULT_PRODUCT_IMAGES.carImages;

  // Helper function to build the full product name
  const buildFullProductName = (item: TInitialProductDataDB) => {
    return [
      item.year_generation ?? '',
      item.make ?? '',
      item.model ?? '',
      item.submodel1 ?? '',
      item.submodel2 ?? '',
      item.submodel3 ?? '',
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  // Map over the data to generate the content
  return data.map((item) => {
    let fullProductName = buildFullProductName(item);
    let mainImage = item.feature as string;
    let productImages = item?.product?.split(',') as string[];

    if (!submodel1 && !submodel2 && !submodel3) {
      if (make && model && year) {
        fullProductName = `${item.parent_generation} ${item.make} ${item.model}`;
      } else if (make && model) {
        fullProductName = `${item.make} ${item.model}`;
        mainImage =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ]?.[0] || mainImage;
        productImages =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ] || productImages;
      } else if (make && !model && !year) {
        fullProductName = `${item.make} ${item.type}`;
        mainImage =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ]?.[0] || mainImage;
        productImages =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ] || productImages;
      } else if (!make && !model && !year && item.type) {
        fullProductName = item.type as string;
        mainImage =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ]?.[0] || mainImage;
        productImages =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ] || productImages;
      } else {
        fullProductName = item.type as string;
        mainImage =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ]?.[0] || mainImage;
        productImages =
          defaultImages[
            item.display_color as keyof typeof DEFAULT_PRODUCT_IMAGES
          ] || productImages;
      }
    }

    return {
      ...item,
      fullProductName: fullProductName,
      display_id: make ? `${item.make} ${item.display_id}` : item.display_id,
      mainImage: mainImage,
      productImages: productImages,
    } as IProductData;
  });
}

export function modelDataTransformer({
  data,
  params,
  queryParams,
}: {
  data: TInitialProductDataDB[];
  params: {
    productType: string;
    coverType?: string;
    make?: string;
    model?: string;
    year?: string;
  };
  queryParams: {
    submodel?: string;
    secondSubmodel?: string;
    thirdSubmodel?: string;
  };
}): IProductData[] {
  let filteredData: TInitialProductDataDB[] = data;

  if (!!params.productType) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.type, params.productType as string)
    );
  }

  if (!!params.coverType) {
    filteredData = data.filter((item) =>
      compareRawStrings(item.display_id, params.coverType as string)
    );
  }

  if (!!params.make) {
    filteredData = filteredData.filter((item) =>
      compareRawStrings(item.make, params.make as string)
    );
  }

  if (params.model) {
    filteredData = filteredData.filter((item) =>
      compareRawStrings(item.model, params.model as string)
    );
  }

  if (params.year) {
    if (queryParams.submodel) {
      filteredData = filteredData.filter((item) =>
        compareRawStrings(item.submodel1, queryParams.submodel as string)
      );
    }

    if (queryParams.secondSubmodel) {
      filteredData = filteredData.filter((item) =>
        compareRawStrings(item.submodel2, queryParams.secondSubmodel as string)
      );
    }

    if (queryParams.thirdSubmodel) {
      filteredData = filteredData.filter((item) =>
        compareRawStrings(item.submodel3, queryParams.thirdSubmodel as string)
      );
    }

    filteredData = filteredData.filter((item) =>
      compareRawStrings(item.parent_generation, params.year as string)
    );
  }
  const finalFilteredData = generatePDPContent({
    data: filteredData,
    params,
    queryParams,
  });

  const filteredAndSortedData = finalFilteredData
    ?.filter((product) => product.msrp)
    .sort((a, b) => {
      // Preorder items should come last
      const preorderA = a.preorder ? 1 : 0;
      const preorderB = b.preorder ? 1 : 0;

      // If one of the items has preorder, sort it after the non-preorder items
      if (preorderA !== preorderB) {
        return preorderA - preorderB;
      }

      // Existing year matching logic
      const yearMatchA = a.year_generation === params.year ? 0 : 1;
      const yearMatchB = b.year_generation === params.year ? 0 : 1;

      if (yearMatchA !== yearMatchB) return yearMatchA - yearMatchB;

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
  queryParams: {
    submodel?: string;
    secondSubmodel?: string;
    thirdSubmodel?: string;
  };
}): IProductData[] {
  const { productType, make, model, year } = params;
  const { submodel, secondSubmodel, thirdSubmodel } = queryParams;
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
    let productImages: string[];

    if (submodel || secondSubmodel || thirdSubmodel) {
      fullProductName =
        `${item.year_generation ?? ''} ${item.make ?? ''} ${item.model ?? ''} ${item.submodel1 ?? ''} ${item.submodel2 ?? ''} ${item.submodel3 ?? ''}`.trim();
      mainImage = item.feature as string;
      productImages = item?.product?.split(',') as string[];
    } else if (submodel || secondSubmodel) {
      fullProductName =
        `${item.year_generation ?? ''} ${item.make ?? ''} ${item.model ?? ''} ${item.submodel1 ?? ''} ${item.submodel2 ?? ''}`.trim();
      mainImage = item.feature as string;
      productImages = item?.product?.split(',') as string[];
    } else if (productType && make && model && year) {
      fullProductName = `${item.parent_generation} ${item.make} ${item.model}`;
      mainImage = item.feature as string;
      productImages = item?.product?.split(',') as string[];
    } else if (!year && make && model) {
      fullProductName = `${item.make} ${item.model}`;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor] as string[];
    } else if (!model && make && !year && item.make) {
      fullProductName = `${item.make} ${item.type}`;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor] as string[];
    } else if (!make && !model && !year && item.type) {
      fullProductName = item.type;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor] as string[];
    } else {
      fullProductName = item.type as string;
      mainImage = defaultImages[coverColor]?.[0] as string;
      productImages = defaultImages[coverColor] as string[];
    }

    return {
      ...item,
      fullProductName: fullProductName,
      display_id: make ? `${item.make} ${item.display_id}` : item.display_id,
      mainImage: mainImage,
      productImages: productImages,
    } as IProductData;
  });
}

export function getCompleteSelectionData({
  data,
}: {
  data: IProductData[] | TSeatCoverDataDB[];
}) {
  const completeSelectionState = {
    shouldDisplayType: true,
    shouldDisplayMake: true,
    shouldDisplayModel: true,
    shouldDisplayYears: true,
    shouldDisplaySubmodel: true,
    shouldDisplaySecondSubmodel: true,
    shouldDisplayThirdSubmodel: true,
    isComplete: true,
  };

  const normalize = (value: string) => (value === null ? '' : value);

  const checkUniformity = (
    property: keyof IProductData | keyof TSeatCoverDataDB
  ) =>
    data.every(
      (item, _, arr) =>
        normalize(item[property]) === normalize(arr[0][property])
    );

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
    completeSelectionState.shouldDisplayThirdSubmodel =
      !checkUniformity('submodel3');

    completeSelectionState.isComplete = !(
      completeSelectionState.shouldDisplayType ||
      completeSelectionState.shouldDisplayMake ||
      completeSelectionState.shouldDisplayModel // ||
      // completeSelectionState.shouldDisplayYears ||
      // completeSelectionState.shouldDisplaySubmodel ||
      // completeSelectionState.shouldDisplaySecondSubmodel ||
      // completeSelectionState.shouldDisplayThirdSubmodel
    );
  } else {
    completeSelectionState.isComplete = false;
  }

  return {
    completeSelectionState,
  };
}

// Up for deletion [WY] 8/13/24
// export const getUniqueValues = ({
//   data,
//   queryState,
// }: {
//   data: IProductData[];
//   queryState: TQuery;
// }) => {
//   const uniqueValues = {
//     makes: new Set<string>(),
//     models: new Set<string>(),
//     years: new Set<string>(),
//     submodels: new Set<string>(),
//     secondSubmodels: new Set<string>(),
//     thirdSubmodels: new Set<string>(),
//   };
//   let filteredData = data.filter((item) => {
//     return compareRawStrings(item.type, queryState.type);
//   });

//   if (queryState.make) {
//     filteredData = filteredData.filter((item) =>
//       compareRawStrings(item.make, queryState.make)
//     );
//   }

//   filteredData.forEach((item) => {
//     if (item.make) uniqueValues.makes.add(item.make);
//     if (item.model && compareRawStrings(item.make, queryState.make))
//       uniqueValues.models.add(item.model);
//     if (item.year_options && compareRawStrings(item.model, queryState.model)) {
//       item.year_options
//         .split(',')
//         .forEach((year) => uniqueValues.years.add(year));
//     }
//     if (
//       item.submodel1 &&
//       item.year_options?.includes(queryState.year) &&
//       compareRawStrings(queryState.model, item.model)
//     )
//       uniqueValues.submodels.add(item.submodel1);
//     if (
//       item.submodel2 &&
//       compareRawStrings(queryState.submodel, item.submodel1) &&
//       item.year_options?.includes(queryState.year) &&
//       compareRawStrings(queryState.model, item.model)
//     )
//       uniqueValues.secondSubmodels.add(item.submodel2);
//     // if (
//     //   item.submodel2 &&
//     //   compareRawStrings(queryState.submodel, item.submodel1) &&
//     //   item.year_options?.includes(queryState.year) &&
//     //   compareRawStrings(queryState.model, item.model)
//     // )
//     //   uniqueValues.thirdSubmodels.add(item.submodel3);
//   });

//   return {
//     uniqueMakes: Array.from(uniqueValues.makes).sort(),
//     uniqueModels: Array.from(uniqueValues.models).sort(),
//     uniqueYears: Array.from(uniqueValues.years).sort(
//       (a, b) => parseInt(b) - parseInt(a)
//     ),
//     uniqueSubmodels: Array.from(uniqueValues.submodels).sort(),
//     uniqueSecondSubmodels: Array.from(uniqueValues.secondSubmodels).sort(),
//   };
// };

export function removeWwwFromUrl(url: string): string {
  return url?.replace(/www\./, '');
}
