import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';

type SavedBillingAddressProps = {
  address: StripeAddress;
  handleClick: () => void;
};

export default function SavedBillingAddress({
  address,
  handleClick,
}: SavedBillingAddressProps) {
  const { line1, line2, city, state, postal_code } = address.address;
  const { isBillingSameAsShipping, twoLetterStateCode } = useCheckoutContext();
  return (
    <div className="flex flex-col lg:mb-4">
      <div className="flex flex-row items-center justify-between leading-10">
        <div className="text-base font-medium">Billing Details</div>
        {!isBillingSameAsShipping && (
          <div
            className="cursor-pointer pr-4 text-[#0C87B8] underline"
            onClick={handleClick}
          >
            Edit
          </div>
        )}
      </div>
      <div className="leading-6">
        <div>{address.name}</div>
        <div>{line1}</div>
        <div>{line2}</div>
        <div>
          {city} {state} {postal_code}
        </div>
      </div>
    </div>
  );
}
