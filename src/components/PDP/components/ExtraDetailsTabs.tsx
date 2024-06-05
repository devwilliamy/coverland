'use client';
import { useEffect, useState } from 'react';
import ReviewSection from './ReviewSection';
import { QuestionsAccordion } from '../QuestionsAccordion';

import InsightsTab from './InsightsTab';
import SeatCoverDetails from '@/app/(main)/seat-covers/components/SeatCoverDetails';
import useDetermineType from '@/hooks/useDetermineType';
import VehicleCoverDetails from '@/app/(main)/[productType]/components/VehicleCoverDetails';
import { useMediaQuery } from '@mantine/hooks';
import { Separator } from '@/components/ui/separator';
import ShippingPolicyContent from '@/components/policy/ShippingPolicyContent';
import WarrantyPolicyContent from '@/components/policy/WarrantyPolicyContent';
import SeatCoverReviewSection from '@/app/(main)/seat-covers/components/SeatCoverReviewSection';

type TabsObj = {
  title: string;
  jsx?: React.JSX.Element;
  top?: number | null;
};

export default function ExtraDetailsTabs() {
  const { isSeatCover } = useDetermineType();

  const isSmall = useMediaQuery('(max-width: 768px)');
  const isMedium = useMediaQuery('(max-width: 1024px)');

  const calcOffset = () => {
    switch (true) {
      case isSeatCover:
        return -45;
      case isSmall:
        return 70;
      case isMedium:
        return 200;
      default:
        return 195;
    }
  };

  const queryOffset = calcOffset();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  let scrollDirection: 'up' | 'down' = 'down';
  const [defaultTabs, setDefaultTabs] = useState<TabsObj[]>([]);
  let lastScrollY = 0;
  const mainTabs = [
    {
      title: 'Shipping & Returns',
    },
    {
      title: 'Warranty',
    },
    {
      title: 'Insights',
    },
  ];

  if (!isSeatCover) {
    mainTabs.splice(
      0,
      0,
      {
        title: 'Details',
      },
      {
        title: 'Reviews',
      },
      {
        title: 'Q&A',
      }
    );
  }

  if (isSeatCover) {
    mainTabs.splice(
      0,
      0,
      {
        title: 'Details',
      },
      {
        title: 'Reviews',
      }
    );
    mainTabs.splice(mainTabs.length - 1, 1);
  }

  const determineTabIndex = (currentTop: number, nextTop: number) => {
    if (window) {
      if (window.scrollY < lastScrollY) {
        scrollDirection = 'up';
      } else {
        scrollDirection = 'down';
      }
      lastScrollY = window.scrollY;

      if (
        scrollDirection === 'down' &&
        mainTabs[currentTabIndex + 1] &&
        window.scrollY > Number(nextTop)
      ) {
        setCurrentTabIndex(currentTabIndex + 1);
      } else if (
        scrollDirection === 'up' &&
        currentTabIndex > 0 &&
        window.scrollY < Number(currentTop)
      ) {
        setCurrentTabIndex(currentTabIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (document) {
      setDefaultTabs(mainTabs);
      const tabsTopsObj: Record<string, number> = {
        'Shipping & Returns':
          (document.getElementById('Shipping & Returns')?.offsetTop as number) +
          queryOffset,
        Warranty:
          (document.getElementById('Warranty')?.offsetTop as number) +
          queryOffset,
        Insights:
          (document.getElementById('Insights')?.offsetTop as number) +
          queryOffset,
        Details:
          (document.getElementById('Details')?.offsetTop as number) +
          queryOffset,
        Reviews:
          (document.getElementById('Reviews')?.offsetTop as number) +
          queryOffset,
        'Q&A':
          (document.getElementById('Q&A')?.offsetTop as number) + queryOffset,
      };

      const logScroll = () => {
        const currentTitle = mainTabs[currentTabIndex].title;
        const nextTitle = mainTabs[currentTabIndex + 1]
          ? mainTabs[currentTabIndex + 1].title
          : mainTabs[currentTabIndex].title;
        const currentTop = tabsTopsObj[currentTitle];
        const nextTop = tabsTopsObj[nextTitle];
        determineTabIndex(currentTop, nextTop);
      };
      if (document) {
        document.addEventListener('scroll', logScroll);
      }
      return () => {
        if (document) {
          document.removeEventListener('scroll', logScroll);
        }
      };
    }
  }, [document, currentTabIndex]);

  const handleSelectTab = (title: string, index: number) => {
    setCurrentTabIndex(index);
    if (document) {
      const el = document.getElementById(title);
      const elTop = el?.offsetTop;
      window.scrollTo({
        top: (elTop as number) + queryOffset,
        behavior: 'instant',
      });
    }
  };

  return (
    <>
      <div
        id="Extra-Details-Tabs"
        className="no-scrollbar sticky top-[-1px] z-[2] flex items-center justify-items-center overflow-x-auto bg-white lg:w-full "
      >
        {defaultTabs.map(({ title, jsx }, index) => (
          <button
            key={`Extra-Details-Tab-${index}`}
            onClick={() => handleSelectTab(title, index)}
            className={` flex w-full items-center whitespace-nowrap px-2 py-2 text-[16px] text-[#767676] max-lg:min-w-max ${currentTabIndex === index ? 'border-b-2 border-b-[#BE1B1B] font-[700] text-[#BE1B1B]' : 'font-[400]'}`}
          >
            <div className="flex w-full grow justify-center  px-2 py-1  ">
              {title}
            </div>
          </button>
        ))}
      </div>
      <div>
        <div id="Details">
          {!isSeatCover ? <VehicleCoverDetails /> : <SeatCoverDetails />}
        </div>
        <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />
        <div id="Reviews">
          {isSeatCover ? (
            <SeatCoverReviewSection showHeader={false} />
          ) : (
            <ReviewSection showHeader />
          )}
        </div>
        <div id="Q&A">
          <QuestionsAccordion />
        </div>
        <div id="Shipping & Returns">
          <ShippingPolicyContent showTabs={false} />
        </div>

        <div id="Warranty">
          <WarrantyPolicyContent showTabs={false} />
        </div>

        {!isSeatCover && (
          <div id="Insights">
            <InsightsTab />
          </div>
        )}
      </div>
    </>
  );
}
