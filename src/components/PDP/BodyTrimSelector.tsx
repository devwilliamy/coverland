import { useContext } from 'react';
import { IProductData, TPathParams, getCompleteSelectionData } from '@/utils';
import Image from 'next/image';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { handleViewItemColorChangeGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';
export default function BodyTrimSelector() {
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

  const uniqueBodyTrimsMap = new Map<string, IProductData>();

  modelData.forEach((model) => {
    if (!uniqueBodyTrimsMap.has(model?.submodel1 || '')) {
      uniqueBodyTrimsMap.set(model?.submodel1 || '', model);
    }
  });

  const uniqueBodyTrims: IProductData[] = Array.from(
    uniqueBodyTrimsMap.values()
  );
  const handleColorChange = (newSelectedProduct: IProductData) => {
    handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  };

  return (
    <section
      id="select-body-trim"
      className="mt-[24px] flex h-full w-full flex-col"
    >
      <h3 className="mb-[10px] flex max-h-[13px]">
        <p className="font-bold capitalize leading-[14px] text-black">
          Body/Trim{' '}
          <span className="ml-1 font-normal text-[#1A1A1A]">
            {selectedProduct?.submodel1 ?? ''}{' '}
          </span>
        </p>
      </h3>
      <div className="grid w-full grid-cols-2 gap-[11px] py-[1px]">
        {uniqueBodyTrims &&
          uniqueBodyTrims.map((modelData, index) => (
            <div
              key={`body-trim-${index}`}
              className={`flex ${modelData?.submodel1 === selectedProduct?.submodel1 ? 'border-2 border-[#1A1A1A] font-bold' : 'border-[#DBDBDB]'} flex-col place-content-center rounded border px-[14.5px] py-2 capitalize`}
              onClick={() => {
                setSelectedProduct(modelData);
                setSelectedColor(modelData.submodel1 as string);
                handleColorChange(modelData);
              }}
            >
              {modelData?.submodel1}
            </div>
          ))}
      </div>
    </section>
  );
}
