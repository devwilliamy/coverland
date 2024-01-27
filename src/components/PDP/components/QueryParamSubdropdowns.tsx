'use client';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import parentGenerationJson from '@/data/parent_generation_data.json';
import { compareRawStrings } from '@/lib/utils';
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

export function QueryParamSubdropdowns() {
  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: '',
    make: '',
    model: '',
    submodel: '',
    secondSubmodel: '',
  });
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
  const submodelParam = searchParams?.get('submodel');
  const secondSubmodelParam = searchParams?.get('second_submodel');

  console.log(typeUrl);

  const { year, type, make, model, submodel, secondSubmodel } = query;
  const availableData = parentGenerationJson.filter((sku) => {
    if (sku.type === typeUrl) {
      console.log(sku.type, sku.make, sku.model);
      console.log(compareRawStrings(sku.make, makeUrl));
      console.log(compareRawStrings(String(sku.model), modelUrl));
    }
    return (
      sku.type === typeUrl &&
      (makeUrl ? compareRawStrings(sku.make, makeUrl) : true) &&
      (modelUrl ? compareRawStrings(String(sku.model), modelUrl) : true)
    );
  });

  console.log(availableData);
  const availableModels = availableData.filter((sku) =>
    compareRawStrings(sku.make, makeUrl ?? '')
  );

  console.log('availableModels', availableModels);

  const finalAvailableModels = availableModels.filter((sku) =>
    compareRawStrings(sku.model, modelUrl ?? '')
  );

  const filteredSelections = finalAvailableModels.filter(
    (sku) =>
      (year ? sku.year_options.includes(year) : true) &&
      (make ? compareRawStrings(sku.make, make) : true) &&
      (model ? compareRawStrings(sku.model, model) : true) &&
      (submodel ? compareRawStrings(sku.submodel1, submodel) : true) &&
      (secondSubmodel ? compareRawStrings(sku.submodel2, secondSubmodel) : true)
  );

  console.log('finalAvailableModels', filteredSelections);
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
        ?.filter((car) => query.make === car.make && !!car?.model)
        ?.map((d) => d.model)
        .filter((val): val is string => !!val)
    ),
  ];

  const secondSubmodelData = [
    ...new Set(
      finalAvailableModels
        ?.map((d) =>
          compareRawStrings(submodelParam as string, d.submodel1)
            ? d.submodel2
            : null
        )
        .filter((val): val is string => !!val)
    ),
  ];

  console.log(
    'findlog!',
    secondSubmodelData,
    subModelData,
    modelData,
    makeData
  );

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
    !!submodelParam && (!!secondSubmodelData.length ? secondSubmodel : true);

  console.log(!!year || isYearUrl);
  console.log(!!type || isYearUrl);
  console.log(!!make || isMakeUrl);
  console.log(!!model || isModelUrl);
  console.log(!!subModelData.length ? submodel : true);
  console.log(!!secondSubmodelData.length ? secondSubmodelData : true);

  console.log('isFullySelected', isFullySelected);

  const yearInUrl = filteredSelections?.[0]?.parent_generation;

  console.log('yearInUrl', yearInUrl);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    console.log(params);
    params.set(name, value);
    console.log(params);
    console.log(params.toString().toLowerCase());
    return params.toString().toLowerCase();
  };

  const handleSubmitDropdown = () => {
    track('hero_dropdown_submit', {
      year,
      model,
    });
    let url = `${pathname}`;
    console.log(pathname);
    console.log(url);
    if (submodel && !submodelParam) {
      console.log('adding');
      url += `?${createQueryString('submodel', submodel)}`;
    }

    if (secondSubmodel) {
      console.log(url);
      console.log('second_submodel', secondSubmodel);
      url += `?${createQueryString('second_submodel', secondSubmodel)}`;
      console.log(url);
    }
    console.log(url);
    // refreshRoute('/');
    router.push(`${url}`);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };
  const showSubmodel = !isSubmodelUrl && !!year && subModelData.length > 0;

  console.log('showSubmodel', subModelData);

  const showSecondSubmodel =
    !isSecondSubmodelUrl && !!submodelParam && secondSubmodelData.length > 0;

  console.log(submodelParam && secondSubmodelParam);

  if (secondSubmodelData.length === 0 || secondSubmodelParam) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 flex flex-col gap-3 *:w-full">
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
