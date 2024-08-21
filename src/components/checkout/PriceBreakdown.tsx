import { useCartContext } from '@/providers/CartProvider';
import { Separator } from '../ui/separator';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import EstimatedTaxPopover from './EstimatedTaxPopover';

export default function PriceBreakdown() {
  const { currentStep, shipping, tax, showTax } = useCheckoutContext();
  const {
    getCartTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    isCartPreorder,
    getTotalPreorderDiscount,
  } = useCartContext();
  const orderTotal = (getCartTotalPrice() + shipping + tax).toFixed(2);
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(2);
  const orderSubtotal = getOrderSubtotal().toFixed(2);

  const totalPreorderDiscount = getTotalPreorderDiscount().toFixed(2);

  const shippingText = shipping === 0 ? 'FREE' : `$${shipping}`;
  const isCartEmpty = getTotalCartQuantity() === 0;

  return (
    <div className=" text-base font-normal text-[#343434]">
      <div className="flex justify-between pt-2 lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      {isCartEmpty ? null : (
        <div className="flex justify-between text-[#D13C3F]">
          <div>Sale-discount</div>
          <div>- ${totalDiscountedPrice}</div>
        </div>
      )}
      {!isCartEmpty && isCartPreorder ? (
        <div className="flex justify-between text-[#D13C3F]">
          <div>Pre-order Savings</div>
          <div>-${totalPreorderDiscount}</div>
        </div>
      ) : null}
      {currentStep === CheckoutStep.CHECKOUT && (
        <>
          <div className="flex justify-between ">
            <div>Shipping</div>
            <div>{shippingText}</div>
          </div>
          <div className="flex justify-between ">
            <div>
              Estimated Tax <EstimatedTaxPopover />
            </div>

            <div>{showTax ? `$${tax.toFixed(2)}` : '----'}</div>
          </div>
        </>
      )}
      <div className="pb-3 pt-[26px]">
        <div className="flex justify-between border-y border-[#C8C7C7] py-5 font-semibold lg:flex-row lg:justify-between lg:font-bold">
          <div>Order Total: </div>
          <div>${orderTotal}</div>
        </div>
      </div>
    </div>
  );
}
