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
import { MakeSearch } from './MakeSearch';

export default function SubDropdowns() {
  const {
    selectionOptions,
    setDropdown,
    queryUrl,
    isFullySelected,
    state: selectionState,
  } = useDropdownSelector();
  const router = useRouter();
  const { currentUrl, params } = useUrlState();

  const { yearOpts, modelOpts, submodelOpts, secondSubmodelOpts, makeOpts } =
    selectionOptions;

  const setSearchParams = () => {
    if (!queryUrl) return;
    router.push(`${queryUrl}`);
  };

  const showYearDropdown = !params.year && !isFullySelected;
  const showMakeDropdown = !params.make && !isFullySelected;
  const showSubmodelDropdown =
    !!submodelOpts.length &&
    !currentUrl?.includes('submodel') &&
    selectionState.selectedModel;
  const showSecondSubmodelDropdown =
    !!secondSubmodelOpts.length &&
    currentUrl?.includes('second_submodel') &&
    selectionState.selectedModel;
  const showModelDropdown =
    !!modelOpts.length && !params.model && !isFullySelected;

  if (isFullySelected) {
    setSearchParams();
  }

  if (
    !(
      showModelDropdown ||
      showSubmodelDropdown ||
      showSecondSubmodelDropdown ||
      showYearDropdown
    )
  ) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 flex flex-col gap-3 *:w-full">
          {showYearDropdown && (
            <YearSearch setDropdown={setDropdown} yearOpts={yearOpts} />
          )}
          {showMakeDropdown && (
            <MakeSearch setDropdown={setDropdown} makeOpts={makeOpts} />
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
                url: queryUrl,
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
