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
import { TQuery } from '../hero/dropdown/HeroDropdown';

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

  const [query, setQuery] = useState<TQuery>({
    year: '',
    parent_generation: '',
    type: '',
    make: '',
    model: '',
    submodel1: '',
    submodel2: '',
  });
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState<TProductJsonData[]>([]);
  const router = useRouter();
  const { year, type, make, model, submodel1 } = query;
  useEffect(() => {
    const getSearchData = async () => {
      if (!make) return;

      const response = await fetch(
        `/api/json-data?type=${slugify(type)}&make=${slugify(make)}`
      );
      const jsonData = await response.json();

      setJsonData(jsonData);
    };
    getSearchData();
  }, [make, type]);

  const dropdownData = jsonData.filter(
    (obj) =>
      (!year ? true : obj.year_options.includes(year)) &&
      (!model ? true : obj.model === model) &&
      (!submodel1 ? true : obj.submodel1 === submodel1)
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
      (subModelData.length > 1 && !submodel1)
    )
      return;
    setLoading(true);
    let url = `/${slugify(type)}/premium-plus/${slugify(make)}/${slugify(model)}/${yearInUrl}`;
    const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

    if (submodel1) {
      url += `?${createQueryString('submodel', submodel1)}`;
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

  const showSubmodelDropdown = subModelData.length > 0 && year;

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} dropdownData={dropdownData} />
      <MakeSearch queryObj={queryObj} />
      <ModelSearch queryObj={queryObj} dropdownData={dropdownData} />
      {showSubmodelDropdown && (
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
