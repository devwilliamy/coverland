'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import StickyTabBar from './StickyTabBar';
import ReviewSection from './ReviewSection';
import InsightsTab from './InsightsTab';
import SeatCoverDetails from '@/app/(main)/seat-covers/components/SeatCoverDetails';
import VehicleCoverDetails from '@/app/(main)/[productType]/components/VehicleCoverDetails';
import { Separator } from '@/components/ui/separator';
import ShippingPolicyContent from '@/components/policy/ShippingPolicyContent';
import WarrantyPolicyContent from '@/components/policy/WarrantyPolicyContent';
import { QuestionsAccordion } from '../QuestionsAccordion';
import useDetermineType from '@/hooks/useDetermineType';
import FloorMatDetails from '../ProductDetailsDescription/FloorMat/FloorMatDetails';

type TabsObj = {
  title: string;
};

export default function ExtraDetailsTabs() {
  const { isSeatCover, isFloorMat } = useDetermineType();
  const isSmall = useMediaQuery('(max-width: 768px)');
  const isMedium = useMediaQuery('(max-width: 1024px)');

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [defaultTabs, setDefaultTabs] = useState<TabsObj[]>([]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const calcOffset = () => {
    if (isSeatCover) return -45;
    if (isSmall) return 70;
    if (isMedium) return 200;
    return 195;
  };

  const queryOffset = calcOffset();

  useEffect(() => {
    const mainTabs: TabsObj[] = [
      { title: 'Shipping & Returns' },
      { title: 'Warranty' },
      { title: 'Insights' },
    ];

    if (isSeatCover) {
      mainTabs.splice(mainTabs.length - 1, 1);
      mainTabs.unshift(
        { title: 'Details' },
        { title: 'Reviews' },
        { title: 'Q&A' }
      );
    } else if (isFloorMat) {
      mainTabs.splice(mainTabs.length - 1, 1);
      mainTabs.unshift({ title: 'Details' });
    } else {
      mainTabs.unshift(
        { title: 'Details' },
        { title: 'Reviews' },
        { title: 'Q&A' }
      );
    }

    setDefaultTabs(mainTabs);
  }, [isSeatCover]);

  const handleSelectTab = (title: string, index: number) => {
    setCurrentTabIndex(index);
    const el = sectionRefs.current[title];
    if (el) {
      window.scrollTo({
        top: el.offsetTop + queryOffset,
        behavior: 'instant',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY - queryOffset;

      const offsetPositions = defaultTabs.map((tab) => {
        const el = sectionRefs.current[tab.title];
        return el ? el.offsetTop : 0;
      });

      for (let i = 0; i < offsetPositions.length; i++) {
        // The entire condition checks if the current scroll position is within section i
        if (
          // Checks if the current scroll position is below or at the top of section i.
          // This means the user has scrolled past the start of section i.
          scrollPosition >= offsetPositions[i] &&
          // Chekc last section OR Checks if the current scroll position is above the start of the next section.
          (i === offsetPositions.length - 1 ||
            scrollPosition < offsetPositions[i + 1])
        ) {
          if (currentTabIndex !== i) {
            setCurrentTabIndex(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [defaultTabs, queryOffset, currentTabIndex]);

  const ProductDetails = isSeatCover ? (
    <SeatCoverDetails />
  ) : isFloorMat ? (
    <FloorMatDetails />
  ) : (
    <VehicleCoverDetails />
  );

  return (
    <>
      <StickyTabBar
        tabs={defaultTabs}
        currentTabIndex={currentTabIndex}
        onSelectTab={handleSelectTab}
      />
      <div>
        <div id="Details" ref={(el) => (sectionRefs.current['Details'] = el)}>
          {/* Refactor TODO: This can be passed in */}
          {ProductDetails}
        </div>
        {!isFloorMat && (
          <>
            <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />
            <div
              id="Reviews"
              ref={(el) => (sectionRefs.current['Reviews'] = el)}
            >
              <ReviewSection showHeader />
            </div>
          </>
        )}
        {!isFloorMat && (
          <>
            <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />
            <div id="Q&A" ref={(el) => (sectionRefs.current['Q&A'] = el)}>
              <QuestionsAccordion />
            </div>
          </>
        )}

        <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />
        <div
          id="Shipping & Returns"
          ref={(el) => (sectionRefs.current['Shipping & Returns'] = el)}
        >
          <ShippingPolicyContent showHeader={false} />
        </div>
        <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />

        <div id="Warranty" ref={(el) => (sectionRefs.current['Warranty'] = el)}>
          <WarrantyPolicyContent showHeader={false} />
        </div>

        {!isSeatCover && (
          <>
            <Separator className="h-5 border-y-[1px] border-y-[#DADADA] bg-[#F1F1F1] lg:h-10" />
            <div
              id="Insights"
              ref={(el) => (sectionRefs.current['Insights'] = el)}
            >
              <InsightsTab />
            </div>
          </>
        )}
      </div>
    </>
  );
}
