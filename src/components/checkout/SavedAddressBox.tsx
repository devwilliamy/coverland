import { StripeAddress } from '@/lib/types/checkout';
import SummaryBox from './SummaryBox';
import { useCheckoutContext } from '@/contexts/CheckoutContext';

type SavedAddressBoxProps = {
  handleClick: () => void;
};
export default function SavedAddressBox({ handleClick }: SavedAddressBoxProps) {
  const { shippingAddress } = useCheckoutContext();
  const { line1, line2, city, state, postal_code } = shippingAddress.address;
  return (
    <SummaryBox handleClick={handleClick}>
      <div>{shippingAddress.name}</div>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>
        {city} {state} {postal_code}
      </div>
    </SummaryBox>
  );
}
