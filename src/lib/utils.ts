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

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const deslugify = (slug: string) => {
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

type Model = {
  year_generation: number;
  feature?: string[] | null;
};

export function groupProductsBy(
  attribute: keyof TProductData,
  array: TProductData[]
) {
  const groups = array.reduce((accumulator, currentValue) => {
    const groupKey = String(currentValue[attribute]);
    if (!accumulator[groupKey]) {
      accumulator[groupKey] = [];
    }
    accumulator[groupKey].push(currentValue);
    return accumulator;
  }, {} as Record<string, TProductData[]>);

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
