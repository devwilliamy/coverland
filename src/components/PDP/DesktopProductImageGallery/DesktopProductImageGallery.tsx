'use client';

import GalleryFeatureImage from "./GalleryFeatureImage";
import GalleryImageGrid from "./GalleryImageGrid";

export default function DesktopProductImageGallery() {
  return (
    <span className="flex w-1/2 flex-col gap-[18px] max-lg:hidden">
      <GalleryFeatureImage />
      <GalleryImageGrid />
    </span>
  );
}
