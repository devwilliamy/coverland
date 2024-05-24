'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { deslugify, slugify } from '@/lib/utils';
import { TQuery } from '../hero/dropdown/HeroDropdown';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import { getSeatCoverProductData } from '@/lib/db/seat-covers';
import { TQueryParams } from '@/utils';
import {
  getMakeIdByMakeSlug,
  getModelIdByModelSlug,
  getProductData,
  getTypeId,
  getYearGenById,
  getYearIdByYear,
} from '@/lib/db';
import useDetermineType from '@/hooks/useDetermineType';
import { SubmodelDropdown } from '../hero/dropdown/SubmodelDropdown';

export type TProductJsonData = {
  type: string | { name: string; id: number };
  make: string;
  model: string;
  submodel1: string | null;
  submodel2: string | null;
  parent_generation: string;
  year_options: string;
};

export default function EditVehicleDropdown({
  open,
  setOpen,
  searchParams,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  searchParams: TQueryParams;
}) {
  const pathname = usePathname();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');

  const { coverType } = useStore(store, (s) => s.query);
  const {
    productType,
    make: makeParam,
    model: modelParam,
    year: yearParam,
    isMakePage,
    isModelPage,
    isYearPage,
    isCarCover,
    isSeatCover,
  } = useDetermineType();

  // ---------- Used for fetching both submodels from Search Parameters  -----------
  // const currentSearchParams = useSearchParams();
  // const submodelParam = currentSearchParams.has('submodel')
  //   ? String(currentSearchParams.get('submodel'))
  //   : '';
  // const submodel2Param = currentSearchParams.has('submodel2')
  //   ? String(currentSearchParams.get('submodel2'))
  //   : '';

  const determinePoductType = () => {
    if (isSeatCover) {
      return 'Seat Covers';
    }
    return String(productType);
  };

  const [query, setQuery] = useState<TQuery>({
    type: determinePoductType() ? deslugify(determinePoductType()) : '',
    year: '',
    parent_generation: yearParam ? yearParam : '',
    make: makeParam ? makeParam : '',
    model: modelParam ? modelParam : '',
    submodel1: '',
    submodel2: '',
    typeId: '',
    yearId: '',
    makeId: '',
    modelId: '',
  });

  const { year, type, make, model, submodel1, submodel2, parent_generation } =
    query;

  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState<TProductJsonData[]>([]);
  const router = useRouter();

  const [urlParentGen, setUrlParentGen] = useState(parent_generation);

  useEffect(() => {
    const fetchTypeId = async () => {
      if (query.type) {
        const res = await getTypeId(query.type);
        setQuery((prev) => {
          return { ...prev, typeId: String(res) };
        });
      }

      if (query.make) {
        const res = await getMakeIdByMakeSlug(query.make);
        setQuery((prev) => {
          return { ...prev, makeId: String(res) };
        });
      }

      if (query.model) {
        const res = await getModelIdByModelSlug(query.model);
        setQuery((prev) => {
          return { ...prev, modelId: String(res) };
        });
      }

      if (query.year) {
        const res = await getYearIdByYear(query.year);
        setQuery((prev) => {
          return { ...prev, yearId: String(res) };
        });
      }
    };
    fetchTypeId();
  }, [open]);

  const getYearGen = async () => {
    const fetchedGen = await getYearGenById(
      Number(query.typeId),
      Number(query.makeId),
      Number(query.modelId),
      Number(query.yearId)
    );

    const gen = fetchedGen ?? dropdownData?.[0]?.parent_generation;

    setUrlParentGen(gen);
  };

  useEffect(() => {
    if (query.typeId && query.makeId && query.modelId && query.yearId) {
      getYearGen();
    }
  }, [query]);

  useEffect(() => {
    const getSearchData = async () => {
      try {
        setLoading(true);
        if (!make) return;
        // console.log('EditVehicleDropdown', { type, make, model });
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
          // console.log('[EdhitVehicleDropdown getProductResponse]:', response);
          setJsonData(response);
          return;
        }

        const response = await getProductData({
          type,
          cover: 'Leather',
          make: slugify(make),
        });
        console.log('Response Seat Covers: ', response);

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
    let url = `/${slugify(type)}/${determineType}/${slugify(make)}/${slugify(model)}/${urlParentGen}`;

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
    router.push(url);
    closePopover();
  };

  let isDisabled =
    !year ||
    !type ||
    !make ||
    !model ||
    (subModelData.length > 1 && !submodel1);

  const determineDropdownOrder = () => {
    const isCarCoversOrSeatCovers = isCarCover || isSeatCover;
    // console.log({ isMakePage, isModelPage, isYearPage, isSeatCover });

    switch (isCarCoversOrSeatCovers) {
      case isMakePage:
        return (
          <>
            {/* <TypeSearch queryObj={queryObj} /> */}
            <MakeSearch queryObj={queryObj} />
            <YearSearch queryObj={queryObj} />
            <ModelSearch queryObj={queryObj} />
          </>
        );
      case isModelPage:
        return (
          <>
            {/* <TypeSearch queryObj={queryObj} /> */}
            <MakeSearch queryObj={queryObj} />
            <ModelSearch queryObj={queryObj} />
            <YearSearch queryObj={queryObj} />
          </>
        );
      case isYearPage:
        return (
          <>
            {/* <TypeSearch queryObj={queryObj} /> */}
            <MakeSearch queryObj={queryObj} />
            <ModelSearch queryObj={queryObj} />
            <YearSearch queryObj={queryObj} />
          </>
        );
      default:
        return (
          <>
            {/* <TypeSearch queryObj={queryObj} /> */}
            <YearSearch queryObj={queryObj} />
            <MakeSearch queryObj={queryObj} />
            <ModelSearch queryObj={queryObj} />
          </>
        );
    }
  };

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
      {determineDropdownOrder()}
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
