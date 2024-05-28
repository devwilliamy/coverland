'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { YearSearch } from './YearSearch';
import { TypeSearch } from './TypeSearch';
import { MakeSearch } from './MakeSearch';
import { ModelSearch } from './ModelSearch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
// import { SubmodelDropdown } from './SubmodelDropdown';
import { slugify } from '@/lib/utils';
import { BASE_URL } from '@/lib/constants';

export type TQuery = {
  year: string;
  parent_generation: string;
  type: string;
  make: string;
  model: string;
  submodel1: string;
  submodel2: string;
  typeId: string;
  yearId: string;
  makeId: string;
  modelId: string;
  // submodel3: string;
};

export function HeroDropdown() {
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
    // submodel3: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { year, type, make, model, submodel1, submodel2, parent_generation } =
    query;

  const queryObj = {
    query,
    setQuery,
  };
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString().toLowerCase();
  }, []);

  const handleSubmitDropdown = async () => {
    if (!year || !type || !make || !model) return;
    setLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroDropdownYear', year);
    }
    const yearInUrl = parent_generation;

    let url = `/${slugify(type)}/premium-plus/${slugify(make)}/${slugify(model)}/${yearInUrl}`;

    if (submodel1) {
      url += `?${createQueryString('submodel', submodel1)}`;
    }
    if (submodel2) {
      url += `&${createQueryString('submodel2', submodel2)}`;
    }

    if (url === BASE_URL) {
      setLoading(false);
      return;
    }

    router.push(url);
  };

  return (
    <div
      className={`relative z-[400]  grid w-full grid-cols-1 items-center justify-center gap-4 px-4 font-[500] lg:flex `}
    >
      <TypeSearch queryObj={queryObj} />
      <YearSearch queryObj={queryObj} />
      <MakeSearch queryObj={queryObj} />
      <ModelSearch queryObj={queryObj} />
      <button
        className={`flex h-full max-h-[44px] min-h-[44px] w-full  items-center justify-center rounded-lg bg-[#BE1B1B]  text-lg text-white disabled:bg-[#BE1B1B] lg:h-[58px] lg:min-h-[58px] lg:max-w-[58px] lg:border-0`}
        onClick={handleSubmitDropdown}
        disabled={!year || !type || !make || !model}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          'Go'
        )}
      </button>
    </div>
  );
}
