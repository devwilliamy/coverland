import React from 'react';

export default function HelpfulSection() {
  return (
    <span>
      <div className="mt-[34px] flex min-h-[62px] min-w-[167px] max-w-[167px] flex-col ">
        <p className="whitespace-nowrap text-[#767676]">
          8 people found this helpful
        </p>
        <button className="mt-[26px] w-full rounded-[4px] px-[40px] py-[17px] text-[16px] font-[700] leading-[17px] outline outline-1 ">
          HELPFUL
        </button>
      </div>
    </span>
  );
}
