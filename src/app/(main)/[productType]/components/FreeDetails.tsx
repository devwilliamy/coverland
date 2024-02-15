'use client';

import { Separator } from '@/components/ui/separator';
import { BoxIcon, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function FreeDetails() {
  const FreeDetailItems = [
    {
      icon: <BoxIcon />,
      title: 'Free, Same-Day Shipping',
      description: 'Order within 9 hours 3 mins - Receive by Feb 20 ',
    },
    {
      icon: <BoxIcon />,
      title: 'Free Returns & Purchase Protection',
    },
    {
      icon: <ShieldCheck />,
      title: 'Lifetime Warranty',
    },
    {
      icon: <ShoppingBag />,
      title: 'Free $30 Accessory Kit Included',
    },
  ];
  return (
    <div className="-mx-4 flex flex-col items-start justify-start bg-[#FBFBFB] px-4  ">
      {FreeDetailItems.map(({ icon, title, description }, index) => (
        <FreeDetailItem
          key={`Free-Detail-Item-${index}`}
          icon={icon}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
}

const FreeDetailItem = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="my-6 flex w-full gap-[18px] ">
        <div>{icon}</div>
        <div className="w-full pt-[1px]">
          <p
            className={` ${description && 'mb-[7px]'} text-[16px] font-[500] leading-[16px]`}
          >
            {title}
          </p>
          <p className="text-[13px] font-[400] leading-[12px] text-[#767676] ">
            {description}
          </p>
        </div>
      </div>
      <Separator />
    </div>
  );
};
