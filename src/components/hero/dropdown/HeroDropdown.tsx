'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { YearSearch } from './YearSearch';
import { TypeSearch } from './TypeSearch';
import { MakeSearch } from './MakeSearch';
import { ModelSearch } from './ModelSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmodelDropdown } from './SubmodelDropdown';
import parentGenerationJson from '@/data/products_data.json';
import { slugify } from '@/lib/utils';
import { track } from '@vercel/analytics';
import { sendGTMEvent } from '@next/third-parties/google';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export function HeroDropdown() {
  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: '',
    make: '',
    model: '',
    submodel: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { year, type, make, model, submodel } = query;

  const json = parentGenerationJson;

  const isReadyForSubmit = year && type && make && model;

  const availableMakes = json.filter(
    (sku) => String(sku.year_options).includes(year) && sku.type === type
  );

  const availableModels = availableMakes.filter((sku) => sku.make === make);

  const finalAvailableModels = availableModels.filter((sku) =>
    submodel
      ? sku.submodel1 === submodel && sku.model === model
      : sku.model === model
  );

  const queryObj = {
    query,
    setQuery,
  };
  const makeData = [
    ...new Set(
      availableMakes?.map((d) => d.make).filter((val): val is string => !!val)
    ),
  ];

  const subModelData = [
    ...new Set(
      availableModels
        ?.filter((car) => make === car.make && car?.model === model)
        ?.map((d) => d.submodel1)
        .filter((val): val is string => !!val)
    ),
  ];
  const modelData = [
    ...new Set(
      availableModels
        ?.filter((car) => query.make === car.make && !!car?.model)
        ?.map((d) => d.model)
        .filter((val): val is string => !!val)
    ),
  ];

  //If there's no submodel selected, either there's some available but they haven't been
  //selected, or there's none available. If the former, use the parent generation.
  //If the latter, finalAvailableModels will only have one item, so use it's year_generation.

  // const yearInUrl = !submodel
  //   ? finalAvailableModels.filter((sku) => sku.generation_default === sku.fk)[0]
  //       ?.year_generation ?? finalAvailableModels?.[0]?.year_generation
  //   : skuDisplayData.find((sku) => sku.fk === finalAvailableModels?.[0]?.fk)
  //       ?.year_generation ?? finalAvailableModels?.[0]?.year_generation;

  //       console.log()

  const yearInUrl = finalAvailableModels?.[0]?.parent_generation;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const handleSubmitDropdown = async () => {
    track('hero_dropdown_submit', {
      year,
      model,
    });
    sendGTMEvent({
      event: 'Homepage dropdown submit',
      value: `${year} ${model}`,
    });
    setLoading(true);
    let url = `/${slugify(type)}/premium-plus/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    // refreshRoute('/');
    router.push(url);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2 px-4 font-medium *:flex-1 *:py-3 md:flex-row lg:max-h-[58px] lg:px-16 lg:*:py-4">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} makeData={makeData} />
      <ModelSearch queryObj={queryObj} modelData={modelData} />
      {subModelData.length > 0 && (
        <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
      )}
      <Button
        className="flex h-full w-full items-center justify-center border border-red-300 text-lg lg:h-[58px] lg:max-w-[58px] lg:border-0"
        onClick={handleSubmitDropdown}
        disabled={!isReadyForSubmit}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          'Go'
        )}
      </Button>
    </div>
  );
}
