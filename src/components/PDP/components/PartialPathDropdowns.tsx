'use client';
import { Button } from '@/components/ui/button';
import { YearSearch } from './YearSearch';
import { MakeSearch } from './MakeSearch';
import { ModelSearch } from './ModelSearch';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import parentGenerationJson from '@/data/parent_generation_data.json';
import { compareRawStrings, slugify } from '@/lib/utils';
import { track } from '@vercel/analytics';
import { SubmodelSearch } from './SubmodelSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
  secondSubmodel: string;
};

export function PartialPathDropdowns() {
  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: '',
    make: '',
    model: '',
    submodel: '',
    secondSubmodel: '',
  });
  const [loading, setLoading] = useState(false);
  console.log('loading', loading);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const typeUrl =
    pathname?.split('/')[1] === 'car-covers'
      ? 'Car Covers'
      : pathname?.split('/')[1] === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';
  const makeUrl = pathname?.split('/')[2];
  const modelUrl = pathname?.split('/')[3];

  const { year, type, make, model, submodel, secondSubmodel } = query;
  const availableData = parentGenerationJson.filter(
    (sku) =>
      sku.type === typeUrl &&
      (makeUrl ? compareRawStrings(sku.make, makeUrl) : true) &&
      (modelUrl ? compareRawStrings(sku.model, modelUrl) : true)
  );

  function extractUniqueYears(data: typeof parentGenerationJson) {
    const allYears = data
      .flatMap((item) =>
        item.year_options ? item.year_options.split(',') : []
      )
      .map((year) => year.trim());
    return [...new Set(allYears)];
  }

  const yearOpts = extractUniqueYears(availableData).sort().reverse();

  const availableModels = availableData.filter((sku) =>
    compareRawStrings(sku.make, makeUrl ?? '')
  );

  const finalAvailableModels = availableModels.filter(
    (sku) =>
      (year ? sku.year_options.includes(year) : true) &&
      (make ? compareRawStrings(sku.make, make) : true) &&
      (model ? compareRawStrings(sku.model, model) : true) &&
      (submodel ? compareRawStrings(sku.submodel1, submodel) : true) &&
      (secondSubmodel ? compareRawStrings(sku.submodel2, secondSubmodel) : true)
  );

  const makeData = [
    ...new Set(
      availableData?.map((d) => d.make).filter((val): val is string => !!val)
    ),
  ];

  const subModelData = [
    ...new Set(
      finalAvailableModels
        ?.map((d) => d.submodel1)
        .filter((val): val is string => !!val)
    ),
  ];
  const modelData = [
    ...new Set(
      finalAvailableModels
        ?.map((d) => d.model)
        .filter((val): val is string => !!val)
    ),
  ];

  const secondSubmodelData = [
    ...new Set(
      finalAvailableModels
        ?.map((d) =>
          compareRawStrings(submodel, d.submodel1) ? d.submodel2 : null
        )
        .filter((val): val is string => !!val)
    ),
  ];

  function parseUrl(url: string | null) {
    if (!url) return {};
    const pathSegments = url?.split('/').filter(Boolean);

    const isTypeUrl = /(car-covers|truck-covers|suv-covers)/.test(
      pathSegments?.[0] || ''
    );
    const isMakeUrl = pathSegments.length > 1;
    const isModelUrl = pathSegments.length > 2;
    const isYearUrl =
      pathSegments.length > 3 && /\d{4}-\d{4}/.test(pathSegments[3]);
    const isSubmodelUrl = searchParams?.has('submodel');
    const isSecondSubmodelUrl = searchParams?.has('second_submodel');

    return {
      isTypeUrl,
      isMakeUrl,
      isModelUrl,
      isYearUrl,
      isSubmodelUrl,
      isSecondSubmodelUrl,
    };
  }

  const {
    isTypeUrl,
    isMakeUrl,
    isYearUrl,
    isModelUrl,
    isSubmodelUrl,
    isSecondSubmodelUrl,
  } = parseUrl(pathname);

  const isFullySelected =
    (!!year || !!isYearUrl) &&
    (!!type || !!isTypeUrl) &&
    (!!make || !!isMakeUrl) &&
    (!!model || !!isModelUrl) &&
    (!!subModelData.length ? !!isSubmodelUrl || !!submodel : true) &&
    (!!secondSubmodelData.length
      ? !!isSecondSubmodelUrl || !!secondSubmodel
      : true);

  const yearInUrl = finalAvailableModels?.[0]?.parent_generation;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const handleSubmitDropdown = () => {
    track('hero_dropdown_submit', {
      year,
      model,
    });
    setLoading(true);
    let url = `/${slugify(type || typeUrl)}/${slugify(make || makeUrl || '')}/${slugify(model || modelUrl || '')}/${yearInUrl}`;
    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    if (secondSubmodel) {
      url += `&${createQueryString('second_submodel', secondSubmodel)}`;
    }

    // refreshRoute('/');
    router.push(`${url}`);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };
  const showSubmodel =
    !isSubmodelUrl && (!!year || isYearUrl) && subModelData.length > 0;

  const showSecondSubmodel =
    !isSecondSubmodelUrl && !!submodel && secondSubmodelData.length > 0;

  if (isFullySelected) {
    setQuery({
      year: '',
      type: '',
      make: '',
      model: '',
      submodel: '',
      secondSubmodel: '',
    });
    handleSubmitDropdown();
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 flex flex-col gap-3 *:w-full">
          {!isYearUrl && <YearSearch setQuery={setQuery} yearOpts={yearOpts} />}
          {!isMakeUrl && (
            <MakeSearch setQuery={setQuery} makeOpts={makeData as string[]} />
          )}
          {!isModelUrl && (
            <ModelSearch
              setQuery={setQuery}
              modelOpts={modelData as string[]}
            />
          )}
          {showSubmodel && (
            <SubmodelSearch setQuery={setQuery} submodelOpts={subModelData} />
          )}
          {showSecondSubmodel && (
            <SubmodelSearch2nd
              setQuery={setQuery}
              secondSubmodelOpts={secondSubmodelData}
            />
          )}
        </div>
        {isFullySelected && (
          <Button
            className="h-[60px] w-full text-lg"
            onClick={() => {
              handleSubmitDropdown();
            }}
          >
            Set Selection
          </Button>
        )}
      </div>
    </>
  );
}
