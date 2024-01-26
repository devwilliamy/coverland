'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { TypeSearch } from '../hero/dropdown/TypeSearch';
import { MakeSearch } from '../hero/dropdown/MakeSearch';
import { ModelSearch } from '../hero/dropdown/ModelSearch';
import { YearSearch } from '../hero/dropdown/YearSearch';
import { SubmodelDropdown } from '../hero/dropdown/SubmodelDropdown';
import parentGenerationJson from '@/data/parent_generation_data.json';
import { slugify } from '@/lib/utils';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
};

export default function EditVehicleDropdown({
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const closePopover = useCallback(() => {
    setOpen && setOpen(false);
  }, [setOpen]);

  const availableMakes = parentGenerationJson.filter(
    (sku) => sku.year_options.includes(year) && sku.type === type
  );

  const availableModels = availableMakes.filter((sku) => sku.make === make);

  console.log(availableModels);

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

  console.log('finalAvailableModels', finalAvailableModels);

  const yearInUrl = finalAvailableModels?.[0]?.parent_generation;

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
    console.log(year, make, model, type);
    if (!year || !type || !make || !model) return;
    setLoading(true);
    let url = `/${slugify(type)}/${slugify(make)}/${slugify(model)}/${yearInUrl}`;
    console.log('url', url);
    const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    console.log('currentUrl', currentUrl, yearInUrl);

    if (submodel) {
      url += `?${createQueryString('submodel', submodel)}`;
      console.log('url', url);
    }

    if (url === currentUrl) {
      setLoading(false);
      closePopover();
      return;
    }

    // refreshRoute('/');
    router.push(url);
    router.refresh();
    closePopover();
  };

  return (
    <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} makeData={makeData} />
      <ModelSearch queryObj={queryObj} modelData={modelData} />
      {subModelData.length > 1 && (
        <SubmodelDropdown queryObj={queryObj} submodelData={subModelData} />
      )}
      <Button
        className="mx-auto h-[40px] max-h-[44px] w-full max-w-[px] rounded-[4px] bg-black text-lg "
        onClick={handleSubmitDropdown}
        disabled={!year || !type || !make || !model}
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
