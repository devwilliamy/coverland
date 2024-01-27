'use client';
import useUrlState from '@/lib/hooks/useUrlState';
import { SubDropdowns } from './SubDropdowns';
import { QueryParamSubdropdowns } from './QueryParamSubdropdowns';
import { PartialPathDropdowns } from './PartialPathDropdowns';

export default function DropdownRenderer({}) {
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

  return <SubDropdowns />;
}
