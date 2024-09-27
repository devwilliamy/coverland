import { useContext } from 'react';
import { IProductData, TPathParams, getCompleteSelectionData } from '@/utils';
import Image from 'next/image';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { handleViewItemColorChangeGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';
export default function YearGenerationSelector() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedColor = useStore(store, (s) => s.setSelectedColor);
  const params = useParams<TPathParams>();
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const uniqueYearGenerationMap = new Map<string, IProductData>();
  
  modelData.forEach((model) => {
    if (!uniqueYearGenerationMap.has(model?.year_generation || '')) {
      uniqueYearGenerationMap.set(model?.year_generation || '', model);
    }
  });

  const uniqueYearGenerations: IProductData[] = Array.from(
    uniqueYearGenerationMap.values()
  );
  const handleColorChange = (newSelectedProduct: IProductData) => {
    handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  };

  return (
    <section
      id="select-color"
      className=" mt-[24px] flex h-full w-full flex-col"
    >
      <h3 className="mb-[10px] flex max-h-[13px]">
        <p className="font-bold leading-[14px] text-black ">
          Year{' '}
          <span className="ml-1 font-normal text-[#1A1A1A]">
            {selectedProduct?.year_generation ?? ''}{' '}
          </span>
        </p>
      </h3>
      <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
        {uniqueYearGenerations &&
          uniqueYearGenerations.map((modelData, index) => (
            <div
              key={`year-generation-${index}`}
              className={`flex ${modelData?.year_generation === selectedProduct?.year_generation ? 'border-[#1A1A1A] border-2 font-bold' : 'border-[#DBDBDB]'} flex-col place-content-center rounded border px-[14.5px] py-2`}
              onClick={() => {
                setSelectedProduct(modelData);
                setSelectedColor(modelData.year_generation as string);
                handleColorChange(modelData);
              }}
            >
              {modelData?.year_generation}
            </div>
          ))}
      </div>
    </section>
  );
}
