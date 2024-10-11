type GrayDualArrowProps = {
  className?: string;
};
export const GrayDualArrow = ({ className }: GrayDualArrowProps) => {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[100px] w-[100px] max-lg:h-[58px] max-lg:w-[58px] ${className}`}
    >
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="#464646"
        stroke="#888888"
        strokeWidth="2"
      />
      <path
        d="M36.6762 61.8095L25 49.9048L36.6228 38L38.297 39.7075L29.5398 48.6351H70.4602L61.703 39.7075L63.3879 38L75 49.9048L63.3772 61.8095L61.6389 60.1386L70.4602 51.1087H29.44L38.297 60.1386L36.6762 61.8095Z"
        fill="#CCCCCC"
        fillOpacity="0.8"
      />
    </svg>
  );
};
