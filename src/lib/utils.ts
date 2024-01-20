import { TProductData } from './db/index';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { modelStrings } from './constants';

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

//TODO - slowly migrate from slugify to compareRawStrings to more accurately compare strings
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

export function getNewestModel(array: TProductData[]) {
  return array.sort((a, b) => {
    const getLastYear = (item: TProductData) => {
      if (!item?.year_generation) return 0;
      const years = item?.year_generation.split('-');
      return parseInt(years[years.length - 1]);
    };

    const lastYearA = getLastYear(a);
    const lastYearB = getLastYear(b);

    return lastYearB - lastYearA;
  });
}

export function getUniqueYearGenerations(array: TProductData[]) {
  const unique = new Set();

  array.forEach((item) => {
    if (item.year_generation !== null) {
      unique.add(item.year_generation);
    }
  });

  return Array.from(unique);
}

//TODO - slowly migrate from slugify to compareRawStrings to more accurately compare strings
export function compareRawStrings(str1: string, str2: string) {
  let processedStr1 = str1.toLowerCase();
  let processedStr2 = str2.toLowerCase();

  processedStr1 = processedStr1.replace(/[^a-z0-9]/g, '');
  processedStr2 = processedStr2.replace(/[^a-z0-9]/g, '');

  return processedStr1 === processedStr2;
}

export function groupProductsBy(
  attribute: keyof TProductData,
  array: TProductData[]
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
    {} as Record<string, TProductData[]>
  );

  return Object.keys(groups);
}

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
