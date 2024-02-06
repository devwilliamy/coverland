import React from 'react';

const LearnMore = () => {
  return (
    <section className="mt-[22px]">
      <p className="text-[12px] font-[700] leading-[20px] lg:hidden">
        As low as $32.50/mo with PayPal. Check your purchasing power.
        <ins>Learn More</ins>
      </p>
      <p className="hidden text-[16px] leading-[22px] lg:block">
        As low as <b>$32.50</b>/mo with <b>PayPal</b>. Check your purchasing
        power.
        <br />
        <ins>Learn More</ins>
      </p>
    </section>
  );
};

export default LearnMore;
