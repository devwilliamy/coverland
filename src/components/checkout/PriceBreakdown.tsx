import { useCartContext } from '@/providers/CartProvider';
import { Separator } from '../ui/separator';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { error } from 'console';

export default function PriceBreakdown() {
  const { currentStep, shipping, shippingAddress, isReadyToPay } =
    useCheckoutContext();
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
  const getTax = async () => {
    let taxItems = [];
    let count = 0;
    for (const item of cartItems) {
      taxItems.push({
        id: item.id ? item.id : count,
        quantity: item.quantity,
        unit_price: item.msrp,
        discount: 0,
      });
      count++;
    }

    const bodyData = {
      to_country: shippingAddress.address.country,
      // to_zip: shippingAddress.address.postal_code,
      to_zip: '90245',
      // to_state: shippingAddress.address.state,
      to_state: 'CA',
      amount: orderSubtotal,
      shipping: 0,
      line_items: taxItems,
    };

    // const bodyData = {
    //   to_country: shippingAddress.address.country,
    //   // to_zip: shippingAddress.address.postal_code,
    //   to_zip: '90245',
    //   // to_state: shippingAddress.address.state,
    //   to_state: 'CA',
    //   amount: 15,
    //   shipping: 0,
    //   line_items: [
    //     {
    //       id: '1',
    //       quantity: 1,
    //       unit_price: 15,
    //       discount: 0,
    //     },
    //   ],
    // };

    const response = await fetch('/api/taxjar/sales-tax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bodyData }),
    });

    console.log('[TAXJAR RESPONSE]', { tax: response });
    return;
  };

  if (!isCartEmpty && isReadyToPay) {
    getTax();
  }

  return (
    <div className="py-[1vh] text-base font-normal text-[#343434]">
      <div className="flex justify-between lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      {isCartEmpty ? null : (
        <div className="flex justify-between text-[#D13C3F]">
          <div>Sale-discount</div>
          <div>-${totalDiscountedPrice}</div>
        </div>
      )}
      {currentStep === CheckoutStep.CHECKOUT && (
        <>
          <div className="flex justify-between ">
            <div>Shipping</div>
            <div>{shippingText}</div>
          </div>
        </>
      )}
      <div className="lg:pb-14 lg:pt-14">
        <Separator className="hidden w-full bg-[#C8C7C7] lg:block" />
        <div className="flex justify-between pt-8 font-semibold lg:flex-row lg:justify-between lg:py-5 lg:font-bold">
          <div>Order Total: </div>
          <div>${totalMsrpPrice}</div>
        </div>
        <Separator className="hidden w-full bg-[#C8C7C7] lg:block" />
      </div>
    </div>
  );
}
