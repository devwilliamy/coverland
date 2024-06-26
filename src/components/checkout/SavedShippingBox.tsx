import { useCheckoutContext } from '@/contexts/CheckoutContext';
import SummaryBox from './SummaryBox';
import { shippingOptions } from './ShippingOptions';

type SavedShippingBoxProps = {
    handleClick: () => void;
};
export default function SavedShippingBox({
    handleClick,
}: SavedShippingBoxProps) {
  const { shipping } = useCheckoutContext();
  const selectedIndex = shippingOptions.findIndex(
    (shippingOption) => shippingOption.price === shipping
  );
  return (
    <SummaryBox handleClick={handleClick}>
      <div>{shippingOptions[selectedIndex].shippingText}</div>
      <div>{shippingOptions[selectedIndex].shippingEstimateText}</div>
    </SummaryBox>
  );
}
