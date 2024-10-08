import { useContext } from 'react';
import { IProductData } from '@/utils';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { Button } from '../ui/button';
export default function YearGenerationSelector() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const selectedBodyTrim = useStore(store, (s) => s.selectedBodyTrim); // Added to get selected body trim
  const setSelectedBodyTrim = useStore(store, (s) => s.setSelectedBodyTrim);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedYearGeneration = useStore(
    store,
    (s) => s.setSelectedYearGeneration
  );
  const uniqueYearGenerationMap = new Map<string, IProductData>();

  modelData.forEach((model) => {
    if (!uniqueYearGenerationMap.has(model?.year_generation || '')) {
      uniqueYearGenerationMap.set(model?.year_generation || '', model);
    }
  });

  const uniqueYearGenerations: IProductData[] = Array.from(
    uniqueYearGenerationMap.values()
  ).sort((a, b) => {
    const startYearA = parseInt(a.year_generation.split('-')[0], 10);
    const startYearB = parseInt(b.year_generation.split('-')[0], 10);
    return startYearB - startYearA; // Sorting in descending order (latest first)
  });

  // Determine if a year generation should be disabled based on selectedBodyTrim
  const isYearGenerationDisabled = (yearGeneration: string) => {
    return !modelData.some(
      (model) =>
        model.year_generation === yearGeneration &&
        model.submodel1 === selectedBodyTrim
    );
  };
  console.log(
    'SelectedProduct Year Generation:',
    selectedProduct?.year_generation
  );

  return (
    <section
      id="select-year-generation"
      className="mt-[24px] flex h-full w-full flex-col"
    >
      <h3 className="mb-[10px] flex max-h-[13px]">
        <p className="font-bold leading-[14px] text-black">
          Year{' '}
          <span className="ml-1 font-normal text-[#1A1A1A]">
            {selectedProduct?.year_generation ?? ''}
          </span>
        </p>
      </h3>
      <div className="grid w-full min-w-[288px] grid-cols-3 gap-[11px] py-[1px]">
        {uniqueYearGenerations &&
          uniqueYearGenerations.map((modelData, index) => (
            <button
              key={`year-generation-${index}`}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded border border-black bg-white px-4 py-2 text-[#1A1A1A] transition-all duration-300 hover:scale-105 hover:bg-black hover:font-bold hover:text-white focus:outline-none focus:ring-black ${
                modelData?.year_generation === selectedProduct?.year_generation
                  ? ' border-2 border-[#1A1A1A] font-bold'
                  : 'border-[#DBDBDB]'
              } flex-col place-content-center rounded border px-[14.5px] py-2 
              ${isYearGenerationDisabled(modelData.year_generation) ? ' cross font-normal	' : ''}`}
              onClick={() => {
                // if (!isYearGenerationDisabled(modelData.year_generation)) {
                console.log('ModelData:', modelData);
                setSelectedProduct(modelData);
                setSelectedYearGeneration(modelData.year_generation as string);
                setSelectedBodyTrim(modelData.submodel1);
                // }
              }}
              // disabled={isYearGenerationDisabled(modelData.year_generation)} // Disable if not valid
            >
              {modelData?.year_generation}
            </button>
          ))}
      </div>
    </section>
  );
}
