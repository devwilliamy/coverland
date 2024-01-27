'use client';
import useUrlState from '@/lib/hooks/useUrlState';
import { SubDropdowns } from './SubDropdowns';
import { QueryParamSubdropdowns } from './QueryParamSubdropdowns';
import { PartialPathDropdowns } from './PartialPathDropdowns';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';

export default function DropdownRenderer({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  const { currentUrl } = useUrlState();
  const modelUrl = currentUrl?.split('/')[3];
  const yearUrl = currentUrl?.split('/')[4];

  if (!modelUrl && !yearUrl) {
    return <PartialPathDropdowns />;
  }

  if (
    currentUrl.includes('submodel') ||
    currentUrl.includes('second_submodel')
  ) {
    return <QueryParamSubdropdowns />;
  }

  return <SubDropdowns modelData={modelData} />;
}
