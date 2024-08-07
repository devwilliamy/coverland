import Link from 'next/link';
import CheckoutCancel from '../../../../components/checkout/CheckoutCancel';

export default function CheckoutCancelPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <h5 className="text-[50px] font-bold">Order Canceled</h5>
      <CheckoutCancel />
      <Link
        className="my-4 rounded-[8px] bg-[#B9130C] px-10 py-4 text-[20px] font-[700]  text-white "
        href="/checkout"
      >
        Return To Checkout
      </Link>
    </div>
  );
}
