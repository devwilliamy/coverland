import React from 'react';

type BuyWithConfidenceIconProps = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
export default function BuyWithConfidenceIcon({
  icon,
  title,
  content,
}: BuyWithConfidenceIconProps) {
  return (
    <div className="flex w-full flex-col items-center justify-start pb-8 lg:pb-0">
      {icon}
      <div className="flex w-full flex-col items-center justify-start md:ml-0">
        <h2 className="pt-4 text-center text-lg font-bold capitalize xl:py-4">
          {title}
        </h2>
        <p className="pt-1 text-center text-sm font-normal text-[#727272]">
          {content}
        </p>
      </div>
    </div>
  );
}
