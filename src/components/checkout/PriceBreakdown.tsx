import { useCartContext } from '@/providers/CartProvider';
import { Separator } from '../ui/separator';

export default function PriceBreakdown() {
  const { getTotalPrice, getOrderSubtotal, getTotalDiscountPrice } =
    useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;

  return (
    <div className="py-[1vh] text-base font-normal text-[#343434]">
      <div className="flex justify-between ">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      <div className="flex justify-between text-[#D13C3F]">
        <div>Sale-discount</div>
        <div>-${totalDiscountedPrice}</div>
      </div>
      <div className="flex justify-between pt-8 pb-6 font-semibold">
      {/* <div className="self-end pb-1 pr-5 text-lg font-bold max-md:hidden lg:font-bold"> */}
        <div>Order Total: </div>
        <div>${totalMsrpPrice}</div>
      </div>
      <Separator className="w-full bg-[#C8C7C7]" />

    </div>
  );
}
