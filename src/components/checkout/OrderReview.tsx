import { useCartContext } from '@/providers/CartProvider';
import OrderReviewItem from './OrderReviewItem';
import { Table, TableBody } from '../ui/table';

export default function OrderReview() {
  const { cartItems } = useCartContext();
  return (
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
  );
}
