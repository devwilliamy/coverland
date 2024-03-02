'use client';
import { useState } from 'react';
import SeatCoverCarousel from './components/SeatCoverCarousel';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import ElevateComfortSection from './components/ElevateComfortSection';
import NonCompatibleMobile from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/non-compatible-features.webp';
import NonCompatibleDesktop from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/non-compatible-desktop.webp';
import CompatibleVehiclesCarousel from './components/CompatibleVehiclesCarousel';
import LifetimeSection from '@/components/PDP/components/LifetimeSection';
import { SeatData, SeatImageDataObject } from './util';
import FeaturedCover from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-cover.webp';
import FeaturedThumbnail from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-thumbnail.webp';
import SeatContent from './components/SeatContent';
import SeatDesktopGallery from './components/SeatDesktopGallery';
import img1 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-1.webp';
import img2 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-2.webp';
import img3 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-3.webp';
import { Button } from '@/components/ui/button';

// ___________ Leaving these in because we need them later ______________________
// import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
// import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';
// ______________________________________________________________________________
const galleryImages = [img1, img2, img3];

export default function SeatCovers() {
  const isMobile = useMediaQuery('max-width: 1024px');
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<SeatData>(
    SeatImageDataObject.BlackRedData
  );
  const [showMore, setShowMore] = useState(false);

  const NonCompatibleImage = isMobile
    ? NonCompatibleMobile
    : NonCompatibleDesktop;

  return (
    <section className="flex flex-col pt-[22px]">
      <p className="w-full pb-[43px] text-[14px] leading-[15px]">
        <a href="/">Home</a> / Seat Cover
      </p>
      <SeatCoverCarousel />
      <section className="flex h-max w-full lg:gap-[60px]">
        <div className="mb-[18px] flex  w-1/2 flex-col gap-[18px] max-lg:hidden">
          <Image
            id="featured-image"
            src={FeaturedCover}
            alt="a car with a car cover on it"
            className="hidden h-full w-full object-cover lg:flex"
            priority
          />
          <Image
            id="featured-video"
            src={FeaturedThumbnail}
            alt="a car with a car cover on it"
            className="hidden h-full w-full object-cover lg:flex"
            priority
          />
          <SeatDesktopGallery seatImages={galleryImages} showMore={showMore} />
          <Button
            className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
            onClick={() => setShowMore((p) => !p)}
          >
            {showMore ? 'show less images' : 'show more images'}
          </Button>
        </div>
        <SeatContent
          setSelectedColor={setSelectedColor}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
      </section>

      <ElevateComfortSection selectedColor={selectedColor} />
      <section className="flex w-full flex-col items-center justify-center bg-white pt-[60px]">
        <p className="flex w-full items-center justify-center pb-7 text-center text-[26px] font-[700] leading-[26px]  lg:pb-[32px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
          Product Size
        </p>
        <Image
          alt="seat-dimensions"
          src={selectedColor?.[6]}
          className="mb-[70px] h-[545px] w-[365px] max-lg:h-[432px] max-lg:w-[266px] "
        />
        <p className="w-full pb-[28px] text-center  text-[26px] font-[700] leading-[26px] lg:pb-[49px] lg:text-[45px] lg:leading-[26px]">
          Compatible Vehicles
        </p>
        <CompatibleVehiclesCarousel />
        <Image
          alt="non-compatible-features"
          src={NonCompatibleImage}
          className="pt-[60px] max-lg:px-[27px] "
        />
      </section>
      <LifetimeSection />
      {/* <SuggestedProducts /> */}
      {/* <ExtraDetailsTabs /> */}
    </section>
  );
}
