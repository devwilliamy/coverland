import { useContext } from 'react';
import {
  IProductData,
  TPathParams,
  getCompleteSelectionData,
} from '@/utils';
import GrayBlackTribe from '@/images/PDP/gray-black-tribe.svg';
import BlackGrayStripe from '@/images/PDP/black-gray-stripe.svg';
import BlackGray2Tone from '@/images/PDP/black-gray-2-tone.svg';
import GrayBlackStripe from '@/images/PDP/gray-black-stripe.svg';
import BlackRedStripe from '@/images/PDP/black-red-stripe.svg';
import BlackRed2Tone from '@/images/PDP/black-red-2-tone.svg';
import Image, { StaticImageData } from 'next/image';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { track } from '@vercel/analytics';
import { handleViewItemColorChangeGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';

const colorMap: Record<string, StaticImageData> = {
  'Gray Black Tribe': GrayBlackTribe,
  'Black Red 2-Tone': BlackRed2Tone,
  'Black Gray 2-Tone': BlackGray2Tone,
  'Black Gray Stripe': BlackGrayStripe,
  'Gray Black Stripe': GrayBlackStripe,
  'Black Red Stripe': BlackRedStripe,
};

export default function CircleColorSelector() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const params = useParams<TPathParams>();

  const uniqueColors: IProductData[] = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color)) as IProductData[];

  const colors = [];
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  const handleColorChange = (newSelectedProduct: IProductData) => {
    handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  };

  const setSelectedColor = useStore(store, (s) => s.setSelectedColor);

  for (const modelData of uniqueColors) {
    if (modelData.display_color && colorMap[modelData.display_color]) {
      colors.push(colorMap[modelData.display_color]);
    }
  }
  return (
    <section
      id="select-color"
      className="mt-[24px] flex h-full w-full flex-col py-1"
    >
      <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
        Select Color
        {/* {' '}
        <span className="ml-1  text-[#BEBEBE]">
          {selectedProduct?.display_color}
        </span> */}
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
                    track('color_selected', {
                      color: modelData.display_color,
                    });
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
