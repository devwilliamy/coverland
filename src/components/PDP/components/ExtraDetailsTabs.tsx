'use client';
import { useEffect, useState } from 'react';
import ReviewSection from './ReviewSection';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { PDPAccordion } from '../PDPAccordian';
import ShippingPolicy from '@/app/(main)/policies/shipping-policy/page';
import { usePathname } from 'next/navigation';
import InsightsTab from './InsightsTab';
import SeatCoverDetails from '@/app/(main)/seat-covers/components/SeatCoverDetails';
import useDetermineType from '@/hooks/useDetermineType';
import FeaturesAndProductsSection from '@/app/(main)/[productType]/components/FeaturesAndProductsSection';
import { useMediaQuery } from '@mantine/hooks';

type TabsObj = {
  title: string;
  jsx: React.JSX.Element;
  top?: number | null;
};

export default function ExtraDetailsTabs() {
  const pathname = usePathname();
  const isSeatCovers = pathname?.startsWith('/seat-covers');
  const isLeather = pathname?.toLowerCase().startsWith('/seat-covers/leather');
  const isSmall = useMediaQuery('(max-width: 768px)');
  const isMedium = useMediaQuery('(max-width: 1024px)');
  const calcOffset = () => {
    switch (true) {
      case isSmall:
        return 70;
      case isMedium:
        return 200;

      default:
        return 195;
    }
  };
  const queryOffset = calcOffset();

  const defaultTabs: TabsObj[] = [
    {
      title: 'Shipping & Returns',
      top:
        (document.getElementById('Shipping & Returns')?.offsetTop as number) +
        queryOffset,
      jsx: <ShippingPolicy showHeader={false} />,
    },
    {
      title: 'Warranty',
      top:
        (document.getElementById('Warranty')?.offsetTop as number) +
        queryOffset,
      jsx: <WarrantyPolicy showHeader={false} />,
    },
    {
      title: 'Insights',
      top:
        (document.getElementById('Insights')?.offsetTop as number) +
        queryOffset,
      jsx: <InsightsTab />,
    },
  ];

  if (!isSeatCovers && !isLeather) {
    defaultTabs.splice(
      0,
      0,
      {
        title: 'Details',
        top:
          (document.getElementById('Details')?.offsetTop as number) +
          queryOffset,
        jsx: <FeaturesAndProductsSection />,
      },
      {
        title: 'Reviews',
        top:
          (document.getElementById('Reviews')?.offsetTop as number) +
          queryOffset,
        jsx: <ReviewSection header={false} />,
      },
      {
        title: 'Q&A',
        top:
          (document.getElementById('Q&A')?.offsetTop as number) + queryOffset,
        jsx: <PDPAccordion />,
      }
    );
  }

  if (isSeatCovers || isLeather) {
    // Adding Seat Cover Details to beginning of array
    defaultTabs.splice(0, 1, {
      title: 'Details',
      top:
        (document.getElementById('Details')?.offsetTop as number) + queryOffset,
      jsx: <SeatCoverDetails />,
    });
    // Removing Insights on seat cover pages
    defaultTabs.splice(defaultTabs.length - 1, 1);
  }

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  let scrollDirection: 'up' | 'down' = 'down';
  let lastScrollY = window.scrollY;

  const determineTabIndex = () => {
    if (window.scrollY < lastScrollY) {
      scrollDirection = 'up';
    } else {
      scrollDirection = 'down';
    }
    lastScrollY = window.scrollY;
    const currentTop = defaultTabs[currentTabIndex]?.top;
    const nextTop = defaultTabs[currentTabIndex + 1]?.top;
    if (
      scrollDirection === 'down' &&
      defaultTabs[currentTabIndex + 1] &&
      window.scrollY > Number(nextTop)
    ) {
      setCurrentTabIndex(currentTabIndex + 1);
    } else if (
      scrollDirection === 'up' &&
      currentTabIndex >= 0 &&
      window.scrollY < Number(currentTop)
    ) {
      setCurrentTabIndex(currentTabIndex - 1);
    }
  };

  useEffect(() => {
    const logScroll = () => {
      determineTabIndex();
    };
    if (document) {
      document.addEventListener('scroll', logScroll);
    }
    return () => {
      document.removeEventListener('scroll', logScroll);
    };
  }, [document, defaultTabs]);

  return (
    <>
      <div
        onScroll={() => {}}
        id="Extra-Details-Tabs"
        className="no-scrollbar sticky  top-[-1px] z-[10] flex items-center justify-items-center overflow-x-auto bg-white lg:w-full "
      >
        {defaultTabs.map(({ title, jsx }, index) => (
          <button
            key={`Extra-Details-Tab-${index}`}
            onClick={() => {
              setCurrentTabIndex(index);
              // setCurrentTabContent(jsx);

              const el = document.getElementById(title);
              const elTop = el?.offsetTop;
              const tabs = document.getElementById('Extra-Details-Tabs');
              // const tabsHeight = tabs.
              window.scrollTo({
                top: (elTop as number) + queryOffset,
                behavior: 'instant',
              });

              // window.scrollTo(0, elTop as number);
            }}
            className={` flex w-full items-center whitespace-nowrap px-2 py-2 text-[16px] text-[#767676] max-lg:min-w-max ${currentTabIndex === index ? 'border-b-2 border-b-[#BE1B1B] font-[700] text-[#BE1B1B]' : 'font-[400]'}`}
          >
            <div className="flex w-full grow justify-center  px-2 py-1  ">
              {title}
            </div>
          </button>
        ))}
      </div>
      <div>
        {/* {currentTabContent} */}
        {defaultTabs.map((tabsObj) => (
          <div id={tabsObj.title} key={tabsObj.title}>
            {tabsObj.jsx}
          </div>
        ))}
      </div>
    </>
  );
}
