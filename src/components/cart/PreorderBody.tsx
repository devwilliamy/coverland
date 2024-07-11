import { TCartItem } from '@/lib/cart/useCart';
import { useCartContext } from '@/providers/CartProvider';
import Image from 'next/image';
import LineSeparator from '../ui/line-separator';
import { IProductData } from '@/utils';
import PriceBreakdown from '../checkout/PriceBreakdown';
import { weeksFromCurrentDate } from '@/lib/utils/date';

type PreorderBodyProps = {
  selectedProduct?: IProductData | null | undefined;
};

const PreorderBody = ({
  selectedProduct,
}: PreorderBodyProps) => {
  const { cartItems, getTotalPreorderDiscount } = useCartContext();
  const sortedCartItems = selectedProduct
    ? cartItems.sort((a, b) => (b.sku === selectedProduct.sku ? 1 : -1))
    : cartItems;


  const preorderWeeks = weeksFromCurrentDate(selectedProduct?.preorder_date);
  const totalPreorderDiscount = getTotalPreorderDiscount();

  console.log('totalPreorderDiscount', totalPreorderDiscount);

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
            <svg
              width="32"
              height="29"
              viewBox="0 0 32 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9469 28.1695C14.176 28.1695 12.5174 27.8331 10.9708 27.1602C9.42431 26.4872 8.07847 25.5782 6.93333 24.4331C5.78819 23.2879 4.87917 21.9421 4.20625 20.3956C3.53333 18.849 3.19688 17.1904 3.19688 15.4195C3.19688 13.6487 3.53333 11.99 4.20625 10.4435C4.87917 8.89696 5.78819 7.55113 6.93333 6.40599C8.07847 5.26085 9.42431 4.35182 10.9708 3.67891C12.5174 3.00599 14.176 2.66953 15.9469 2.66953C17.7177 2.66953 19.3764 3.00599 20.9229 3.67891C22.4694 4.35182 23.8153 5.26085 24.9604 6.40599C26.1056 7.55113 27.0146 8.89696 27.6875 10.4435C28.3604 11.99 28.6969 13.6487 28.6969 15.4195C28.6969 17.1904 28.3604 18.849 27.6875 20.3956C27.0146 21.9421 26.1056 23.2879 24.9604 24.4331C23.8153 25.5782 22.4694 26.4872 20.9229 27.1602C19.3764 27.8331 17.7177 28.1695 15.9469 28.1695ZM19.9135 21.3695L21.8969 19.3862L17.3635 14.8529V8.3362H14.5302V15.9862L19.9135 21.3695ZM6.88021 0.332031L8.86354 2.31536L2.84271 8.3362L0.859375 6.35286L6.88021 0.332031ZM25.0135 0.332031L31.0344 6.35286L29.051 8.3362L23.0302 2.31536L25.0135 0.332031ZM15.9469 25.3362C18.7094 25.3362 21.0528 24.374 22.9771 22.4497C24.9014 20.5254 25.8635 18.182 25.8635 15.4195C25.8635 12.657 24.9014 10.3136 22.9771 8.38932C21.0528 6.46502 18.7094 5.50286 15.9469 5.50286C13.1844 5.50286 10.841 6.46502 8.91667 8.38932C6.99236 10.3136 6.03021 12.657 6.03021 15.4195C6.03021 18.182 6.99236 20.5254 8.91667 22.4497C10.841 24.374 13.1844 25.3362 15.9469 25.3362Z"
                fill="#2BA45B"
              />
            </svg>
            <div className="mx-2 text-xl font-bold text-[#2BA45B]">
              {preorderWeeks} Weeks
            </div>
            <div className="w-[75px] rounded bg-[#2BA45B] py-1 text-center text-[#ffffff]">
              ${totalPreorderDiscount} Off
            </div>
          </div>
        </div>
        <LineSeparator className="mb-2" />
        <PriceBreakdown />
      </div>
    </>
  );
};

export default PreorderBody;
