import React from 'react';
import DetailsTabHeader from '../../[productType]/components/DetailsTabHeader';
import ElevateComfortSection from './ElevateComfortSection';
import StayNewSection from './StayNewSection';
import SafetyFirstSection from './SafetyFirstSection';
import EnhancedPerformanceSection from './EnhancedPerformanceSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import { useParams } from 'next/navigation';

export default function SeatCoverDetails() {
  const params = useParams();
  const isFordF1502015 =
    params?.make === 'ford' &&
    params?.model === 'f-150' &&
    params?.year === '2015-2024';

  return (
    <div className="flex w-full flex-col">
      {isFordF1502015 && (
        <div className="flex w-full lg:hidden">
          <DetailsTabHeader />
        </div>
      )}

      <ElevateComfortSection showBanner={isFordF1502015} />
      <StayNewSection />
      <SafetyFirstSection />
      <EnhancedPerformanceSection />
      <WarrantySection />
    </div>
  );
}
