import { StripeAddress } from '@/lib/types/checkout';
import SummaryBox from './SummaryBox';

type SavedAddressBoxProps = {
  address: StripeAddress;
  handleClick: () => void;
};
export default function SavedAddressBox({
  address,
  handleClick,
}: SavedAddressBoxProps) {
  const { line1, line2, city, state, postal_code } = address.address;
  return (
    <SummaryBox handleClick={handleClick}>
      <div>{address.name}</div>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>
        {city} {state} {postal_code}
      </div>
    </SummaryBox>
  );
}
