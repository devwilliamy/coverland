'use client';

import { calculateTimeTo2PM } from '@/components/PDP/components/TimeTo2PM';
import { Separator } from '@/components/ui/separator';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { BoxIcon, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SeatCoverFreeDetails() {
  const deliveryDate = determineDeliveryByDate();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM()); // Set initial value

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const SeatFreeDetailItems = [
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
  ];
  return (
    <div className="flex flex-col items-center justify-start bg-[#FBFBFB] ">
      {SeatFreeDetailItems.map(({ icon, title, description }, index) => (
        <>
          {index === 0 && <Separator />}
          <SeatFreeDetailItem
            key={`Free-Detail-Item-${index}`}
            icon={icon}
            title={title}
            description={description}
          />
        </>
      ))}
    </div>
  );
}

const SeatFreeDetailItem = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title?: string;
  description?: string;
}) => {
  return (
    <span className="w-full items-center">
      <div className="flex w-full items-center">
        <div className="my-6 flex w-full gap-[18px] lg:grid lg:grid-cols-[0.2fr_1fr_auto] lg:items-center lg:justify-evenly  lg:justify-items-center ">
          <div>{icon}</div>
          <div className={` ${!description && 'pt-1'}  justify-self-start`}>
            <p
              className={` ${description && 'mb-[7px]'} text-[16px] font-[500] leading-[16px]`}
            >
              {title}
            </p>
            {description && (
              <p className="text-[13px] font-[400] leading-[12px] text-[#767676] ">
                {description}
              </p>
            )}
          </div>
          <div>&nbsp;</div>
        </div>
      </div>
      <Separator />
    </span>
  );
};
