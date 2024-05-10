import CheckoutSummarySection from './CheckoutSummarySection';
import YourCart from './YourCart';

export default function EmptyCheckout() {
  return (
    <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-12 lg:py-4">
      <div className="w-full">
        <YourCart />
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <CheckoutSummarySection />
      </div>
    </div>
  );
}
