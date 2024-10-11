type GrayDualBlackArrowProps = {
  className?: string;
};
export const GrayDualBlackArrow = ({ className }: GrayDualBlackArrowProps) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="49.625"
        fill="#EAEAEA"
        fill-opacity="0.7"
        stroke="#888888"
        stroke-width="0.75"
      />
      <path
        d="M37.9757 61L27 50L37.9255 39L39.4992 40.5777L31.2674 48.8269H69.7326L61.5008 40.5777L63.0846 39L74 50L63.0745 61L61.4405 59.456L69.7326 51.1125H31.1736L39.4992 59.456L37.9757 61Z"
        fill="#1A1A1A"
      />
    </svg>
  );
};
