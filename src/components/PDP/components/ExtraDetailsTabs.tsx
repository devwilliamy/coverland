import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import ReviewSection from './ReviewSection';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { PDPAccordion } from '../PDPAccordian';
import ShippingPolicy from '@/app/(main)/policies/shipping-policy/page';
import { usePathname } from 'next/navigation';

export default function ExtraDetailsTabs() {
  const pathname = usePathname();
  const isSeatCovers = pathname?.startsWith('/seat-covers');
  const isLeatherette = pathname
    ?.toLowerCase()
    .startsWith('/seat-covers/leatherette');
  const otherDetailsBar = [
    { title: 'Shipping & Returns', jsx: <ShippingPolicy showHeader={false} /> },
    { title: 'Warranty', jsx: <WarrantyPolicy showHeader={false} /> },
  ];

  if (!isSeatCovers && !isLeatherette) {
    otherDetailsBar.splice(
      0,
      0,
      { title: 'Reviews', jsx: <ReviewSection /> },
      { title: 'Q&A', jsx: <PDPAccordion /> }
    );
  }

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentTabContent, setCurrentTabContent] = useState<
    JSX.Element | JSX.Element[]
  >(otherDetailsBar[0].jsx);

  return (
    <>
      <div
        id="Extra-Details-Tabs"
        className="no-scrollbar  flex gap-[26px] overflow-x-auto  px-2 pb-4 lg:w-full lg:justify-evenly"
      >
        {otherDetailsBar.map(({ title, jsx }, index) => (
          <button
            key={`Extra-Details-Tab-${index}`}
            onClick={() => {
              setCurrentTabIndex(index);
              setCurrentTabContent(jsx);
            }}
            className={`flex shrink-0 px-2 py-2 text-[16px] ${currentTabIndex === index ? 'border-b-2 border-b-black font-[700]' : 'font-[400]'}`}
          >
            {title}
          </button>
        ))}
      </div>
      <Separator className="-z-10 -mt-[18px] flex h-0.5 bg-[#BEBEBE]" />
      <div className="p-4">{currentTabContent}</div>
    </>
  );
}
