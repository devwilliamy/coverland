import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState('');
  return (
    <>
      <div className="flex">
        <div>Do you have a promo code? </div>
        <IoIosArrowUp />
      </div>
      <div>
        <input
          className="h-[100px] w-[200px]"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
          }}
        />
        <Button>Apply</Button>
      </div>
    </>
  );
}
