'use client';

import { Button } from '@/components/ui/button';
import { TProductData } from '@/lib/db';

import { useCallback, useEffect, useState } from 'react';
import useCarSelection from '@/lib/db/hooks/useCarSelection';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { extractUniqueValues } from '../utils';
import { SubmodelSearch } from './SubmodelSearch';
import { YearSearch } from './YearSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';
import { refreshRoute } from '@/app/[productType]/[...product]/actions';

export default function SubDropdowns({
  modelData,
  submodels,
  secondSubmodels,
}: {
  modelData: TProductData[];
  submodels: string[];
  secondSubmodels: string[];
}) {
  const {
    selectedYear,
    setSelectedYear,
    selectedSubmodel,
    setSelectedSubmodel,
    selectedSecondSubmodel,
    setSelectedSecondSubmodel,
  } = useCarSelection();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const yearParam = searchParams?.get('year') ?? '';
  const submodelParam = searchParams?.get('submodel') ?? '';
  const submodelParam2nd = searchParams?.get('second_submodel') ?? '';

  const isYearInPath = pathname?.split('/').length === 5;

  const yearData = [
    ...new Set(
      modelData
        ?.flatMap((d) => d.year_range?.split(','))
        .sort()
        .reverse()
        .filter((y): y is string => !!y)
    ),
  ];

  const shouldTriggerSetParams =
    secondSubmodels.length === 0 && !!selectedSubmodel;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const setSearchParams = () => {
    let url: string = '';

    if (selectedYear) {
      url = createQueryString('year', selectedYear);
    }
    if (selectedSubmodel) {
      url = createQueryString('submodel', selectedSubmodel);
    }

    if (selectedSecondSubmodel) {
      url = createQueryString('second_submodel', selectedSecondSubmodel);
    }
    // refreshRoute('/');
    router.push(`?${url}`);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };

  const hasSubmodel = new Set(modelData.map((car) => car?.submodel1)).size > 1;
  const hasSecondSubModel =
    modelData.filter((car) => car?.submodel2).length > 1;

  if ((submodelParam && submodelParam2nd) || !hasSecondSubModel) return null;

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          SELECT YOUR VEHICLE
        </p>
        <div className="mb-4 *:w-full">
          {!isYearInPath && (
            <YearSearch
              setYear={setSelectedYear}
              yearData={yearData}
              yearParam={yearParam}
            />
          )}

          {!!submodels.length && !submodelParam && (
            <SubmodelSearch
              modelData={modelData}
              submodels={submodels}
              setSelectedSubmodel={setSelectedSubmodel}
              submodelParam={submodelParam}
              shouldTriggerSetParams={shouldTriggerSetParams}
            />
          )}
          {secondSubmodels.length > 1 && !submodelParam2nd && (
            <SubmodelSearch2nd
              modelData={modelData}
              setSelectedSecondSubmodel={setSelectedSecondSubmodel}
              submodelParam2nd={submodelParam2nd}
              secondSubmodels={secondSubmodels}
            />
          )}
        </div>
        {hasSecondSubModel && !submodelParam2nd && (
          <Button className="h-[60px] w-full text-lg" onClick={setSearchParams}>
            Set Selection
          </Button>
        )}
      </div>
    </>
  );
}
