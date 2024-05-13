'use client';
import FeaturedThumbnail from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-thumbnail.webp';
import SeatVideo from '@/videos/ov-front-seat-cover.mp4';
import ProductVideo from '@/components/PDP/ProductVideo';
import SeatDesktopGallery from './SeatDesktopGallery';
import FeatureImage from './FeatureImage';

export default function DesktopImageDisplay() {
  return (
    <span className="flex w-1/2 flex-col gap-[18px] max-lg:hidden">
      <FeatureImage />
      {/* <div className="hidden h-full w-full object-cover lg:flex">
        <ProductVideo
          src={SeatVideo}
          aspectRatio="16/9"
          imgSrc={FeaturedThumbnail}
        />
      </div> */}
      <SeatDesktopGallery />
    </span>
  );
}
