'use client';
import SeatDesktopGallery from './SeatDesktopGallery';
import FeatureImage from './FeatureImage';

export default function DesktopImageDisplay() {
  return (
    <span className="flex w-1/2 flex-col gap-[18px] max-lg:hidden">
      <FeatureImage />
      <SeatDesktopGallery />
    </span>
  );
}
