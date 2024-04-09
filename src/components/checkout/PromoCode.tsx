import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState('');
  return (
    <>
      <div className="flex ">
        <div>Do you have a promo code? </div>
        <IoIosArrowUp />
      </div>
      <div className="flex mt-4">
        <input
          className="h-[32px] w-[202px] rounded border border-[#9C9C9C] mx-2"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
          }}
        />
        <Button className="bg-black h-[32px] rounded text-white">Apply</Button>
      </div>
    </>
  );
}
