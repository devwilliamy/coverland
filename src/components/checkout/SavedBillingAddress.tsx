import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';
import { MouseEvent } from 'react';

type SavedBillingAddressProps = {
  address: StripeAddress;
};

export default function SavedBillingAddress({
  address,
}: SavedBillingAddressProps) {
  const { line1, line2, city, state, postal_code } = address.address;
  const {
    isBillingSameAsShipping,
    updateIsEditingAddress,
    updateIsReadyToPay,
  } = useCheckoutContext();

  const handleEditBilling = () => {
    updateIsReadyToPay(false);
    updateIsEditingAddress(true);
  };

  return (
    <div className="flex flex-col lg:mb-10">
      <div className="flex flex-row items-center justify-between leading-10">
        <div className="text-base font-medium">Billing Details</div>
        {!isBillingSameAsShipping && (
          <div
            className="cursor-pointer pr-4 font-[500] text-[#1A1A1A] underline"
            onClick={handleEditBilling}
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
