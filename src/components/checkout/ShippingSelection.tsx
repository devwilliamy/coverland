import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { useState } from 'react';
import { shippingOptions } from './ShippingOptions';

export default function ShippingSelection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setShipping } = useCheckoutContext();

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    index === 0 ? setShipping(0) : setShipping(29.99);
  };

  return (
    <>
      <div className="pb-4 text-base font-medium">
        Select Your Shipping Option
      </div>
      {shippingOptions.map((shippingOption, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          className={`mb-2 cursor-pointer rounded-[8px] px-6 py-4 text-[16px] font-[400] leading-[27px] ${selectedIndex === i ? 'border-[1px] border-[#1A1A1A]' : 'border border-[#707070]'}`}
        >
          <div>{shippingOption?.shippingText}</div>
          <div className="text-[#767676]">{shippingOption?.upsText}</div>
        </div>
      ))}
    </>
  );
}
