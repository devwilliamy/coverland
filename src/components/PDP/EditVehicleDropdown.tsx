'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TypeSearch } from '../hero/dropdown/TypeSearch';
import { MakeSearch } from '../hero/dropdown/MakeSearch';
import { ModelSearch } from '../hero/dropdown/ModelSearch';
import { YearSearch } from '../hero/dropdown/YearSearch';
import { SubmodelDropdown } from '../hero/dropdown/SubmodelDropdown';
import { slugify } from '@/lib/utils';
import { BASE_URL } from '@/lib/constants';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export type TProductJsonData = {
  type: string;
  make: string;
  model: string;
  submodel1: string | null;
  submodel2: string | null;
  parent_generation: string;
  year_options: string;
};

export default function EditVehicleDropdown({
  setOpen,
  searchParams,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const pathname = usePathname();
  console.log('path', pathname);
  console.log(BASE_URL);

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
  console.log(jsonData);
  console.log(year);
  useEffect(() => {
    const getSearchData = async () => {
      console.log('fetching data');
      if (!make) return;
      const url = new URL(`${BASE_URL}/api/json-data`);
      url.searchParams.append('type', slugify(type));
      url.searchParams.append('make', slugify(make));

      const response = await fetch(url.toString());
      const jsonData = await response.json();
      console.log('jsonData', response);
      setJsonData(jsonData);
    };
    getSearchData();
  }, [make, type]);

  const dropdownData = jsonData.filter(
    (obj) =>
      (!year ? true : obj.year_options.includes(year)) &&
      (!model ? true : obj.model === model) &&
      (!submodel ? true : obj.submodel1 === submodel)
  );

  const closePopover = useCallback(() => {
    setOpen && setOpen(false);
  }, [setOpen]);

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
    const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
    }

    if (url === currentUrl) {
      setLoading(false);
      closePopover();
      return;
    }

    // refreshRoute('/');
    router.push(url);
    closePopover();
  };

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
      <TypeSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} />
      <ModelSearch queryObj={queryObj} dropdownData={dropdownData} />
      <YearSearch queryObj={queryObj} dropdownData={dropdownData} />
      {subModelData.length > 1 && (
        <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
      )}
      <Button
        className="mx-auto h-[40px] max-h-[44px] w-full max-w-[px] rounded-[4px] bg-black text-lg "
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
          'GO'
        )}
      </Button>
    </div>
  );
}
