'use client';

import { calculateTimeTo2PM } from '@/components/PDP/components/TimeTo2PM';
import { Separator } from '@/components/ui/separator';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { BoxIcon, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FreeDetails() {
  const deliveryDate = determineDeliveryByDate();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM());
  const params = useParams();
  const coverType = params?.coverType;
  let warrantyLength: string | number = 'Lifetime';

  switch (coverType) {
    case 'standard':
      warrantyLength = '1-year';
      break;

    case 'standard-pro':
      warrantyLength = '2-years';
      break;

    case 'premium':
      warrantyLength = '5-years';
      break;
    case 'premium-plus':
      warrantyLength = 'Lifetime';
      break;
  }
  console.log(warrantyLength);

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
      title: `${warrantyLength} Warranty`,
    },
    {
      icon: <ShoppingBag />,
      title: 'Free $30 Accessory Kit Included',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start bg-[#FBFBFB] ">
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
