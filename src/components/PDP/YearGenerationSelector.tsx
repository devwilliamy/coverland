import { useContext } from 'react';
import { IProductData } from '@/utils';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
export default function YearGenerationSelector() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
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
            <div
              key={`year-generation-${index}`}
              className={`flex ${modelData?.year_generation === selectedProduct?.year_generation ? 'border-2 border-[#1A1A1A] font-bold' : 'border-[#DBDBDB]'} flex-col place-content-center rounded border px-[14.5px] py-2`}
              onClick={() => {
                setSelectedProduct(modelData);
                setSelectedYearGeneration(modelData.year_generation as string);
              }}
            >
              {modelData?.year_generation}
            </div>
          ))}
      </div>
    </section>
  );
}
