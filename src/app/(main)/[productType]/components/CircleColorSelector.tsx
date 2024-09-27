import { useContext } from 'react';
import { IProductData, TPathParams, getCompleteSelectionData } from '@/utils';
import GrayBlackTribe from '@/images/PDP/gray-black-tribe.svg';
import BlackGrayStripe from '@/images/PDP/black-gray-stripe.svg';
import BlackGray2Tone from '@/images/PDP/black-gray-2-tone.svg';
import GrayBlackStripe from '@/images/PDP/gray-black-stripe.svg';
import BlackRedStripe from '@/images/PDP/black-red-stripe.svg';
import BlackRed2Tone from '@/images/PDP/black-red-2-tone.svg';
import Image, { StaticImageData } from 'next/image';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { handleViewItemColorChangeGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';

const colorMap: Record<string, StaticImageData> = {
  'Sky-Gray Black Tribe': GrayBlackTribe,
  'Black Red 2-Tone': BlackRed2Tone,
  'Black Sky-Gray 2-Tone': BlackGray2Tone,
  'Black / Sky-Gray Stripe': BlackGrayStripe,
  'Sky-Gray / Black Stripe': GrayBlackStripe,
  'Black / Red Stripe': BlackRedStripe,
};

const colorText: Record<string, string> = {
  'Black Red 2-Tone': 'Black / Red',
  'Black Sky-Gray 2-Tone': 'Black / Sky-Gray',
  'Black Sky-Gray Stripe': 'Black / Sky-Gray Stripe',
  'Sky-Gray Black Stripe': 'Sky-Gray / Black Stripe',
  'Black Red Stripe': 'Black / Red Stripe',
};

export default function CircleColorSelector() {
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

  const uniqueColorsMap = new Map<string, IProductData>();

  modelData.forEach((model) => {
    if (!uniqueColorsMap.has(model?.display_color || '')) {
      uniqueColorsMap.set(model?.display_color || '', model);
    }
  });

  const uniqueColors: IProductData[] = Array.from(uniqueColorsMap.values());

  const handleColorChange = (newSelectedProduct: IProductData) => {
    handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  };

  return (
    <section
      id="select-color"
      className="mt-[24px] flex h-full w-full flex-col"
    >
      <h3 className="mb-[10px] flex max-h-[13px]">
        <p className="font-bold leading-[14px] text-black ">
          Color{' '}
          <span className="ml-1 font-normal text-[#1A1A1A]">
            {selectedProduct?.display_color ?? ''}{' '}
            {selectedProduct.preorder && isComplete && '(Pre-Order)'}
          </span>{' '}
        </p>
      </h3>
      <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
        {uniqueColors &&
          uniqueColors.map((modelData, index) => {
            if (modelData.display_color === 'Solid Gray')
              return (
                <div
                  key={`car-color-${index}`}
                  className={`flex ${modelData?.display_color === selectedProduct?.display_color && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                  onClick={() => {
                    setSelectedProduct(modelData);
                    setSelectedColor(modelData.display_color as string);
                  }}
                >
                  <div className="h-[34px] w-[34px] rounded-full bg-[#D9D9D9]" />
                </div>
              );

            return (
              <div
                key={`car-color-${index}`}
                className={`flex ${modelData?.display_color === selectedProduct?.display_color && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => {
                  setSelectedProduct(modelData);
                  setSelectedColor(modelData.display_color as string);
                  handleColorChange(modelData);
                }}
              >
                {modelData.display_color && (
                  <Image
                    alt="cover-color"
                    src={colorMap[modelData?.display_color]}
                  />
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
