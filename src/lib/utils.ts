import { TInitialProductDataDB } from './db/index';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  DISCOUNT_25_LOWER_BOUND,
  DISCOUNT_25_UPPER_BOUND,
  NO_DISCOUNT_LOWER_BOUND,
  NO_DISCOUNT_UPPER_BOUND,
  modelStrings,
} from './constants';

import { TCartItem } from './cart/useCart';
import { Dispatch, SetStateAction } from 'react';
import { IProductData } from '@/utils';
import { TSeatCoverDataDB } from './db/seat-covers';
import { parsePhoneNumber } from 'libphonenumber-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToDisplayName(model: string) {
  return modelStrings[model] ?? model;
}

export function stringToSlug(str: string) {
  // Replace spaces with + and remove special characters, then convert to lower case
  const slug = str
    ?.trim() // Remove whitespace from both ends of a string
    .toLowerCase() // Convert the string to lowercase letters
    .replace(/[^a-z0-9 ]/g, '') // Remove all non-word chars except spaces
    .replace(/\s+/g, '+'); // Replace spaces with +

  return slug;
}

//TODO - slowly migrate from slugify to compareRawStrings for string comparison (not for URL generation)
export const slugify = (str: string) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const deslugify = (slug: string) => {
  if (typeof slug !== 'string') return slug;

  // Handle specific cases
  if (slug.toLowerCase() === 'bmw') return 'BMW';
  if (slug.toLowerCase() === '1-series-hatchback') return '1-Series Hatchback';
  if (slug.toLowerCase() === '2-series') return '2-Series';
  if (slug.toLowerCase() === '3-series') return '3-Series';
  if (slug.toLowerCase() === '4-series') return '4-Series';
  if (slug.toLowerCase() === '5-series') return '5-Series';
  if (slug.toLowerCase() === '6-series') return '6-Series';
  if (slug.toLowerCase() === '7-series') return '7-Series';
  if (slug.toLowerCase() === 'f-150') return 'F-150';
  if (slug.toLowerCase() === 'suv') return 'SUV';
  if (slug.toLowerCase() === 'suv covers') return 'SUV Covers';
  if (slug.toLowerCase() === 'suv-covers') return 'SUV Covers';

  // Check if the format is like a date range (e.g., 2006-2016)
  const dateRangePattern = /^\d{4}-\d{4}$/;
  if (dateRangePattern.test(slug)) return slug;

  // General case
  return slug
    .replace(/-/g, ' ')
    .trim()
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export function getNewestModel(array: TInitialProductDataDB[]) {
  return array.sort((a, b) => {
    const getLastYear = (item: TInitialProductDataDB) => {
      if (!item?.year_generation) return 0;
      const years = item?.year_generation.split('-');
      return parseInt(years[years.length - 1]);
    };

    const lastYearA = getLastYear(a);
    const lastYearB = getLastYear(b);

    return lastYearB - lastYearA;
  });
}

export function getUniqueYearGenerations(array: TInitialProductDataDB[]) {
  const unique = new Set();

  array.forEach((item) => {
    if (item.year_generation !== null) {
      unique.add(item.year_generation);
    }
  });

  return Array.from(unique);
}

//TODO - slowly migrate from slugify to compareRawStrings for string comparison (not for URL generation)
//TODO - maybe a library of function to more reliably compare strings
export function compareRawStrings(
  str1: string | null | undefined,
  str2: string | null
) {
  if (!str1 || !str2) return false;

  let processedStr1 = String(str1).toLowerCase();
  let processedStr2 = String(str2).toLowerCase();

  processedStr1 = processedStr1.replace(/[^a-z0-9]/g, '');
  processedStr2 = processedStr2.replace(/[^a-z0-9]/g, '');

  return processedStr1 === processedStr2;
}

export function groupProductsBy(
  attribute: keyof TInitialProductDataDB,
  array: TInitialProductDataDB[]
) {
  const groups = array.reduce(
    (accumulator, currentValue) => {
      const groupKey = String(currentValue[attribute]);
      if (!accumulator[groupKey]) {
        accumulator[groupKey] = [];
      }
      accumulator[groupKey].push(currentValue);
      return accumulator;
    },
    {} as Record<string, TInitialProductDataDB[]>
  );

  return Object.keys(groups);
}

export const generateProductsLeft = (
  selectedProduct: TInitialProductDataDB | null | undefined
): number => {
  let productAmount = 0;
  if (selectedProduct && selectedProduct.sku) {
    for (let i = 0; i < selectedProduct.sku.length; i++) {
      const char = selectedProduct.sku[i];
      productAmount += char.charCodeAt(0) * i;
    }
    productAmount = Math.log(productAmount);
    const productString = productAmount.toString();
    for (let i = 5; i < productString.length; i++) {
      const num = parseInt(productString[i]);
      if (num > 2 && num < 7) {
        productAmount = num;
        break;
      }
    }
  }
  return productAmount;
};

export const generateNumberFromCarBuild = (
  type: string,
  displayId: string,
  make: string,
  model: string,
  yearGeneration: string
): number => {
  const combinedString = `${type}${displayId}${make}${model}${yearGeneration}`;

  // Simple hash function to convert SKU to a numeric value
  const hash = Array.from(combinedString).reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  // Normalize the hash value to a range between 0 and 1
  const normalizedHash = (hash % 1000) / 1000;

  // Scale the normalized value to the range [4.6, 4.8]
  const scaledValue = 4.5 + normalizedHash * 0.3;
  return scaledValue;
};

// export function getColorOptions(data: Model[], selectedModel: { year_generation: number }): string[] {
//   return data
//     .filter(
//       (model): model is Model & { feature: string[] } =>
//         model.year_generation === selectedModel.year_generation &&
//         model.feature?.includes('category-images-new')
//     )
//     .flatMap((model) => model.feature)
//     .filter(Boolean) as string[];
// }

export type CoverType =
  | 'premium-plus'
  | 'premium'
  | 'standard-pro'
  | 'standard';
export type ProductType = 'car-covers' | 'suv-covers' | 'truck-covers';

export type CoverOption = { coverType: CoverType };
export type ProductOption = { productType: ProductType };

export const coverOptions: CoverOption[] = [
  { coverType: 'premium-plus' },
  { coverType: 'premium' },
  { coverType: 'standard-pro' },
  { coverType: 'standard' },
];

export const productOptions: ProductOption[] = [
  { productType: 'car-covers' },
  { productType: 'suv-covers' },
  { productType: 'truck-covers' },
];

export function combineOptions(
  coverOptions: CoverOption[],
  productOptions: ProductOption[]
): { coverType: CoverType; productType: ProductType }[] {
  const combinedOptions: { coverType: CoverType; productType: ProductType }[] =
    [];

  coverOptions.forEach((coverOption) => {
    productOptions.forEach((productOption) => {
      combinedOptions.push({ ...productOption, ...coverOption });
    });
  });

  return combinedOptions;
}

// Example SKU: CL-SC-10-F-11-BK-1TO-1136
// Example SKU (old): CL-SC-10-FB-100-GR-1TO-3044
// Example Full Set SKU 5/29/24: CL-SC-10-F-10-B-32-BE-1TO-20017
export function detectFOrFB(sku: string) {
  const parts = sku.split('-');
  if (parts[1] === 'SC') {
    if (parts[5] === 'B') {
      return 'Full';
    } else if (parts[3] === 'F') {
      return 'Front';
    }
  }
  return 'Unknown';
}

/*
  CN do not have mirrors, 
  CS and CP include mirrors. 
  FOMU12, CHCM11, and CHCV11 do not have mirror pockets, 
  while all other custom sizes come with mirror pockets.
*/
export function detectMirrors(sku: string) {
  const skuSubstringsNoMirror = ['cn', 'fomu12', 'chcm11', 'chcv11'];
  const lowerStr = sku.toLowerCase();

  if (
    skuSubstringsNoMirror.some((substring) => lowerStr.includes(substring))
  ) {
    return false;
  }

  return lowerStr.includes('cs') || lowerStr.includes('cp');
}

export function isFullSet(displaySet: string): string {
  return displaySet?.toLowerCase() === 'front seats' ? 'front' : 'full';
}
export const determineTypeString = (type: string) => {
  const typeOptions = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  return type === 'car-covers'
    ? typeOptions[0]
    : type === 'suv-covers'
      ? typeOptions[1]
      : type === 'truck-covers'
        ? typeOptions[2]
        : type;
};

export const determineCoverType = (type: string) => {
  let coverType;
  switch (type) {
    case 'premium-plus':
      coverType = 'Premium Plus';
      break;
    case 'premium':
      coverType = 'Premium';
      break;
    case 'standard':
      coverType = 'Standard';
      break;
    case 'standard-pro':
      coverType = 'Standard Pro';
      break;
    default:
      coverType = 'Premium Plus';
      break;
  }
  return coverType;
};

export const determineShortReviewCount = (total_reviews: number) => {
  switch (true) {
    case total_reviews >= 100 && total_reviews <= 199:
      return '100+';
    case total_reviews >= 200 && total_reviews <= 299:
      return '200+';
    case total_reviews >= 300 && total_reviews <= 399:
      return '300+';
    case total_reviews >= 400 && total_reviews <= 499:
      return '400+';
    case total_reviews >= 500 && total_reviews <= 599:
      return '500+';
    case total_reviews >= 600 && total_reviews <= 699:
      return '600+';
    case total_reviews >= 700 && total_reviews <= 799:
      return '700+';
    case total_reviews >= 800 && total_reviews <= 899:
      return '800+';
    case total_reviews >= 900 && total_reviews <= 999:
      return '900+';
    default:
      return total_reviews;
  }
};

export const formatToE164 = (num: string) => {
  if (!num) {
    return '';
  }

  const formattedPhone = parsePhoneNumber(num, 'US')?.format('E.164');
  // console.log('[FORMAT TO E.164 FUNCTION: ]', { formattedPhone });
  return formattedPhone;
};
