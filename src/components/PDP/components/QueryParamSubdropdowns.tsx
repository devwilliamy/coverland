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

  const { year, model, submodel, secondSubmodel } = query;
  const availableData = parentGenerationJson.filter((sku) => {
    return (
      sku.type === typeUrl &&
      (makeUrl ? compareRawStrings(sku.make, makeUrl) : true) &&
      (modelUrl ? compareRawStrings(String(sku.model), modelUrl) : true)
    );
  });

  const availableModels = availableData.filter((sku) =>
    compareRawStrings(sku.make, makeUrl ?? '')
  );

  const finalAvailableModels = availableModels.filter((sku) =>
    compareRawStrings(sku.model, modelUrl ?? '')
  );

  const subModelData = [
    ...new Set(
      finalAvailableModels
        ?.map((d) => d.submodel1)
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

  const { isSubmodelUrl, isSecondSubmodelUrl } = parseUrl(pathname);

  const isFullySelected =
    !!submodelParam && (!!secondSubmodelData.length ? !!secondSubmodel : true);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);
    return params.toString().toLowerCase();
  };

  const handleSubmitDropdown = () => {
    track('hero_dropdown_submit', {
      year,
      model,
    });
    let url = `${pathname}`;
    if (submodel && !submodelParam) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    if (secondSubmodel) {
      url += `?${createQueryString('second_submodel', secondSubmodel)}`;
    }
    // refreshRoute('/');
    router.push(`${url}`);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };
  const showSubmodel = !isSubmodelUrl && !!year && subModelData.length > 0;

  const showSecondSubmodel =
    !isSecondSubmodelUrl && !!submodelParam && secondSubmodelData.length > 0;

  if (secondSubmodelData.length === 0 || secondSubmodelParam) {
    return null;
  }

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
