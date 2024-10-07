import { SelectedProductImages } from './SelectedProductImages';
import dynamic from 'next/dynamic';
import FeatureImage from './FeatureImage';

const MobileImageCarousel = dynamic(() => import('./MobileImageCarousel'), {
  loading: () => <div className="h-[500px]"></div>,
});

export function PrimaryImageDisplay() {
  return (
    <div className="-ml-4 flex  w-screen flex-col items-stretch justify-center lg:w-3/5 lg:pb-0 ">
      <div className="relative mb-4 flex h-full w-full items-center justify-center bg-[#F2F2F2] lg:h-[650px] lg:rounded-xl">
        <MobileImageCarousel />
        <FeatureImage />
      </div>
      {/* Gallery Images */}
      <SelectedProductImages />
    </div>
  );
}
