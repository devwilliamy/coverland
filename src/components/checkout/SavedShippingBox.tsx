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
    // <SummaryBox handleClick={handleClick}>
    // <div>{shippingOptions[selectedIndex].shippingText}</div>
    // <div>{shippingOptions[selectedIndex].fedexText}</div>
    // </SummaryBox>
    <div>
      <p className="text-base font-medium leading-[27px]">Shipping Speed</p>
      <div className="text-base font-[400] leading-[27px] text-[#767676]">
        <div>{shippingOptions[selectedIndex].shippingText}</div>
        <div>{shippingOptions[selectedIndex].upsText}</div>
      </div>
    </div>
  );
}
