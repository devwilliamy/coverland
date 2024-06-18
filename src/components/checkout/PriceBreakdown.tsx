'use client';
import { useCartContext } from '@/providers/CartProvider';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Separator } from '../ui/separator';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { error } from 'console';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Info } from 'lucide-react';

export default function PriceBreakdown() {
  const {
    currentStep,
    shipping,
    shippingAddress,
    isReadyToPay,
    twoLetterStateCode,
    totalTax,
  } = useCheckoutContext();
  const {
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    cartItems,
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
  // const [tax, setTax] = useState<string>();
  // const getTax = async () => {
  //   let taxItems = [];
  //   let count = 0;
  //   for (const item of cartItems) {
  //     taxItems.push({
  //       id: item.id ? item.id : count,
  //       quantity: item.quantity,
  //       unit_price: item.msrp,
  //       discount: 0,
  //     });
  //     count++;
  //   }

  //   const bodyData = {
  //     to_country: shippingAddress.address.country,
  //     to_zip: shippingAddress.address.postal_code,
  //     to_state: twoLetterStateCode,
  //     amount: orderSubtotal,
  //     shipping: 0,
  //     line_items: taxItems,
  //   };

  //   const response = await fetch('/api/taxjar/sales-tax', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ bodyData }),
  //   });
  //   const taxRes = await response.json();
  //   setTax(taxRes?.tax?.amount_to_collect);
  // };

  // useEffect(() => {
  //   if (!isCartEmpty && isReadyToPay) {
  //     // getTax();
  //   }
  // }, [isCartEmpty, isReadyToPay]);

  return (
    <div className="flex flex-col gap-1.5 text-[16px] font-normal leading-4 text-[#343434]">
      <div className="flex justify-between lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      {isCartEmpty ? null : (
        <div className="flex justify-between">
          <div>Sale-discount</div>
          <div>- ${totalDiscountedPrice}</div>
        </div>
      )}
      {currentStep === CheckoutStep.CHECKOUT && (
        <>
          <div className="flex justify-between ">
            <div className="flex gap-2">
              <p>Tax</p>
              <Popover>
                <PopoverTrigger>
                  <Info size={16} />
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  className="border-none bg-[#1A1A1A] text-white outline-none"
                >
                  <PopoverPrimitive.PopoverArrow className="h-[22px] w-[22px] -translate-y-1 fill-[#1A1A1A]" />
                  <div className="border-none">
                    The actual tax will be calculated based on the applicable
                    state and local sales taxes when your order is shipped.
                    Learn More
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              {
                <p>
                  {totalTax
                    ? `$${Number.parseFloat(totalTax).toFixed(2)}`
                    : '-'}
                </p>
              }
            </div>
          </div>
          <div className="flex justify-between ">
            <div>Shipping</div>
            <div>{shippingText}</div>
          </div>
        </>
      )}
      <div className="lg:py-[30px]">
        <Separator className="hidden w-full bg-[#C8C7C7] lg:block" />
        <div className="flex justify-between pb-3 pt-5 font-semibold lg:flex-row lg:justify-between lg:py-6 lg:font-bold">
          <div>Order Total </div>
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
