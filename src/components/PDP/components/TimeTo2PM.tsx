'use client';

import { useEffect, useState } from 'react';

export function TimeTo2PMPST() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM()); // Set initial value

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  function calculateTimeTo2PM() {
    const now = new Date();
    const target = new Date();

    target.setHours(14); // Set to 2 PM local time
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    if (now.getHours() >= 14) {
      // Adjust for PST timezone offset
      target.setDate(target.getDate() + 1); // Set to next day if past 2 PM
    }

    const diff: number = target.getTime() - now.getTime();

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    if (hours < 0 || minutes < 0) {
      return ''; // In case of negative values
    }

    return `${hours} Hours ${minutes} Mins`;
  }

  return (
    <p className="text-[12px] font-[400] leading-[12px] text-[#767676]">
      <span className=" text-black">Order within </span>
      <span>{timeRemaining}</span>
    </p>
  );
}
