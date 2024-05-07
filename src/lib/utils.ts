import { TInitialProductDataDB } from './db/index';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { modelStrings } from './constants';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';

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

  // console.log(slug);
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
  if (slug.toLowerCase() === '3-series') return '3-Series';
  if (slug.toLowerCase() === 'f-150') return 'F-150';

  if (slug.toLowerCase() === 'suv') return 'SUV';
  if (slug.toLowerCase() === 'suv covers') return 'SUV Covers';
  if (slug.toLowerCase() === 'suv-covers') return 'SUV Covers';

  // Check if the format is like a date range (e.g., 2006-2016)
  const dateRangePattern = /^\d{4}-\d{4}$/;
  if (dateRangePattern.test(slug)) return slug;

  // Further F-150 types
  const hyphenArray = slug.split('-');
  const f150String = [hyphenArray[0], hyphenArray[1]].join('-');
  const isF150Type = f150String.toLowerCase() === 'f-150';
  if (isF150Type) {
    console.log('[IS F-150 TYPE]', { hyphenArray });
  }

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
  selectedProduct: TCarCoverData | TInitialProductDataDB | null | undefined
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
// Example SKU: CL-SC-10-FB-100-GR-1TO-3044
export function detectFOrFB(sku: string) {
  const parts = sku.split('-');
  if (parts[1] === 'SC') {
    if (parts[3] === 'F') {
      return 'Front';
    } else if (parts[3] === 'FB') {
      return 'Full';
    }
  }
  return 'Unknown';
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
