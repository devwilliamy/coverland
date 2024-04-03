'use client';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import ReviewSection from './ReviewSection';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { PDPAccordion } from '../PDPAccordian';
import ShippingPolicy from '@/app/(main)/policies/shipping-policy/page';
import { useParams, usePathname } from 'next/navigation';
import InsightsTab from './InsightsTab';
import SeatCoverDetails from '@/app/(main)/seat-covers/components/SeatCoverDetails';
import useDetermineType from '@/hooks/useDetermineType';
import FeaturesAndProductsSection from '@/app/(main)/[productType]/components/FeaturesAndProductsSection';

export default function ExtraDetailsTabs() {
  const pathname = usePathname();
  const { coverType } = useDetermineType();
  const isSeatCovers = pathname?.startsWith('/seat-covers');
  const isLeather = pathname?.toLowerCase().startsWith('/seat-covers/leather');

  const defaultTabs = [
    {
      title: 'Shipping & Returns',
      jsx: (
        <div id="shipping-tab">
          <ShippingPolicy showHeader={false} />
        </div>
      ),
    },
    {
      title: 'Warranty',
      jsx: (
        <div id="warranty-tab">
          <WarrantyPolicy showHeader={false} />
        </div>
      ),
    },
    {
      title: 'Insights',
      jsx: (
        <div id="insights-tab">
          <InsightsTab />
        </div>
      ),
    },
  ];

  if (!isSeatCovers && !isLeather) {
    defaultTabs.splice(
      0,
      0,
      {
        title: 'Details',
        jsx: (
          <div id={`${coverType}-details-tab`}>
            <FeaturesAndProductsSection />
          </div>
        ),
      },
      // {
      //   title: 'Reviews',
      //   jsx: (
      //     <div id="reviews-tab">
            // <ReviewSection header={false} />
      //     </div>
      //   ),
      // },
      {
        title: 'Q&A',
        jsx: (
          <div id="q&a-tab">
            <PDPAccordion />,
          </div>
        ),
      }
    );
  }

  if (isSeatCovers || isLeather) {
    // Adding Seat Cover Details to beginning of array
    defaultTabs.splice(0, 1, {
      title: 'Details',
      jsx: (
        <div id="seat-cover-details-tab">
          <SeatCoverDetails />
        </div>
      ),
    });
    // Removing Insights
    defaultTabs.splice(defaultTabs.length - 1, 1);
  }
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentTabContent, setCurrentTabContent] = useState<
    JSX.Element | JSX.Element[]
  >(defaultTabs[0].jsx);

  return (
    <>
      <div id="top-bar"></div>
      <div
        id="Extra-Details-Tabs"
        className="no-scrollbar sticky  top-[-1px] z-[10] flex items-center justify-items-center overflow-x-auto bg-white lg:w-full "
      >
        {defaultTabs.map(({ title, jsx }, index) => (
          <button
            key={`Extra-Details-Tab-${index}`}
            onClick={() => {
              setCurrentTabIndex(index);
              setCurrentTabContent(jsx);
              const el = document.getElementById('top-bar');
              el?.scrollIntoView({ behavior: 'instant', block: 'start' });
            }}
            className={`flex flex-1 items-center justify-center self-stretch px-2 py-2 text-[16px] text-[#767676] max-lg:min-w-[30vw] ${currentTabIndex === index ? 'border-b-2 border-b-[#BE1B1B] font-[700] text-[#BE1B1B]' : 'font-[400]'}`}
          >
            <div className="flex items-center justify-center px-2 py-1 ">
              {title}
            </div>
          </button>
        ))}
      </div>
      <div>
        {currentTabContent}
      </div>
    </>
  );
}
