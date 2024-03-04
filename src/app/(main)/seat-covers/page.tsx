'use client';
import { useState } from 'react';
import SeatCoverCarousel from './components/SeatCoverCarousel';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import ElevateComfortSection from './components/ElevateComfortSection';
import NonCompatibleMobile from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/non-compatible-features.webp';
import NonCompatibleDesktop from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/non-compatible-desktop.webp';
import CompatibleVehiclesCarousel from './components/CompatibleVehiclesCarousel';
import { SeatData, SeatImageDataObject } from './util';
import FeaturedCover from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-cover.webp';
import FeaturedThumbnail from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-thumbnail.webp';
import SeatContent from './components/SeatContent';
import SeatDesktopGallery from './components/SeatDesktopGallery';
import img1 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-1.webp';
import img2 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-2.webp';
import img3 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/gallery-img-3.webp';
import { Button } from '@/components/ui/button';
import WarrantySection from '@/components/PDP/components/WarrantySection';

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
    <section className="flex w-full flex-col items-center pt-[22px]">
      <p className="w-full px-[2dvw] pb-3.5 text-[14px] leading-[15px] lg:pb-[43px]">
        <a href="/">Home</a> / Seat Cover
      </p>
      <SeatCoverCarousel />
      <section className="flex h-max w-full px-[2dvw] lg:gap-[60px]">
        <span className="mb-[18px] flex  w-1/2 flex-col gap-[18px] max-lg:hidden">
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
        </span>
        <SeatContent
          setSelectedColor={setSelectedColor}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
      </section>

      <ElevateComfortSection selectedColor={selectedColor} />
      <section className="flex w-full  flex-col  items-center justify-center bg-white pt-[60px] max-md:px-[4%] lg:max-w-[580px]">
        <p className="flex w-full items-center justify-center pb-7 text-center text-[26px] font-[700] leading-[26px]  md:pb-[32px] md:pt-[60px] md:text-[45px]  md:leading-[26px]">
          Product Size
        </p>
        <Image
          alt="seat-dimensions"
          src={selectedColor?.[6]}
          className="pl-[45px] lg:pl-[30px]"
          // className="mb-[70px] h-[545px] w-[365px] max-md:h-[432px] max-md:w-[266px] "
        />
        <p className="w-full pb-[28px] pt-[60px] text-center text-[26px] font-[700] leading-[26px] lg:pb-[49px] lg:pt-[110px] lg:text-[45px] lg:leading-[26px]">
          Compatible Vehicles
        </p>
        <CompatibleVehiclesCarousel />
        <Image
          alt="non-compatible-features"
          src={NonCompatibleImage}
          className="flex w-full pt-[48px] max-md:px-7 max-md:pt-[60px] "
        />
      </section>
      <WarrantySection />
      {/* <SuggestedProducts /> */}
      {/* <ExtraDetailsTabs /> */}
    </section>
  );
}
