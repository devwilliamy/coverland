import { useState } from 'react';

export default function ShippingOptions() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <div className="pb-4 text-base font-medium">
        Select Your Shipping Option
      </div>
      <div
        onClick={() => setSelectedIndex(0)}
        className={`mb-2 rounded-xl px-6 py-4 ${selectedIndex === 0 ? 'border-4 border-[#343434]' : 'border border-[#707070]'}`}
      >
        <div>$ 0.00 Free Shipping</div>
        <div>FedEx Ground 1-5 Business Days</div>
      </div>
      <div
        onClick={() => setSelectedIndex(1)}
        className={`rounded-xl  px-6 py-4 ${selectedIndex === 1 ? 'border-4 border-[#343434]' : 'border border-[#707070]'}`}
      >
        <div>$29.99</div>
        <div>FedEx 2 Day</div>
      </div>
    </>
  );
}
