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
        Select your shipping speed
      </div>
      {shippingOptions.map((shippingOption, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          className={`mb-2 cursor-pointer rounded-xl px-6 py-4 ${selectedIndex === i ? 'border border-[#1A1A1A]' : 'border border-[#707070]'}`}
        >
          <div>{shippingOption?.shippingText}</div>
          <div className="text-[16px] font-[400] leading-[27px] text-[#767676]">
            {shippingOption?.fedexText}
          </div>
        </div>
      ))}
    </>
  );
}
