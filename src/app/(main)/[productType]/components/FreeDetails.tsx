'use client';

import { calculateTimeTo2PM } from '@/components/PDP/components/TimeTo2PM';
import { Separator } from '@/components/ui/separator';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { BoxIcon, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FreeDetails() {
  const deliveryDate = determineDeliveryByDate();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM()); // Set initial value

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const FreeDetailItems = [
    {
      icon: <BoxIcon />,
      title: 'Free, Same-Day Shipping',
      description: `Order within ${timeRemaining} - Receive by ${deliveryDate}`,
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
        <div className={`w-full ${!description && 'pt-1'} `}>
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
