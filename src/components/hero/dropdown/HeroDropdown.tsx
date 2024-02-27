'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { YearSearch } from './YearSearch';
import { TypeSearch } from './TypeSearch';
import { MakeSearch } from './MakeSearch';
import { ModelSearch } from './ModelSearch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SubmodelDropdown } from './SubmodelDropdown';
import { slugify } from '@/lib/utils';
import { track } from '@vercel/analytics';
import { sendGTMEvent } from '@next/third-parties/google';
import { TProductJsonData } from '@/components/PDP/EditVehicleDropdown';
import { BASE_URL } from '@/lib/constants';

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
  const [jsonData, setJsonData] = useState<TProductJsonData[]>([]);
  const router = useRouter();
  const { year, type, make, model, submodel } = query;
  useEffect(() => {
    const getSearchData = async () => {
      if (!make) return;

      const response = await fetch(
        `/api/json-data?type=${slugify(type)}&make=${slugify(make)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setJsonData(jsonData.data);
    };
    getSearchData();
  }, [make, type]);

  const dropdownData = jsonData.filter(
    (obj) =>
      (!year ? true : obj.year_options.includes(year)) &&
      (!model ? true : obj.model === model) &&
      (!submodel ? true : obj.submodel1 === submodel)
  );

  const queryObj = {
    query,
    setQuery,
  };

  const subModelData = [
    ...new Set(
      dropdownData
        ?.map((d) => d.submodel1)
        .filter((val): val is string => !!val)
    ),
  ];

  const yearInUrl = dropdownData?.[0]?.parent_generation;

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString().toLowerCase();
  }, []);

  const handleSubmitDropdown = async () => {
    if (
      !year ||
      !type ||
      !make ||
      !model ||
      (subModelData.length > 1 && !submodel)
    )
      return;
    setLoading(true);
    let url = `/${slugify(type)}/premium-plus/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    if (url === BASE_URL) {
      setLoading(false);
      return;
    }

    // refreshRoute('/');
    router.push(url);
  };

  const showSubmodelDropdown = subModelData.length > 0 && year;
  console.log(showSubmodelDropdown, subModelData);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2 px-4 font-medium *:flex-1 *:py-3 md:flex-row lg:max-h-[58px] lg:px-16 lg:*:py-4">
      <TypeSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} />
      <ModelSearch queryObj={queryObj} dropdownData={dropdownData} />
      <YearSearch queryObj={queryObj} dropdownData={dropdownData} />
      {showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
      )}
      <Button
        className="flex h-full w-full items-center justify-center border border-red-300 text-lg lg:h-[58px] lg:max-w-[58px] lg:border-0"
        onClick={handleSubmitDropdown}
        disabled={
          !year ||
          !type ||
          !make ||
          !model ||
          (subModelData.length > 1 && !submodel)
        }
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
