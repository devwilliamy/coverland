import Link from 'next/link';
import CheckoutError from '../../../../components/checkout/CheckoutError';

export default function CheckoutErrorPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <h5 className="text-[50px] font-bold">Order Error</h5>

      <CheckoutError />
      <Link
        className="my-4 rounded-[8px] bg-[#B9130C] px-10 py-4 text-[20px] font-[700]  text-white "
        href="/checkout"
      >
        Return To Checkout
      </Link>
    </div>
  );
}
