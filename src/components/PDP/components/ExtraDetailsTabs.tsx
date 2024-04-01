'use client';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import ReviewSection from './ReviewSection';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { PDPAccordion } from '../PDPAccordian';
import ShippingPolicy from '@/app/(main)/policies/shipping-policy/page';
import { usePathname } from 'next/navigation';
import InsightsTab from './InsightsTab';
import SeatCoverDetails from '@/app/(main)/seat-covers/components/SeatCoverDetails';

export default function ExtraDetailsTabs() {
  const pathname = usePathname();
  const isSeatCovers = pathname?.startsWith('/seat-covers');
  const isLeather = pathname?.toLowerCase().startsWith('/seat-covers/leather');

  const defaultTabs = [
    { title: 'Shipping & Returns', jsx: <ShippingPolicy showHeader={false} /> },
    { title: 'Warranty', jsx: <WarrantyPolicy showHeader={false} /> },
    { title: 'Insights', jsx: <InsightsTab /> },
  ];

  // if (!isSeatCovers && !isLeather) {
  //   defaultTabs.splice(
  //     0,
  //     0,
  //     { title: 'Reviews', jsx: <ReviewSection /> },
  //     { title: 'Q&A', jsx: <PDPAccordion /> }
  //   );
  // }

  if (isSeatCovers || isLeather) {
    defaultTabs.splice(0, 0, { title: 'Details', jsx: <SeatCoverDetails /> });
    defaultTabs.splice(defaultTabs.length - 1, 1);
  }
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentTabContent, setCurrentTabContent] = useState<
    JSX.Element | JSX.Element[]
  >(defaultTabs[0].jsx);

  return (
    <>
      <div
        id="Extra-Details-Tabs"
        className="no-scrollbar justify-items-center  sticky top-0 z-[100] bg-white flex overflow-x-auto items-center lg:w-full "
      >
        {defaultTabs.map(({ title, jsx }, index) => (
          <button
            key={`Extra-Details-Tab-${index}`}
            onClick={() => {
              setCurrentTabIndex(index);
              setCurrentTabContent(jsx);
            }}
            className={`flex self-stretch flex-1 items-center justify-center px-2 py-2 text-[16px] text-[#767676] ${currentTabIndex === index ? 'border-b-2 border-b-[#BE1B1B] font-[700] text-[#BE1B1B]' : 'font-[400]'}`}
          >
            <div className="flex items-center justify-center px-2 py-1 ">{title}</div>
          </button>
        ))}
      </div>
      <Separator className="-z-10 -mt-[18px] flex h-0.5 bg-[#BEBEBE]" />
      <div className={`${!isLeather && !isSeatCovers && 'p-4'}`}>
        {currentTabContent}
      </div>
    </>
  );
}
