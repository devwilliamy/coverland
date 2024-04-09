import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCartContext } from '@/providers/CartProvider';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import CheckoutSummarySection from '@/components/checkout/CheckoutSummarySection';
import CartItemCard from '@/components/checkout/CartItemCard';
export default function YourCart() {
    const {
        cartItems,
        getTotalPrice,
        getOrderSubtotal,
        getTotalDiscountPrice,
        getTotalCartQuantity,
        clearLocalStorageCart,
      } = useCartContext();
    
      const router = useRouter();
    
      const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
      const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
        2
      ) as unknown as number;
      const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;
      const cartQuantity = getTotalCartQuantity();
  return (
    <>
      {cartItems.length === 0 ? (
        <p className="mt-10 h-20 w-full text-center text-xl">
          Your cart is empty.
        </p>
      ) : (
        // <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="flex h-full
                  flex-row items-center justify-between text-3xl
                  md:flex md:flex-row md:gap-2"
                >
                  <div onClick={() => router.back()}>
                    <IoArrowBack />
                  </div>
                  <div
                    className="flex h-full flex-1
                  flex-col items-center 
                  leading-4 md:flex md:flex-row md:gap-2"
                  >
                    <div className="text-[22px] font-bold text-black">Cart</div>
                    <div className="text-base font-normal md:pb-0">
                      {cartQuantity} Items
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            {cartItems.map((item) => {
              return <CartItemCard item={item} key={item?.sku} />;
            })}
          </Table>

          
        // </div>
      )}
    </>
  );
}
