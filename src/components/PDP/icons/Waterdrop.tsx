import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const Waterdrop: React.FC<IconProps> = ({
  width = 50,
  height = 50,
  color = 'none',
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 50 50"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="0.375"
      y="0.375"
      width="49.25"
      height="49.25"
      rx="24.625"
      fill="#EAEAEA"
      fill-opacity="0.7"
    />
    <rect
      x="0.375"
      y="0.375"
      width="49.25"
      height="49.25"
      rx="24.625"
      stroke="#888888"
      stroke-width="0.75"
    />
    <path
      d="M24.9987 36.6328C20.9821 36.6328 17.726 33.3767 17.726 29.3601C17.726 28.9584 17.4004 28.6328 16.9987 28.6328C16.597 28.6328 16.2715 28.9584 16.2715 29.3601C16.2715 34.18 20.1788 38.0873 24.9987 38.0873C25.4004 38.0873 25.726 37.7617 25.726 37.3601C25.726 36.9584 25.4004 36.6328 24.9987 36.6328Z"
      fill="#313030"
    />
    <path
      d="M24.9997 9C23.5451 9 13.3633 21.3636 13.3633 29.3636C13.3633 35.7902 18.5731 41 24.9997 41C31.4262 41 36.636 35.7902 36.636 29.3636C36.636 21.3636 26.4542 9 24.9997 9ZM24.9997 39.5454C19.2692 39.434 14.7124 34.7014 14.8178 28.9709C14.8178 22.0909 24.2724 10.7309 24.9997 10.7309C25.7269 10.7309 35.1815 22.0909 35.1815 28.9709C35.2869 34.7014 30.7301 39.4341 24.9997 39.5454Z"
      fill="#313030"
    />
  </svg>
);

export default Waterdrop;
