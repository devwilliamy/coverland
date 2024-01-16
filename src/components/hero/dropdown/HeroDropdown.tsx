'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { YearSearch } from './YearSearch';
import { TypeSearch } from './TypeSearch';
import { MakeSearch } from './MakeSearch';
import { ModelSearch } from './ModelSearch';
import { useRouter } from 'next/navigation';
import { useProductData } from '@/lib/db/hooks/useProductData';
import { useEffect, useState } from 'react';
import { SubmodelDropdown } from './SubmodelDropdown';
import {
  TModelFitData,
  TProductData,
  fetchDropdownData,
  fetchModelToDisplay,
  generatePDPUrl,
} from '@/lib/db';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export function HeroDropdown() {
  const [displayModel, setDisplayModel] = useState<TModelFitData>();
  const [query, setQuery] = useState<TQuery>({
    year: '',
    type: '',
    make: '',
    model: '',
    submodel: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useProductData({
    where: {
      type: query.type ?? '',
    },
    includes: {
      year_range: query.year ?? '',
    },
  });
  const { year, type, make, model, submodel } = query;
  const isReadyForSubmit = year && type && make && model;

  const carToDisplay = data?.filter(
    (car) =>
      car?.make === make &&
      car?.model === model &&
      car?.year_range?.includes(year)
  )[0];

  useEffect(() => {
    if (!carToDisplay) return;
    const modelFk = carToDisplay.sku.slice(-6);
    console.log('modelFk', modelFk);
    const getData = async () => {
      const data = await fetchModelToDisplay(modelFk);
      console.log('ultimate', data);
      if (data) {
        setDisplayModel(data[0]);
      }
    };
    getData();
  }, [carToDisplay]);

  console.log(data);
  const queryObj = {
    query,
    setQuery,
  };
  const makeData = [
    ...new Set(data?.map((d) => d.make).filter((val): val is string => !!val)),
  ];

  console.log(
    data?.map((d) => d.submodel1).filter((val): val is string => !!val)
  );

  const subModelData = [
    ...new Set(
      data
        ?.filter((car) => make === car.make && car?.model === model)
        ?.map((d) => d.submodel1)
        .filter((val): val is string => !!val)
    ),
  ];
  const modelData = [
    ...new Set(
      data
        ?.filter((car) => query.make === car.make && !!car?.model)
        ?.map((d) => d.model)
        .filter((val): val is string => !!val)
    ),
  ];

  // const handleSubmitDropdown = async () => {
  //   setLoading(true);
  //   const response = await fetchDropdownData(
  //     displayModel?.generation_default ?? String(displayModel?.fk)
  //   );
  //   if (response.data) {
  //     const { product_url_slug, year_generation, submodel1_slug } =
  //       response.data[0];
  //     let url = `${product_url_slug}/${year_generation}`;
  //     if (submodel1_slug) {
  //       url += `?submodel=${submodel1_slug}`;
  //     }
  //     router.push(url);
  //   }
  // };

  const handleSubmitDropdown = async () => {
    setLoading(true);
    const url = await generatePDPUrl({ ...query });
    console.log(url);
    router.push(url);
  };

  console.log(submodel);
  console.log(subModelData);

  return (
    <div className="relative flex w-full flex-col justify-center gap-2 px-4 font-medium *:flex-1 *:py-3 md:flex-row lg:px-16 lg:*:py-4">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch
        queryObj={queryObj}
        makeData={makeData}
        isLoading={isLoading}
      />
      <ModelSearch
        queryObj={queryObj}
        modelData={modelData}
        isLoading={isLoading}
      />
      {subModelData.length > 1 && (
        <SubmodelDropdown
          queryObj={queryObj}
          submodelData={subModelData}
          isLoading={isLoading}
        />
      )}
      <Button
        className="w-full border border-red-300 text-lg lg:h-[58px] lg:max-w-[58px] lg:border-0"
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
