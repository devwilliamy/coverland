'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import parentGenerationJson from '@/data/parent_generation_data.json';
import { slugify } from '@/lib/utils';
import { track } from '@vercel/analytics';
import useUrlState from '@/lib/hooks/useUrlState';
import { Button } from '@/components/ui/button';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export default function DefaultDropdown() {
  const { currentUrl } = useUrlState();
  const currentType = currentUrl.includes('car-covers')
    ? 'Car Covers'
    : currentUrl.includes('suv-covers')
      ? 'SUV Covers'
      : 'Truck Covers';
  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: currentType,
    make: '',
    model: '',
    submodel: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { year, type, make, model, submodel } = query;

  const isReadyForSubmit = year && type && make && model;

  const availableMakes = parentGenerationJson.filter(
    (sku) => sku.year_options.includes(year) && sku.type === type
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
    if (!isReadyForSubmit) return;
    track('pdp_dropdown_submit', {
      year,
      model,
    });
    setLoading(!loading);
    let url = `/${slugify(type)}/premium-plus/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    // refreshRoute('/');
    router.push(url);
  };

  return (
    <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
      <p className="mb-3 text-center text-xl font-bold capitalize text-white">
        {/* SELECT YOUR VEHICLE */}
      </p>
      <div className="mb-4 flex flex-col gap-3 *:w-full">
        <YearSearch queryObj={queryObj} />
        <MakeSearch queryObj={queryObj} makeData={makeData} />
        <ModelSearch queryObj={queryObj} modelData={modelData} />
        {subModelData.length > 0 && (
          <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
        )}
        <Button
          className="h-[60px] w-full text-lg"
          disabled={!isReadyForSubmit}
          onClick={() => {
            handleSubmitDropdown();
            track('PDP_submodels', {
              model: model,
            });
          }}
        >
          Set Selection
        </Button>
      </div>
    </div>
  );
}

function YearSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const years = Array.from({ length: 101 }, (_, i) => 1924 + i).reverse();
  const { setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, year: newValue }));
  };

  return (
    <select
      value={value}
      onChange={(event) => handleChange(event)}
      disabled={!queryObj.query.type}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value="capitalize">Year</option>
      {years.map((year) => (
        <option key={`year-${year}`} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  );
}

function MakeSearch({
  queryObj,
  makeData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
  makeData: string[];
}) {
  const [value, setValue] = useState('');
  const { setQuery, query } = queryObj;
  const sortedData = makeData.sort((a, b) => a.localeCompare(b));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, make: newValue }));
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={!query.type || !query.year}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value="" disabled>
        Make
      </option>
      {sortedData.map((make) => (
        <option key={make} value={make}>
          {make}
        </option>
      ))}
    </select>
  );
}

function ModelSearch({
  queryObj,
  modelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  modelData: string[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, model: newValue }));
  };

  const isDisabled = !query.type || !query.year || !query.make;

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value="">Model</option>
      {modelData?.sort()?.map((model) => (
        <option key={`model-${model}`} value={model}>
          {model}
        </option>
      ))}
    </select>
  );
}

function SubmodelDropdown({
  queryObj,
  submodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  submodelData: string[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;

  useEffect(() => {
    return () => {
      setQuery((p) => ({ ...p, submodel: '' }));
    };
  }, [setQuery]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, submodel: newValue }));
  };

  const isDisabled = !query.make || !query.year || !query.type;

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value="">Submodel</option>
      {submodelData?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
