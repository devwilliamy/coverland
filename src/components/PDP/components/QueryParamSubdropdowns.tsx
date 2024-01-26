'use client';

import { useRouter } from 'next/navigation';

import { SubmodelSearch } from './SubmodelSearch';
import { SubmodelSearch2nd } from './SubmodelSearch2nd';
import useCarDropdown from '@/lib/hooks/useCarDropdown';
import useUrlState from '@/lib/hooks/useUrlState';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';

export default function QueryParamSubdropdowns({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  const { selectionOptions, setDropdown, queryUrl, isFullySelected, state } =
    useCarDropdown(modelData);
  const router = useRouter();
  const { currentUrl, params, submodelParam } = useUrlState();

  const { submodelOpts, secondSubmodelOpts } = selectionOptions;

  const setSearchParams = () => {
    if (!queryUrl) return;
    router.push(`${queryUrl}`);
    setDropdown({ type: 'RESET' });
  };

  const showSubmodelDropdown = !!submodelOpts.length && !submodelParam;
  const showSecondSubmodelDropdown =
    !!secondSubmodelOpts.length &&
    !currentUrl?.includes('second_submodel') &&
    !!state.selectedSubmodel;

  if (
    isFullySelected &&
    (currentUrl?.includes('submodel') !== !!state.selectedSubmodel ||
      currentUrl?.includes('second_submodel') !==
        !!state.selectedSecondSubmodel) &&
    params.year !== state.selectedYear
  ) {
    console.log('set');
    setSearchParams();
  }

  if (!showSubmodelDropdown && !showSecondSubmodelDropdown) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg bg-[#1A1A1A] px-4 py-4">
        <p className="mb-3 text-center text-xl font-bold capitalize text-white">
          {/* SELECT YOUR VEHICLE */}
        </p>
        <div className="mb-4 flex flex-col gap-3 *:w-full">
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
        {/* {isFullySelected && (
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
        )} */}
      </div>
    </>
  );
}
