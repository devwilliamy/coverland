import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import ReviewPercentCircle from './ReviewPercentCircle';
import ReviewTotalCount from './ReviewTotalCount';
import useStoreContext from '@/hooks/useStoreContext';
import { generateNumberFromCarBuild } from '@/lib/utils';
import { useStore } from 'zustand';
import { useMediaQuery } from '@mantine/hooks';

export default function ReviewSummaryHeader() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const generatedReviewScore =
    selectedProduct &&
    generateNumberFromCarBuild(
      selectedProduct.type ?? '',
      selectedProduct.display_id ?? '',
      selectedProduct.make ?? '',
      selectedProduct.model ?? '',
      selectedProduct.year_generation ?? ''
    ).toFixed(1);
  
  return (
    <header className="flex w-full flex-col items-center pb-[30px] lg:max-w-[1080px]  lg:flex-row lg:pb-[80px] lg:pt-[80px]">
      <div className="flex w-full min-w-[188px] items-center lg:justify-center ">
        <p className="pl-0.5 text-[40px] font-black lg:pl-0 lg:text-[60px]">
          {generatedReviewScore || '4.9'}
        </p>
        <div className="flex flex-col items-stretch  gap-1 pl-4 text-yellow-300 ">
          <div className="pt-[30px] lg:pt-[35px]">
            <ReviewRatingStar
              // rating={Number(average_score?.toFixed(1))}
              rating={4.5}
              size={isMobile ? 26 : 54}
            />
          </div>
          <p className="pl-4 text-sm font-normal text-[#767676] lg:text-lg">
            <ReviewTotalCount />
          </p>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 lg:justify-center lg:gap-5">
        <ReviewPercentCircle percent="95" />
        <div className="flex flex-col">
          <p className="whitespace-nowrap text-[18px] font-bold lg:text-[28px]">
            95% would recommend
          </p>
        </div>
      </div>
    </header>
  );
}
