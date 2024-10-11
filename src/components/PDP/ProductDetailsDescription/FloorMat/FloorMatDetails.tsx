import React from 'react';
// import ElevateComfortSection from './ElevateComfortSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import { useParams } from 'next/navigation';
import ProductVideo from '@/components/PDP/ProductVideo';
import F150Install from '@/videos/F-150 Installation Video.mp4';
import TruckThumbnail from '@/images/PDP/seat-covers-v2/Truck Installation Thumbnail.webp';
import F150Thumbnail from '@/images/PDP/seat-covers-v2/F-150 Installation Thumbnail.webp';
import TruckInstallSmall from '@/videos/Seat Cover Installation_400.mp4';
import DetailsTabHeader from '@/app/(main)/[productType]/components/DetailsTabHeader';
import PerfectCustomFit from './PerfectCustomFit';
import BuckleUpStaySecure from './BuckleUpStaySecure';
import StepInWithConfidence from './StepInWithConfidence';
import AllSeasonProtection from './AllSeasonProtection';
import StayLookingClean from './StayLookingClean';
import SafeForFamily from './SafeForFamily';
import YourAdventure from './YourAdventure';

const FloorMatDetails = React.memo(() => {
  const params = useParams();
  const isFordF1502015 =
    params?.make === 'ford' &&
    params?.model === 'f-150' &&
    params?.year === '2015-2024';

  const installVideo = isFordF1502015 ? F150Install : TruckInstallSmall;
  const installThumbnail = isFordF1502015 ? F150Thumbnail : TruckThumbnail;
  // Refactor TODO: Not sure but maybe Details can just take in childreN?
  return (
    <div className="flex w-full flex-col">
      {isFordF1502015 && (
        <div className="flex w-full lg:hidden">
          <DetailsTabHeader />
        </div>
      )}
      <PerfectCustomFit />
      <BuckleUpStaySecure />
      <StepInWithConfidence />
      <AllSeasonProtection />
      <StayLookingClean />
      <SafeForFamily />
      <YourAdventure/>
      <WarrantySection />
    </div>
  );
});

export default FloorMatDetails;
