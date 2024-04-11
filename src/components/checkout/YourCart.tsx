import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCartContext } from '@/providers/CartProvider';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import CartItemCard from '@/components/checkout/CartItemCard';
import PriceBreakdown from './PriceBreakdown';
import OrderReview from './OrderReview';
import OrderReviewItem from './OrderReviewItem';
import { Separator } from '../ui/separator';
export default function YourCart() {
  const { cartItems, getTotalCartQuantity } = useCartContext();
  const cartQuantity = getTotalCartQuantity();

  const router = useRouter();

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="mt-10 h-20 w-full text-center text-xl">
          Your cart is empty.
        </p>
      ) : (
        <div className="w-full">
          <div className="px-4 lg:hidden">
            {cartItems.map((cartItem, i) => (
              <div
                key={i}
                className="pb-3 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
              >
                <OrderReviewItem item={cartItem} />
              </div>
            ))}
            <Separator className="mt-2 w-full bg-[#C8C7C7] lg:hidden" />
            <div className="mt-4 lg:hidden">
              <PriceBreakdown />
            </div>
          </div>
          <div className="hidden px-4 lg:flex lg:flex-col ">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="pb-3 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
              >
                <CartItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
        // <Table className="w-full">
        //   <TableHeader>
        //     <TableRow>
        //       <TableHead
        //         className="flex h-full
        //           flex-row items-center justify-between text-3xl
        //           md:flex md:flex-row md:gap-2"
        //       >
        //         {/* <div onClick={() => router.back()}>
        //           <IoArrowBack />
        //         </div> */}
        //         {/* <div
        //           className="flex h-full flex-1
        //           flex-col items-center
        //           leading-4 md:flex md:flex-row md:gap-2 md:pb-4"
        //         >
        //           <div className="text-[22px] font-bold text-black">Cart</div>
        //           <div className="text-base font-normal md:pb-0">
        //             {cartQuantity} Items
        //           </div>
        //         </div> */}
        //       </TableHead>
        //     </TableRow>
        //   </TableHeader>
        //   <TableBody>
        //     {cartItems.map((item) => {
        //       return <CartItemCard item={item} key={item?.sku} />;
        //     })}
        //   </TableBody>
        // </Table>
      )}
    </>
  );
}
