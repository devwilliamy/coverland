import { useCartContext } from '@/providers/CartProvider';
import OrderReviewItem from './OrderReviewItem';
import { Table, TableBody } from '../ui/table';
import { CheckoutStep } from '@/lib/types/checkout';

export default function OrderReview({ currentStep }: { currentStep: number }) {
  const { cartItems } = useCartContext();
  return (
    <>
      {currentStep !== CheckoutStep.CART && (
        <>
          <div className="pb-2 pt-9 text-2xl font-medium">Order Review</div>
          <Table>
            <TableBody>
              {cartItems.map((cartItem, i) => (
                <OrderReviewItem key={i} item={cartItem} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
