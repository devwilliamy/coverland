import React from 'react';
import DetailsTabHeader from '../../[productType]/components/DetailsTabHeader';
import ElevateComfortSection from './ElevateComfortSection';
import StayNewSection from './StayNewSection';
import SafetyFirstSection from './SafetyFirstSection';
import EnhancedPerformanceSection from './EnhancedPerformanceSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';

export default function SeatCoverDetails() {
  return (
    <div className='flex w-full flex-col'>
      <div className="flex w-full lg:hidden">
        <DetailsTabHeader submodel="Super Crew Cap" />
      </div>
      <ElevateComfortSection />
      <StayNewSection />
      <SafetyFirstSection />
      <EnhancedPerformanceSection />
      <WarrantySection />
    </div>
  );
}
