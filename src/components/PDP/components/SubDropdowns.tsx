'use client';

import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { useRouter } from 'next/navigation';

import { SubmodelSearch } from './SubmodelSearch';
import { YearSearch } from './YearSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';
import useDropdownSelector from '@/lib/hooks/useDropdownSelector';
import useUrlState from '@/lib/hooks/useUrlState';
import { ModelSearch } from './ModelSearch';

export default function SubDropdowns() {
  const { selectionOptions, setDropdown, url, isFullySelected } =
    useDropdownSelector();
  const router = useRouter();
  const { currentUrl, params } = useUrlState();
  console.log(params);

  const { yearOpts, modelOpts, submodelOpts, secondSubmodelOpts } =
    selectionOptions;

  const setSearchParams = () => {
    router.push(`?${url}`);
  };

  const isYearInPath = !!params.year;

  const showSubmodelDropdown =
    !!submodelOpts.length && !currentUrl?.includes('submodel');
  const showSecondSubmodelDropdown =
    !!secondSubmodelOpts.length && currentUrl?.includes('second_submodel');
  const showModelDropdown = !!modelOpts.length && !!params.model;

  if (isFullySelected) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 *:w-full">
          {!isYearInPath && (
            <YearSearch setDropdown={setDropdown} yearOpts={yearOpts} />
          )}
          {showModelDropdown && (
            <ModelSearch setDropdown={setDropdown} modelOpts={modelOpts} />
          )}
          {showSubmodelDropdown && (
            <SubmodelSearch
              setDropdown={setDropdown}
              submodelOpts={submodelOpts}
            />
          )}
          {showSecondSubmodelDropdown && (
            <SubmodelSearch2nd
              setDropdown={setDropdown}
              secondSubmodelOpts={secondSubmodelOpts}
            />
          )}
        </div>
        {isFullySelected && (
          <Button
            className="h-[60px] w-full text-lg"
            onClick={() => {
              setSearchParams();
              track('PDP_submodels', {
                url: url,
              });
            }}
          >
            Set Selection
          </Button>
        )}
      </div>
    </>
  );
}
