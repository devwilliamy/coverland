'use client';

import { Button } from '@/components/ui/button';
import { TProductData } from '@/lib/db';

import { useState } from 'react';
import useCarSelection from '@/lib/db/hooks/useCarSelection';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { extractUniqueValues } from '../utils';
import { SubmodelSearch } from './SubmodelSearch';
import { YearSearch } from './YearSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';

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

  console.log(pathname);

  const isYearInPath = pathname?.split('/').length === 5;

  console.log(searchParams);

  // console.log(modelData);
  const yearData = [
    ...new Set(
      modelData
        ?.flatMap((d) => d.year_range?.split(','))
        .sort()
        .reverse()
        .filter((y): y is string => !!y)
    ),
  ];

  console.log(yearData);

  const setSearchParams = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (selectedYear) {
      currentParams.append('year', selectedYear.toString().toLowerCase());
    }
    if (selectedSubmodel) {
      currentParams.append('submodel', selectedSubmodel.toLowerCase());
    }

    if (selectedSecondSubmodel) {
      currentParams.append(
        'second_submodel',
        selectedSecondSubmodel.toLowerCase()
      );
    }

    currentParams.append('selected', 'true');

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  console.log(selectedSubmodel);

  console.log(pathname);

  // console.log(modelData.filter((car) => car?.submodel1));

  const hasSubmodel = new Set(modelData.map((car) => car?.submodel1)).size > 1;
  console.log(hasSubmodel);
  const hasSecondSubModel =
    modelData.filter((car) => car?.submodel2).length > 0;

  console.log(secondSubmodels);

  return (
    <>
      {!isYearInPath && (
        <YearSearch
          setYear={setSelectedYear}
          yearData={yearData}
          yearParam={yearParam}
        />
      )}

      {!!submodels.length && (
        <SubmodelSearch
          modelData={modelData}
          setSelectedSubmodel={setSelectedSubmodel}
          submodelParam={submodelParam}
        />
      )}
      {secondSubmodels.length > 1 && (
        <SubmodelSearch2nd
          modelData={modelData}
          setSelectedSubmodel={setSelectedSecondSubmodel}
          submodelParam2nd={submodelParam2nd}
          secondSubmodels={secondSubmodels}
        />
      )}

      {hasSubmodel && (
        <Button className="h-[60px] text-lg" onClick={setSearchParams}>
          Set Selection
        </Button>
      )}
    </>
  );
}
