import { useCartContext } from '@/providers/CartProvider';
import { Separator } from '../ui/separator';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';

export default function PriceBreakdown() {
  const { currentStep, shipping, totalTax } = useCheckoutContext();
  const {
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
  } = useCartContext();
  const totalMsrpPrice = (getTotalPrice() + shipping).toFixed(
    2
  ) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;

  const shippingText = shipping === 0 ? 'FREE' : `$${shipping}`;
  const isCartEmpty = getTotalCartQuantity() === 0;

  return (
    <div className=" text-base font-normal text-[#343434]">
      <div className="flex justify-between lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      {isCartEmpty ? null : (
        <div className="flex justify-between text-[#1A1A1A]">
          <div>Sale-discount</div>
          <div>- ${totalDiscountedPrice}</div>
        </div>
      )}

      <div className="flex justify-between ">
        <div>Tax</div>
        <div>{totalTax ? `$${totalTax}` : '-'}</div>
      </div>

      {currentStep === CheckoutStep.CHECKOUT && (
        <>
          <div className="flex justify-between ">
            <div>Shipping</div>
            <div>{shippingText}</div>
          </div>
        </>
      )}
      <div className="pb-3 pt-[26px]">
        <Separator className="hidden w-full bg-[#C8C7C7] lg:block" />
        <div className="flex justify-between font-semibold lg:flex-row lg:justify-between lg:py-5 lg:font-bold">
          <div>Order Total: </div>
          <div>
            $
            {totalTax
              ? Number(Number(totalMsrpPrice) + Number(totalTax)).toFixed(2)
              : totalMsrpPrice}
          </div>
        </div>
        <Separator className="hidden w-full bg-[#C8C7C7] lg:block" />
      </div>
    </div>
  );
}
