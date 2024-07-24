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
import { slugify } from '@/lib/utils';
import { TQuery } from '../hero/dropdown/HeroDropdown';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import { TQueryParams } from '@/utils';
import { getProductData } from '@/lib/db';

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
  searchParams: TQueryParams;
}) {
  const pathname = usePathname();
  const store = useStoreContext();
  // const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing Provider in the tree');

  const { coverType } = useStore(store, (s) => s.query);

  const [query, setQuery] = useState<TQuery>({
    year: '',
    parent_generation: '',
    type: '',
    make: '',
    model: '',
    submodel1: '',
    submodel2: '',
    typeId: '',
    yearId: '',
    makeId: '',
    modelId: '',
  });
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState<TProductJsonData[]>([]);
  const router = useRouter();
  const { year, type, make, model, submodel1, submodel2, parent_generation } =
    query;
  useEffect(() => {
    const getSearchData = async () => {
      try {
        setLoading(true);
        if (!make) return;
        if (type !== 'Seat Covers') {
          // const response = await fetch(
          //   `/api/json-data?type=${slugify(type)}&make=${slugify(make)}`
          // );
          // const jsonData = await response.json();

          // setJsonData(jsonData);
          const response = await getProductData({
            type,
            cover: 'Premium Plus',
            make: slugify(make),
          });
          setJsonData(response);
          return;
        }

        const response = await getProductData({
          type,
          cover: 'Leather',
          make: slugify(make),
        });
        setJsonData(response);
      } catch (error) {
        console.error('[EditVehicleDropdown.getSearchData]: ', error);
      } finally {
        setLoading(false);
      }
    };
    if (type && make) {
      getSearchData();
    }
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

  const yearInUrl = parent_generation ?? dropdownData?.[0]?.parent_generation;

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

    const determineType = type !== 'Seat Covers' ? 'premium-plus' : 'leather';
    let url = `/${slugify(type)}/${determineType}/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    const submodelParam = searchParams?.submodel
      ? `?${createQueryString('submodel', searchParams.submodel)}`
      : '';
    const submodel2Param = searchParams?.second_submodel
      ? `&${createQueryString('submodel2', searchParams.second_submodel)}`
      : '';
    const queryParams = [submodelParam, submodel2Param]
      .filter((param) => param)
      .join('&');
    const currentUrl = `${pathname}${queryParams ? `${queryParams}` : ''}`;
    if (submodel1) {
      url += `?${createQueryString('submodel', submodel1)}`;
    }
    if (submodel2) {
      url += `&${createQueryString('submodel2', submodel2)}`;
    }

    if (url === currentUrl) {
      setLoading(false);
      closePopover();
      return;
    }
    // refreshRoute('/');
    if (submodel1 || submodel2) {
      window.location.href = url;
    } else {
      router.push(url);
    }

    closePopover();
  };

  let isDisabled =
    !year ||
    !type ||
    !make ||
    !model ||
    (subModelData.length > 1 && !submodel1);

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} />
      <ModelSearch queryObj={queryObj} />
      <Button
        className={`mx-auto h-[40px] max-h-[44px] min-h-[44px] w-full max-w-[px] rounded-[4px] ${isDisabled ? 'bg-[black]' : 'bg-[#BE1B1B]'} text-lg `}
        onClick={handleSubmitDropdown}
        disabled={isDisabled}
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
