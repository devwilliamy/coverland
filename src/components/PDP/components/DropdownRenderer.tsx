'use client';
import useUrlState from '@/lib/hooks/useUrlState';
import { SubDropdowns } from './SubDropdowns';
import { QueryParamSubdropdowns } from './QueryParamSubdropdowns';
import { PartialPathDropdowns } from './PartialPathDropdowns';

export default function DropdownRenderer({}) {
  const { currentUrl } = useUrlState();

  const modelUrl = currentUrl?.split('/')[3];
  const yearUrl = currentUrl?.split('/')[4];
  console.log('currentUrl', modelUrl, yearUrl);

  if (!modelUrl && !yearUrl) {
    console.log('partial');
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
