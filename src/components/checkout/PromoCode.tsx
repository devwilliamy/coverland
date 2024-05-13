import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState('');
  const [showInput, setShowInput] = useState(true);

  return (
    <>
      <div
        className="flex cursor-pointer flex-row justify-between"
        onClick={() => setShowInput(!showInput)}
      >
        <div>Do you have a promo code? </div>
        {showInput ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {showInput && (
        <div className="mt-4 flex">
          <input
            className="mr-2 h-[32px] w-[202px] rounded border border-[#9C9C9C] lg:ml-0"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
            }}
          />
          <Button className="h-[32px] rounded bg-black text-sm text-white lg:text-base">
            Apply
          </Button>
        </div>
      )}
    </>
  );
}
