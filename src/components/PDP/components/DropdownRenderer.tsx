'use client';
import useUrlState from '@/lib/hooks/useUrlState';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';
import QueryParamSubdropdowns from './QueryParamSubdropdowns';
import SubDropdowns from './SubDropdowns';

export default function DropdownRenderer({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  const { currentUrl } = useUrlState();

  if (
    currentUrl.includes('submodel') ||
    currentUrl.includes('second_submodel')
  ) {
    return <QueryParamSubdropdowns modelData={modelData} />;
  }

  return <SubDropdowns modelData={modelData} />;
}
