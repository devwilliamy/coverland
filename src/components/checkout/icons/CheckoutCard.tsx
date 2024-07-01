import React from 'react';

const CheckoutCard = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-fit max-h-[30px] w-fit max-w-[70px] "
    >
      <mask
        id="mask0_4046_55429"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="25"
      >
        <rect x="0.394531" y="0.125" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4046_55429)">
        <path
          d="M22.3945 6.125V18.125C22.3945 18.675 22.1989 19.146 21.8075 19.538C21.4155 19.9293 20.9445 20.125 20.3945 20.125H4.39453C3.84453 20.125 3.37386 19.9293 2.98253 19.538C2.59053 19.146 2.39453 18.675 2.39453 18.125V6.125C2.39453 5.575 2.59053 5.10433 2.98253 4.713C3.37386 4.321 3.84453 4.125 4.39453 4.125H20.3945C20.9445 4.125 21.4155 4.321 21.8075 4.713C22.1989 5.10433 22.3945 5.575 22.3945 6.125ZM4.39453 8.125H20.3945V6.125H4.39453V8.125ZM4.39453 12.125V18.125H20.3945V12.125H4.39453Z"
          fill="#343434"
        />
      </g>
    </svg>
  );
};

export default CheckoutCard;
