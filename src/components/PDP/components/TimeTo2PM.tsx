'use client';
import { calculateTimeTo2PM } from '@/lib/utils/date';
import { useEffect, useState } from 'react';

export function TimeTo2PMPST() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM()); // Set initial value

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-[12px] font-[500] leading-[12px] text-[#767676]">
      <span className=" font-[700] text-black">Order within </span>
      <span>{timeRemaining}</span>
    </p>
  );
}
