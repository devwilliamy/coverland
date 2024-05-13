import { GrayDualArrow } from '@/components/PDP/icons/GrayDualArrow';
import { GrayShieldCheck } from '@/components/PDP/icons/GrayShieldCheck';
import { GrayWrench } from '@/components/PDP/icons/GrayWrench';
import Image, { StaticImageData } from 'next/image';
import { SeatData } from '../util';
import Video360 from '@/videos/seat-covers-360.mp4';
import seat360_4_3 from '@/videos/seat-covers-360-4_3.mp4';
import Couch from '@/components/PDP/icons/Couch';
import ElevateHeaderImage from '@/images/PDP/seat-covers-v2/custom-for.webp';
import Seat360 from '@/images/PDP/seat-covers-v2/custom-for.webp';
import ElevateHeaderVideo from '@/videos/seat-covers-header-video.mp4';
import EveryAngle1 from '@/images/PDP/seat-covers-v2/every-angle-1.webp';
import EveryAngle2 from '@/images/PDP/seat-covers-v2/every-angle-2.webp';
import EveryMile1 from '@/images/PDP/seat-covers-v2/every-mile-1.webp';
import EveryMile2 from '@/images/PDP/seat-covers-v2/every-mile-2.webp';
import EveryMile3 from '@/images/PDP/seat-covers-v2/every-mile-3.webp';
import EveryMile4 from '@/images/PDP/seat-covers-v2/every-mile-4.webp';
import DetailsTabHeader from '../../[productType]/components/DetailsTabHeader';
import CustomForText from './CustomForText';
import ProductVideo from '@/components/PDP/ProductVideo';

export default function ElevateComfortSection({
  showBanner,
}: {
  showBanner: boolean;
}) {
  const threeIcons = [
    { title: 'Custom Fit', icon: <GrayDualArrow /> },
    { title: 'Unlimited Comfort', icon: <Couch /> },
    { title: 'Easy Install', icon: <GrayWrench /> },
  ];

  const everyAngle = [EveryAngle1, EveryAngle2];
  const everyMile = [
    {
      img: EveryMile1,
      title: 'Built-in lumbar support',
      description: ' Mile After Mile of back support',
    },
    {
      img: EveryMile2,
      title: 'Memory Foam',
      description: 'Maximum Comfort with Memory Foam',
    },
    {
      img: EveryMile3,
      title: 'Breathable Cushion',
      description: 'Cool Comfort in Any Climate',
    },
    {
      img: EveryMile4,
      title: 'Top-Grade Leather',
      description: 'Durable Luxury with Premium Leather',
    },
  ];

  return (
    <section className="relative flex w-full flex-col items-center justify-center bg-[#1A1A1A] pb-[34px] capitalize lg:pt-[42px] ">
      {showBanner && (
        <div className="hidden w-full max-w-[840px] lg:flex">
          <DetailsTabHeader />
        </div>
      )}
      <CustomForText />
      <div className="flex w-screen max-w-[850px] items-center justify-center lg:w-full ">
        {/* <Image
          alt="product-content-seat-header"
          src={ElevateHeaderImage}
          className="flex min-w-full"
        /> */}
        <ProductVideo
          src={ElevateHeaderVideo}
          autoplay
          loop
          aspectRatio="4/3"
          controls={false}
        />
      </div>

      <span className="mt-[30px] grid grid-cols-3 items-center  justify-center gap-[30px] max-lg:max-w-[317px] lg:gap-[120px]">
        {threeIcons.map(({ title, icon }, index) => (
          <div key={title + index} className="flex flex-col items-center ">
            <div className="flex max-h-[58px] min-h-[58px] max-w-[58px] lg:max-h-[100px] lg:min-h-[100px] lg:max-w-[100px] ">
              {icon}
            </div>
            <p className="whitespace-nowrap pt-1.5 text-[14px] leading-[16px] text-white lg:text-[18px] lg:leading-[21px] ">
              {title}
            </p>
          </div>
        ))}
      </span>
      <div className=" flex w-full flex-col items-center px-4 ">
        <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
          Style In Every Angle
        </p>
        <span className="flex w-full max-w-[840px] flex-col pt-[38px] min-[450px]:grid min-[450px]:grid-cols-2 lg:justify-center lg:gap-0 ">
          <div
            className={`relative flex aspect-[4/3]  justify-start text-center text-white`}
          >
            <Image
              alt="enhanced-item"
              src={EveryAngle1}
              className=" flex w-full lg:max-w-[420px]"
            />
            <p className="absolute bottom-[22.5%] right-[22.5%] text-[10px] leading-[11px] text-white">
              360° Full <br /> Coverages
            </p>
          </div>
          <ProductVideo
            autoplay
            loop
            aspectRatio="4/3"
            controls={false}
            src={seat360_4_3}
          />
        </span>

        <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
          Comfort in Every Mile
        </p>
        <span className="grid max-w-[840px] grid-cols-2 grid-rows-2 justify-center justify-items-stretch gap-[22px] pt-[38px]  max-lg:grid-cols-1 ">
          {everyMile.map(({ img, title, description }, index) => (
            <div
              key={img.src}
              className="flex flex-col items-center text-center text-white "
            >
              {img && (
                <Image
                  alt={`every-mile-item-${index}`}
                  src={img}
                  className="min-w-full lg:max-h-[221px] lg:max-w-[420px]"
                />
              )}
              <p className="pt-[18px] text-[18px] font-[500]  leading-[25px] lg:text-[22px] ">
                {title}
              </p>
              <p className=" pt-1.5 text-[14px] leading-[16px] text-[#D3D3D3] lg:text-[16px] lg:leading-[18px] ">
                {description}
              </p>
            </div>
          ))}
        </span>
      </div>
    </section>
  );
}
