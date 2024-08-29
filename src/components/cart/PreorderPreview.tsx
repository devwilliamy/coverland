import { useCartContext } from '@/providers/CartProvider';
import LineSeparator from '../ui/line-separator';
import PriceBreakdown from '../checkout/PriceBreakdown';
import { weeksFromCurrentDate } from '@/lib/utils/date';
import { TInitialProductDataDB } from '@/lib/db';
import ClockIcon from '../icons/ClockIcon';

type PreorderPreviewProps = {
  selectedProduct?: TInitialProductDataDB | null | undefined;
};

const PreorderPreview = ({ selectedProduct }: PreorderPreviewProps) => {
  const { getTotalPreorderDiscount } = useCartContext();

  const preorderWeeks = weeksFromCurrentDate(
    selectedProduct?.preorder_date ?? ''
  );
  const totalPreorderDiscount = getTotalPreorderDiscount();

  return (
    <>
      <div className="px-2 py-4">
        <div className="pb-4 text-center">
          <p className="py-4 text-2xl font-extrabold">
            Get It First, Pay Less!
          </p>
          <p className="text-[#767676]">
            Expected Re-stock in {preorderWeeks} weeks
          </p>
          <div className="mb-3 mt-1 flex items-center justify-center space-x-2">
            <ClockIcon />
            <div className="mx-2 text-xl font-bold text-[#2BA45B]">
              {preorderWeeks} Weeks
            </div>
            <div className="w-[75px] rounded bg-[#2BA45B] py-1 text-center text-[#ffffff]">
              ${selectedProduct?.preorder_discount || 0} Off
            </div>
          </div>
        </div>
        <LineSeparator className="mb-2" />
        <PriceBreakdown />
      </div>
    </>
  );
};

export default PreorderPreview;
