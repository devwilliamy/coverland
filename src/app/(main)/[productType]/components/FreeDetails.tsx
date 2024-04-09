'use client';

import { calculateTimeTo2PM } from '@/components/PDP/components/TimeTo2PM';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTrigger,
} from '@/components/ui/sheet';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import {
  BoxIcon,
  ChevronRight,
  ShieldCheck,
  ShieldOffIcon,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsGlobeAmericas } from 'react-icons/bs';

type DetailItem = {
  icon: React.JSX.Element;
  title: string;
  description?: string;
  headerText: string;
  jsx: React.JSX.Element;
};

export default function FreeDetails() {
  const deliveryDate = determineDeliveryByDate();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM());
  const [currentPage, setCurrentPage] = useState<DetailItem>({
    icon: <></>,
    title: '',
    description: '',
    headerText: '',
    jsx: <></>,
  });
  const params = useParams();
  const coverType = params?.coverType;
  let warrantyLength: string | number = 'Lifetime';

  switch (coverType) {
    case 'standard':
      warrantyLength = '1-Year';
      break;

    case 'standard-pro':
      warrantyLength = '2-Year';
      break;

    case 'premium':
      warrantyLength = '5-Year';
      break;
    case 'premium-plus':
      warrantyLength = 'Lifetime';
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const IncludedDetailTitle = ({
    icon,
    title,
  }: {
    icon: React.JSX.Element;
    title: string;
  }) => (
    <div className="flex items-center gap-3 font-[500] text-[#2BA45B]">
      {icon}
      <p className="text-[18px] leading-[18px]">{title}</p>
    </div>
  );

  const NotIncludedTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 font-[500]">
      <ShieldOffIcon />
      <p className="text-[18px] leading-[18px]">{title}</p>
    </div>
  );
  const TitleDot = () => (
    <div className="mt-2 flex max-h-[4px] min-h-[4px] min-w-[4px] max-w-[4px] rounded-full bg-black" />
  );

  const ShippingInformation = () => (
    <div className="flex flex-col px-5 pt-10 ">
      <IncludedDetailTitle
        icon={<BoxIcon size={28} />}
        title={'Free Shipping'}
      />
      <div className="flex flex-col pl-[35px] pt-5">
        {[
          'We offer free shipping to all 48 contiguous United States via UPS.',
          'Orders placed before 2 PM PT (Monday-Saturday) are shipped the same day and delivered within 5 business days. ',
          'We also ship to Hawaii, Alaska, Puerto Rico, Virgin Island, Guam, APO, FPO for $49.99 (3-6 business days) via USPS.',
          'All items are in stock and ready to ship immediately.',
        ].map((text) => (
          <div className="grid w-full grid-cols-[4px_auto] gap-2 ">
            <TitleDot />
            <p className="flex">{text}</p>
          </div>
        ))}
      </div>
      <div className=" pt-10">
        <IncludedDetailTitle
          icon={<BsGlobeAmericas className=" h-[28px] w-[28px]" />}
          title={'Free Shipping'}
        />
        <div className="grid w-full grid-cols-[4px_auto] gap-2 pl-[35px] pt-5 ">
          <TitleDot />
          <p className="flex">
            We ship worldwide. You can view your shipping options during
            checkout.
          </p>
        </div>
      </div>
    </div>
  );

  const ServiceGurantee = () => (
    <div className="flex flex-col px-5 pt-10 ">
      <IncludedDetailTitle
        icon={<BoxIcon size={28} />}
        title={'Free Returns'}
      />
      <div className="grid w-full grid-cols-[4px_auto] gap-2 pl-[35px] pt-5">
        <TitleDot />
        <p className="flex">
          Return products within 30 days for a full refund or exchange. We
          provide the return shipping label. Contact us to start the process.
        </p>
      </div>
      <a
        href="/contact"
        className="pl-[60px] pt-7 text-[14px] leading-[14px] text-[#4C8EA8]"
      >
        Contact Us
      </a>
      <div className=" pt-10">
        <IncludedDetailTitle
          icon={<BsGlobeAmericas className=" h-[28px] w-[28px]" />}
          title={'Purchase Protection'}
        />
        <div className="grid w-full grid-cols-[4px_auto] gap-2 pl-[35px] pt-5 ">
          <TitleDot />
          <p className="flex">
            We ship worldwide. You can view your shipping options during
            checkout.
          </p>
        </div>
      </div>
      <Separator className="my-10" />
      <NotIncludedTitle title="International Orders" />
      <div className="grid w-full grid-cols-[4px_auto] gap-2 pb-[80px] pl-[35px] pt-5 ">
        <TitleDot />
        <p className="flex">
          Orders shipped outside the USA are not eligible for free returns. You
          cover the return shipping, and we refund the product cost only,
          excluding shipping.
        </p>
      </div>
    </div>
  );

  const Warranty = () => (
    <div className="flex flex-col px-5 pt-10 ">
      <IncludedDetailTitle
        icon={<BoxIcon size={28} />}
        title={'Free Returns'}
      />
      <div className="grid w-full grid-cols-[4px_auto] gap-2 pl-[35px] pt-5">
        <TitleDot />
        <p className="flex">
          Return products within 30 days for a full refund or exchange. We
          provide the return shipping label. Contact us to start the process.
        </p>
      </div>
      <a
        href="/contact"
        className="pl-[60px] pt-7 text-[14px] leading-[14px] text-[#4C8EA8]"
      >
        Contact Us
      </a>
      <div className=" pt-10">
        <IncludedDetailTitle
          icon={<BsGlobeAmericas className=" h-[28px] w-[28px]" />}
          title={'Purchase Protection'}
        />
        <div className="grid w-full grid-cols-[4px_auto] gap-2 pl-[35px] pt-5 ">
          <TitleDot />
          <p className="flex">
            We ship worldwide. You can view your shipping options during
            checkout.
          </p>
        </div>
      </div>
    </div>
  );

  const FreeDetailItem = ({
    setCurrentPage,
    data,
  }: {
    setCurrentPage: (e: DetailItem) => void;
    data: DetailItem;
  }) => {
    return (
      <SheetTrigger
        className="flex w-full flex-col items-center"
        onClick={(e) => {
          setCurrentPage(data);
        }}
      >
        <div className="flex w-full items-center">
          <div className="my-6 flex w-full items-center gap-[18px] lg:grid lg:grid-cols-[0.2fr_1fr_auto]  lg:justify-evenly  lg:justify-items-center ">
            <div>{data.icon}</div>
            <div
              className={` ${!data.description && 'pt-1'} w-full  justify-self-start`}
            >
              <p
                className={` ${data.description && 'mb-[7px]'} text-start text-[16px] font-[500] leading-[16px]`}
              >
                {data.title}
              </p>
              {data.description && (
                <p className="text-start text-[13px] font-[400] leading-[12px] text-[#767676] ">
                  {data.description}
                </p>
              )}
            </div>
            <div className="flex h-full items-center justify-end">
              <ChevronRight className="text-[#767676]" />
            </div>
          </div>
        </div>
        <Separator />
      </SheetTrigger>
    );
  };

  const FreeDetailItems: DetailItem[] = [
    {
      icon: <BoxIcon />,
      title: 'Free, Same-Day Shipping',
      description: `Order within ${timeRemaining} - Receive by ${deliveryDate}`,
      headerText: 'Shipping Information',
      jsx: <ShippingInformation />,
    },
    {
      icon: <BoxIcon />,
      title: 'Free Returns & Purchase Protection',
      headerText: 'Service Guarantee',
      jsx: <ServiceGurantee />,
    },
    {
      icon: <ShieldCheck />,
      title: `${warrantyLength} Warranty`,
      headerText: 'Warranty',
      jsx: <Warranty />,
    },
    {
      icon: <ShoppingBag />,
      title: 'Free $30 Accessory Kit Included',
      description: `Includes storage bag, wind-strap, and antenna patch.`,
      headerText: 'Free Package',
      jsx: <></>,
    },
  ];
  return (
    <div className=" flex flex-col  items-center justify-start bg-[#FBFBFB]">
      <Sheet>
        {FreeDetailItems.map((data, index) => (
          <FreeDetailItem
            key={`Free-Detail-Item-${index}`}
            data={data}
            setCurrentPage={setCurrentPage}
          />
        ))}
        <SheetContent
          side={'bottom'}
          className="max-h-[85dvh] min-h-[85dvh] overflow-y-auto rounded-2xl"
        >
          <SheetHeader className="sticky top-0 flex w-full flex-col bg-white px-4  pt-4 text-[20px] leading-[20px]">
            <SheetClose className="absolute right-3 top-[0] mr-4 mt-[20px] flex rounded-full bg-[#F0F0F099] p-1.5">
              <X size={28} />
            </SheetClose>
            <div className="pb-[24px] pt-[48px] text-[20px] font-[500] leading-[20px] ">
              {currentPage.headerText}
            </div>
            <Separator className="pt" />
          </SheetHeader>
          {currentPage.jsx}
        </SheetContent>
      </Sheet>
    </div>
  );
}
