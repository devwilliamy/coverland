'use client';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import FreePackageItem from '@/images/PDP/PDP-Redesign-v3/free-package.webp';
import {
  BoxIcon,
  Check,
  ChevronRight,
  ShieldCheck,
  ShieldOffIcon,
  ShoppingBag,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsGlobeAmericas } from 'react-icons/bs';
import { useMediaQuery } from '@mantine/hooks';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import { getCompleteSelectionData } from '@/utils';
import { useStore } from 'zustand';
import { calculateTimeTo2PM } from '@/lib/utils/date';

type DetailItem = {
  icon: React.JSX.Element;
  title: string;
  description?: string;
  headerText: string;
  jsx: React.JSX.Element;
};

export default function FreeDetails() {
  const params = useParams();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const iconSize = 28;
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM());
  const [currentPage, setCurrentPage] = useState<DetailItem>({
    icon: <></>,
    title: '',
    description: '',
    headerText: '',
    jsx: <></>,
  });
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { isSeatCover } = useDetermineType();
  const coverType = params?.coverType;
  const indentStyling = 'flex flex-col gap-4 pl-[30px] pt-5';
  let warrantyLength: string | number = 'Lifetime';
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  const deliveryDate = determineDeliveryByDate(
    'LLL dd',
    selectedProduct?.preorder && isComplete
      ? selectedProduct?.preorder_date ?? ''
      : undefined
  );

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

  if (isSeatCover) {
    warrantyLength = '10-Year';
  }

  useEffect(() => {
    setTimeRemaining(calculateTimeTo2PM());

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
    <div className="flex items-center gap-3 pt-10 font-[500] text-[#2BA45B]">
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

  const BulletItem = ({ text }: { text: string }) => (
    <div className="grid w-full grid-cols-[4px_auto] gap-2 ">
      <TitleDot />
      <p className="flex font-[500]">{text}</p>
    </div>
  );

  const CheckItem = ({
    text,
    gap = 2,
    description,
  }: {
    text: string;
    gap?: number;
    description?: string;
  }) => (
    <div className={`flex gap-${gap}`}>
      <Check
        className="text-[#2BA45B]"
        strokeWidth={4}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <div className="flex w-full flex-col gap-3 font-[500]">
        <p>{text}</p>
        {description && <div>{description}</div>}
      </div>
    </div>
  );

  const ShippingInformation = () => (
    <div className="flex flex-col px-5 ">
      <IncludedDetailTitle
        icon={<BoxIcon size={iconSize} />}
        title={'Free Shipping'}
      />
      <div className={indentStyling}>
        {[
          'We offer free shipping to all 48 contiguous United States via UPS.',
          'Orders placed before 2 PM PT (Monday-Saturday) are shipped the same day and delivered within 5 business days. ',
          'We also ship to Hawaii, Alaska, Puerto Rico, Virgin Island, Guam, APO, FPO for $49.99 (3-6 business days) via USPS.',
          'All items are in stock and ready to ship immediately.',
        ].map((text, i) => (
          <BulletItem key={i} text={text} />
        ))}
      </div>
      <IncludedDetailTitle
        icon={<BsGlobeAmericas className=" h-[28px] w-[28px]" />}
        title={'International Shipping'}
      />
      <div className={indentStyling}>
        <BulletItem
          text="We ship worldwide. You can view your shipping options during
            checkout."
        />
      </div>
    </div>
  );

  const ServiceGurantee = () => (
    <div className="flex flex-col px-5 ">
      <IncludedDetailTitle
        icon={<ShieldCheck size={iconSize} />}
        title={'Free Returns'}
      />
      <div className={indentStyling}>
        <div className="grid w-full grid-cols-[4px_auto] gap-2 ">
          <TitleDot />
          <div className="flex flex-col gap-7 ">
            <p className="flex font-[500]">
              Return products within 30 days for a full refund or exchange. We
              provide the return shipping label. Contact us to start the
              process.
            </p>
            <a
              href="/contact"
              className="text-[14px] leading-[14px] text-[#4C8EA8] underline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <IncludedDetailTitle
        icon={<ShieldCheck className=" h-[28px] w-[28px]" />}
        title={'Purchase Protection'}
      />
      <div className={indentStyling}>
        <BulletItem text="Enjoy a 90-day full money-back guarantee. Outside the 30-day return window, you can still return the product for a full refund, but you cover the return shipping." />
      </div>
      <Separator className="my-10" />
      <NotIncludedTitle title="International Orders" />
      <div className={indentStyling + ' pb-10'}>
        <BulletItem
          text="Orders shipped outside the USA are not eligible for free returns. You
        cover the return shipping, and we refund the product cost only,
        excluding shipping."
        />
      </div>
    </div>
  );
  const warrantyItems = [
    'Normal Wear and Tear',
    'Weather-Related Damages',
    'Ripping and Tears',
  ];

  isSeatCover && warrantyItems.splice(1, 1);

  const Warranty = () => (
    <div className="flex flex-col px-5 ">
      <IncludedDetailTitle
        icon={<ShieldCheck size={iconSize} />}
        title={`${warrantyLength} Warranty Policy`}
      />

      <div className={indentStyling}>
        <BulletItem
          text={`Our warranty covers your product for ${warrantyLength === 'Lifetime' ? 'a Lifetime' : warrantyLength + 's'} against various issues, including:`}
        />
        <div className="flex flex-col gap-1">
          {warrantyItems.map((text, i) => (
            <CheckItem key={i} text={text} />
          ))}
        </div>
      </div>

      <Separator className="my-10" />
      <NotIncludedTitle title="This warranty does not cover" />
      <div className={indentStyling}>
        {[
          'Damage due to improper use or installation.',
          'Alterations or modifications made to the cover.',
          'Damage caused by accidents, abuse, or neglect.',
        ].map((text, i) => (
          <BulletItem key={i} text={text} />
        ))}
      </div>
      <Separator className="my-10" />
      <p className="text-[18px] font-[600] leading-[18px] text-[#2BA45B]">
        How to Claim Your Warranty in 3 Steps:
      </p>
      <div className="flex flex-col gap-7 pb-[200px] pt-10">
        {[
          {
            text: 'Step 1: Submit a claim',
            description:
              'Send photos/videos showing the damage, along with a brief description of the issue, your name, phone number, and shipping address to support@coverland.com.',
          },
          {
            text: 'Step 2: Processing',
            description:
              'Within 3 working days, we will review your claim and inform you of the final decision. Additional questions may be asked during this time.',
          },
          {
            text: 'Step 3: Replacement',
            description:
              'Upon approval, we will ship a new cover the same day at no additional cost, except for shipping.',
          },
        ].map(({ text, description }) => (
          <div key={text}>
            <CheckItem text={text} gap={5} description={description} />
          </div>
        ))}
      </div>
    </div>
  );

  const FreePackage = () => (
    <div className="flex flex-col px-5 ">
      <IncludedDetailTitle
        icon={<ShoppingBag />}
        title="Free $30 Accessory Kit"
      />
      <section>
        <Image
          alt="Free Package"
          src={FreePackageItem}
          className="w-full pb-[60px]"
        />
        <div className="flex flex-col gap-7 pb-[100px]">
          {[
            {
              title: 'Storage Bag',
              description:
                'Provides storage, portability, and protection for the cover when not in use.',
            },
            {
              title: 'Antenna Patch with Grommets',
              description: 'For older vehicles with a full-size antenna.',
            },
            {
              title: 'Anti-Gust 3-Strap System ',
              description:
                'Holds the cover in place from the front, middle, and back, even in gusts of up to 50 mph.',
            },
          ].map(({ title, description }, index) => (
            <div key={index} className="flex gap-3.5">
              <div className="flex aspect-square h-[26px] w-[26px] items-center justify-center rounded-full bg-[#E0E0E0] p-2 text-[16px] font-[900] leading-[16px] text-[#767676]">
                {index + 1}
              </div>
              <div>
                <p className="pb-2 text-[18px] font-[500] leading-[26px]">
                  {title}
                </p>
                <p className="text-[14px] leading-[24px] text-[#767676]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
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

  const freeDetailItems: DetailItem[] = [
    {
      icon: <BoxIcon />,
      title:
        selectedProduct?.preorder && isComplete
          ? 'Shipped When Restocked'
          : 'Free, Same-Day Shipping',
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
      jsx: <FreePackage />,
    },
  ];
  if (isSeatCover) {
    freeDetailItems.splice(freeDetailItems.length - 1, 1);
  }

  return (
    <div className=" flex flex-col items-center justify-start bg-[#FBFBFB]">
      <Sheet>
        {freeDetailItems.map((data, index) => (
          <FreeDetailItem
            key={`Free-Detail-Item-${index}`}
            data={data}
            setCurrentPage={setCurrentPage}
          />
        ))}
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={`h-full ${isMobile ? 'max-h-[85dvh] min-h-[85dvh] rounded-2xl' : 'max-h-[100dvh] min-h-[100dvh]'} overflow-y-auto  p-0`}
        >
          <SheetHeader className="sticky top-0 flex w-full flex-col bg-white px-4  text-[20px] leading-[20px]">
            <SheetClose className="absolute right-3 top-[0] mr-[10px] mt-[10px] flex rounded-full bg-[#F0F0F099] p-1.5">
              <X size={iconSize} />
            </SheetClose>
            <div className="pb-[24px] pt-[48px] text-[20px] font-[500] leading-[20px] ">
              {currentPage.headerText}
            </div>
            <Separator />
          </SheetHeader>
          {currentPage.jsx}
        </SheetContent>
      </Sheet>
    </div>
  );
}
