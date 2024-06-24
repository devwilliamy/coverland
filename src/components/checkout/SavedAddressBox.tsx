import { StripeAddress } from '@/lib/types/checkout';
import SummaryBox from './SummaryBox';
import { useCheckoutContext } from '@/contexts/CheckoutContext';

type SavedAddressBoxProps = {
  handleClick: () => void;
};
export default function SavedAddressBox({ handleClick }: SavedAddressBoxProps) {
  const { shippingAddress, customerInfo, twoLetterStateCode } =
    useCheckoutContext();
  const { line1, line2, city, state, postal_code } = shippingAddress.address;
  return (
    <SummaryBox handleClick={handleClick}>
      <div>{shippingAddress.name}</div>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>
        {city} {twoLetterStateCode ?? state} {postal_code}
      </div>
      <div>{customerInfo.email}</div>
      <div>{customerInfo.phoneNumber}</div>
    </SummaryBox>
  );
}
