'use client';

import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import useDropdownSelector, {
  CarSelectorAction,
} from '@/lib/hooks/useDropdownSelector';
import useUrlState from '@/lib/hooks/useUrlState';
import { ChangeEvent, Dispatch, useEffect, useState } from 'react';

export default function CarSubdropdowns() {
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

  console.log('selectionOptions', selectionState);
  console.log(queryUrl);

  const showYearDropdown = !params.year && !isFullySelected;
  const showMakeDropdown = !params.make && !isFullySelected;
  const showSubmodelDropdown =
    !!submodelOpts.length &&
    !currentUrl?.includes('submodel') &&
    selectionState.selectedModel;
  const showSecondSubmodelDropdown =
    !!secondSubmodelOpts.length &&
    !currentUrl?.includes('second_submodel') &&
    !!selectionState.selectedSubmodel;
  const showModelDropdown =
    !!modelOpts.length && !params.model && !isFullySelected;

  console.log(selectionState);

  console.log(isFullySelected);

  console.log(params);

  useEffect(() => {
    const setSearchParams = () => {
      if (!queryUrl) return;
      console.log('queryUrl', queryUrl);
      router.push(`${queryUrl}`);
    };

    if (isFullySelected) {
      setSearchParams();
    }
  }, [isFullySelected, queryUrl, router]);

  // if (isFullySelected && ) {
  //   setSearchParams();
  // }

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
              submodelOpts={submodelOpts as string[]}
            />
          )}
          {showSecondSubmodelDropdown && (
            <SubmodelSearch2nd
              setDropdown={setDropdown}
              secondSubmodelOpts={secondSubmodelOpts as string[]}
            />
          )}
        </div>
        {isFullySelected && (
          <Button
            className="h-[60px] w-full text-lg"
            onClick={() => {
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

function YearSearch({
  setDropdown,
  yearOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  yearOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_YEAR', payload: e.target.value });
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Years</option>
      {yearOpts.map((year) => (
        <option key={`model-${year}`} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

function MakeSearch({
  setDropdown,
  makeOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  makeOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_MAKE', payload: e.target.value });
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Makes</option>
      {makeOpts.map((make) => (
        <option key={`${make}`} value={make}>
          {make}
        </option>
      ))}
    </select>
  );
}

function ModelSearch({
  setDropdown,
  modelOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  modelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_MODEL', payload: e.target.value });
  }

  return (
    <select
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Model</option>
      {modelOpts.map((model) => (
        <option key={`model-${model}`} value={model?.toLowerCase() as string}>
          {model}
        </option>
      ))}
    </select>
  );
}

function SubmodelSearch({
  setDropdown,
  submodelOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  submodelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_SUBMODEL', payload: e.target.value });
  }

  return (
    <select
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Submodel</option>
      {submodelOpts.map((submodel) => (
        <option
          key={`model-${submodel}`}
          value={submodel?.toLowerCase() as string}
        >
          {submodel}
        </option>
      ))}
    </select>
  );
}

function SubmodelSearch2nd({
  setDropdown,
  secondSubmodelOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  secondSubmodelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_SECOND_SUBMODEL', payload: e.target.value });
  }

  return (
    <select
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Second submodel</option>
      {secondSubmodelOpts.map((submodel) => (
        <option
          key={`model-${submodel}`}
          value={submodel?.toLowerCase() as string}
        >
          {submodel}
        </option>
      ))}
    </select>
  );
}
