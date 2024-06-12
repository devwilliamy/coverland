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
          className={`mb-2 cursor-pointer rounded-xl px-6 py-4 ${selectedIndex === i ? 'border-4 border-[#BE1B1B]' : 'border border-[#707070]'}`}
        >
          <div>{shippingOption?.shippingText}</div>
          <div>{shippingOption?.upsText}</div>
        </div>
      ))}
    </>
  );
}
