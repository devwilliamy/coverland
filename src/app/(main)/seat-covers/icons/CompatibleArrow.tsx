import React from 'react';

export default function CompatibleArrow() {
  return (
    <svg
      width="21"
      height="38"
      viewBox="0 0 21 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.20039 37.2008L20.4004 19.0008L2.20039 0.800781L0.70039 2.30078L17.4504 19.0008L0.70039 35.7008L2.20039 37.2008Z"
        fill="#1C1B1F"
      />
    </svg>
  );
}

export const CompatArrowLeft = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <div
    // className={`absolute cursor-pointer ${api?.canScrollPrev() ? 'text-black' : 'hidden'} left-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 scale-x-[-1] max-lg:hidden`}
    // onClick={() => api?.scrollNext()}
    className={
      className
        ? className
        : 'absolute left-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 scale-x-[-1]'
    }
    onClick={onClick}
    // className="w-max"
  >
    <CompatibleArrow />
  </div>
);

export const CompatArrowRight = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <div
    // className={`absolute cursor-pointer ${api?.canScrollPrev() ? 'text-black' : 'hidden'} left-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 scale-x-[-1] max-lg:hidden`}
    // onClick={() => api?.scrollNext()}
    className={
      className
        ? className
        : 'absolute right-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 '
    }
    onClick={onClick}
    // className="w-max"
  >
    <CompatibleArrow />
  </div>
);
