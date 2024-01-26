'use client';

import { useRouter } from 'next/navigation';

import { SubmodelSearch } from './SubmodelSearch';
import { YearSearch } from './YearSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';
import useCarDropdown from '@/lib/hooks/useCarDropdown';
import useUrlState from '@/lib/hooks/useUrlState';
import { ModelSearch } from './ModelSearch';
import { MakeSearch } from './MakeSearch';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SubDropdowns({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  const {
    selectionOptions,
    setDropdown,
    queryUrl,
    isFullySelected,
    state,
    setStateChangeOrigin,
  } = useCarDropdown(modelData);
  const router = useRouter();
  const { currentUrl, params, submodelParam } = useUrlState();

  const { yearOpts, modelOpts, submodelOpts, secondSubmodelOpts, makeOpts } =
    selectionOptions;

  const setSearchParams = () => {
    if (!queryUrl) return;
    router.push(`${queryUrl}`);
    router.refresh();
    setDropdown({ type: 'RESET' });
  };

  console.log('params', params);

  const showYearDropdown = currentUrl?.includes('car-covers')
    ? !params.year
    : !(params?.product?.length === 3);
  const showMakeDropdown = currentUrl?.includes('car-covers')
    ? !params.make
    : !params?.product?.length;
  const showModelDropdown = currentUrl?.includes('car-covers')
    ? !params.model
    : params?.product?.length < 2;
  const showSubmodelDropdown = !!submodelOpts.length && !submodelParam;
  const showSecondSubmodelDropdown =
    !!secondSubmodelOpts.length &&
    !currentUrl?.includes('second_submodel') &&
    !!state.selectedSubmodel;

  console.log('show', showModelDropdown);

  console.log('submodelOpts', secondSubmodelOpts);

  console.log('state', showYearDropdown);

  console.log(
    currentUrl?.includes('second_submodel') !== !!state.selectedSecondSubmodel
  );

  if (
    !(
      showModelDropdown ||
      showSubmodelDropdown ||
      showSecondSubmodelDropdown ||
      showYearDropdown
    )
  ) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 flex flex-col gap-3 *:w-full">
          {showYearDropdown && (
            <YearSearch setDropdown={setDropdown} yearOpts={yearOpts} />
          )}
          {showMakeDropdown && (
            <MakeSearch
              setDropdown={setDropdown}
              makeOpts={makeOpts as string[]}
            />
          )}
          {showModelDropdown && (
            <ModelSearch
              setDropdown={setDropdown}
              modelOpts={modelOpts as string[]}
            />
          )}
          {showSubmodelDropdown && (
            <SubmodelSearch
              setDropdown={setDropdown}
              submodelOpts={submodelOpts}
            />
          )}
          {showSecondSubmodelDropdown && (
            <SubmodelSearch2nd
              setDropdown={setDropdown}
              secondSubmodelOpts={secondSubmodelOpts}
            />
          )}
        </div>
        {isFullySelected && !!queryUrl && (
          <Button
            className="h-[60px] w-full text-lg"
            onClick={() => {
              console.log(queryUrl);
              setSearchParams();
            }}
          >
            Set Selection
          </Button>
        )}
      </div>
    </>
  );
}
