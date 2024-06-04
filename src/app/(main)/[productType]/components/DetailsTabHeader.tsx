'use client';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import F150Banner from '@/images/PDP/PDP-Redesign-v3/f-150 banner.webp';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useStore } from 'zustand';

export default function DetailsTabHeader() {
  const { make, model, year } = useDetermineType();
  const params = useParams();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  // const year = params?.year;
  const bannerImg: string = selectedProduct.banner
    ? selectedProduct.banner
    : null;

  const hasModelOrYear = Boolean(model || year);

  return (
    <>
      {bannerImg && hasModelOrYear && (
        <div className="flex w-full lg:mt-[60px] ">
          <div className="relative w-full max-w-[840px] items-center justify-center">
            <Image
              alt={`${model}-header-image`}
              width={1000}
              height={1000}
              src={bannerImg}
              className="w-full max-w-full object-contain"
            />
            <div className="absolute right-[11.4%] top-1/2 flex -translate-y-1/2 flex-col text-[24px] font-[700] italic leading-[26px] text-white max-lg:pr-[3.2%] lg:right-[15%] lg:text-[46px] lg:leading-[55.2px]">
              <div className="pr flex flex-col leading-[26.4px] lg:leading-[55.2px]">
                <p>{selectedProduct.make}</p>
                <p>{selectedProduct.model}</p>
              </div>
              {year && (
                <div className="mt-2 flex w-full  min-w-[80px] max-w-[80px] items-center justify-center rounded-full bg-[#FFFFFFCC] py-1 text-center text-[12px] font-[800] not-italic leading-[12px] text-[#343434] lg:max-h-[28px] lg:min-h-[28px] lg:min-w-[128px] lg:max-w-[128px] lg:text-[16px]">
                  <p>{year ? year : selectedProduct.parent_generation}</p>
                </div>
              )}
              {/* Short Length Example */}
              {/* <div className="flex flex-col leading-[26.4px]">
                <p>Ford</p>
                <p>F-150</p>
              </div>
              <div className="mt-2 flex w-full min-w-[80px] max-w-[80px] items-center justify-center rounded-full bg-[#FFFFFFCC] py-1 text-center text-[12px] font-[800] not-italic leading-[12px] text-[#343434] lg:max-h-[28px] lg:min-h-[28px] lg:min-w-[128px] lg:max-w-[128px] lg:text-[16px]">
                2015-2024
              </div> */}
              {/* Long Example */}
              {/* <div className="flex flex-col leading-[26.4px]">
                <p>BMW</p>
                <p>1-Series Hatchback</p>
              </div>
              <div className="mt-2 flex w-full  min-w-[80px] max-w-[80px] items-center justify-center rounded-full bg-[#FFFFFFCC] py-1 text-center text-[12px] font-[800] not-italic leading-[12px] text-[#343434] lg:max-h-[28px] lg:min-h-[28px] lg:min-w-[128px] lg:max-w-[128px] lg:text-[16px]">
                2001-2019
              </div> */}
              {/* {submodel && (
                <div className="flex w-full items-center justify-start whitespace-nowrap rounded-full py-1 text-center font-[400] leading-[12px] text-white max-lg:text-[12px] lg:max-h-[28px] lg:min-h-[28px] lg:text-[16px]">
                  {submodel}
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
