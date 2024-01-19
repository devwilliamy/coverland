'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { TypeSearch } from '../hero/dropdown/TypeSearch';
import { MakeSearch } from '../hero/dropdown/MakeSearch';
import { ModelSearch } from '../hero/dropdown/ModelSearch';
import { YearSearch } from '../hero/dropdown/YearSearch';
import { SubmodelDropdown } from '../hero/dropdown/SubmodelDropdown';
import skuDisplayData from '@/data/skuDisplayData.json';
import { slugify } from '@/lib/utils';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export default function EditVehicleDropdown() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: '',
    make: '',
    model: '',
    submodel: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { year, type, make, model, submodel } = query;
  // const isReadyForSubmit = year && type && make && model;
  const types = ['Car Covers', 'SUV Covers', 'Truck Covers'];

  const typeIndex = String(types.indexOf(type) + 1);

  const availableMakes = skuDisplayData.filter(
    (sku) => sku.year_options.includes(year) && String(sku.fk)[0] === typeIndex
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

  const yearInUrl = finalAvailableModels?.[0]?.year_generation;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (params.has('second_submodel')) {
        params.delete('second_submodel');
      }
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const handleSubmitDropdown = async () => {
    setLoading(true);
    let url = `/${slugify(type)}/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    // refreshRoute('/');
    router.push(url);
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch justify-center gap-2 font-medium *:flex-1">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} makeData={makeData} />
      <ModelSearch queryObj={queryObj} modelData={modelData} />
      {subModelData.length > 1 && (
        <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
      )}
      <Button
        className="mx-auto h-[40px] max-w-[px] text-lg"
        onClick={handleSubmitDropdown}
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
