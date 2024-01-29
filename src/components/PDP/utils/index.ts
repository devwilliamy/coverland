import { TProductData } from '@/lib/db';

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
