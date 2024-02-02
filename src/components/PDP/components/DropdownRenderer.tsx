'use client';
import useUrlState from '@/lib/hooks/useUrlState';
import { SubDropdowns } from './SubDropdowns';
import { QueryParamSubdropdowns } from './QueryParamSubdropdowns';
import { PartialPathDropdowns } from './PartialPathDropdowns';
import {
  CarSelectionContext,
  TCarCoverData,
} from '@/app/(main)/[productType]/components/CarPDP';
import { TInitialProductDataDB } from '@/lib/db';
import { ModelPDPDropdown } from './ModelPDPDropdown';
import { useContext } from 'react';
import { useStore } from 'zustand';

export default function DropdownRenderer() {
  const { currentUrl } = useUrlState();
  const modelUrl = currentUrl?.split('/')[3];
  const yearUrl = currentUrl?.split('/')[4];

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelDataState =
    useStore(store, (s) => s?.modelData) ?? ([] as TCarCoverData[]);

  console.log('modelDataState', modelDataState);

  if (!modelUrl && !yearUrl) {
    return <PartialPathDropdowns />;
  }

  if (
    currentUrl.includes('submodel') ||
    currentUrl.includes('second_submodel')
  ) {
    return <QueryParamSubdropdowns />;
  }

  if (!yearUrl) {
    return <ModelPDPDropdown />;
  }

  return <SubDropdowns />;
}
