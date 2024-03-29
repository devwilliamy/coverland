import { GrayDualArrow } from '@/components/PDP/icons/GrayDualArrow';
import { GrayShieldCheck } from '@/components/PDP/icons/GrayShieldCheck';
import { GrayWrench } from '@/components/PDP/icons/GrayWrench';
import Image, { StaticImageData } from 'next/image';
import { SeatData } from '../util';
import Couch from '@/components/PDP/icons/Couch';
import ElevateHeader from '@/images/PDP/seat-covers-v2/custom-for.webp';
import EveryAngle1 from '@/images/PDP/seat-covers-v2/every-angle-1.webp';
import EveryAngle2 from '@/images/PDP/seat-covers-v2/every-angle-2.webp';
import EveryMile1 from '@/images/PDP/seat-covers-v2/every-mile-1.webp';
import EveryMile2 from '@/images/PDP/seat-covers-v2/every-mile-2.webp';
import EveryMile3 from '@/images/PDP/seat-covers-v2/every-mile-3.webp';
import EveryMile4 from '@/images/PDP/seat-covers-v2/every-mile-4.webp';

export default function ElevateComfortSection() {
  // Add as props
  // {  seatData, }: {seatData: SeatData;}

  // const [protectionData, setProtectionData] = useState<
  //   {
  //     image: StaticImageData;
  //     title: string;
  //     description: string;
  //   }[]
  // >([]);
  // useEffect(() => {
  //   setProtectionData([
  //     {
  //       image: seatData?.[2] as StaticImageData,
  //       title: 'Drive in Comfort',
  //       description: 'High-quality, Durable, and Easy-to-Clean Material',
  //     },
  //     {
  //       image: seatData?.[3] as StaticImageData,
  //       title: 'Breathable Design',
  //       description: `Perforated Leather to stay cool in any ride`,
  //     },
  //     {
  //       image: seatData?.[4] as StaticImageData,
  //       title: 'Perfect Fit in Minutes',
  //       description: 'Semi-Custom Look, Effortless to Install and Maintain',
  //     },
  //     {
  //       image: seatData?.[5] as StaticImageData,
  //       title: 'Airbag Compatible ',
  //       description: 'Safety, seamlessly integrated',
  //     },
  //   ]);
  // }, [seatData]);

  const threeIcons = [
    { title: 'Custom Fit', icon: <GrayDualArrow /> },
    { title: 'Unlimited Comfort', icon: <Couch /> },
    { title: 'Easy Install', icon: <GrayWrench /> },
  ];

  const everyAngle = [EveryAngle1, EveryAngle1];
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

  // const HeaderSeat = seatData[1];

  return (
    <section className="relative flex w-full flex-col items-center bg-[#1A1A1A] pb-[34px] capitalize lg:mt-[42px] ">
      <p className="flex w-full items-center justify-center pb-[34px] pt-[43px] text-center text-[26px] font-[500] leading-[26px] text-white lg:pb-[38px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Elevate Comfort And Style
      </p>
      <div className="flex w-screen max-w-[850px] items-center justify-center lg:w-full ">
        <Image
          alt="product-content-seat-header"
          src={ElevateHeader}
          className="flex "
        />
      </div>

      <span className="mt-[30px] grid grid-cols-3 items-center justify-center gap-[30px] lg:gap-[120px]">
        {threeIcons.map(({ title, icon }, index) => (
          <div key={title+index} className="flex flex-col items-center ">
            <div className="flex max-h-[58px] min-h-[58px] max-w-[58px] lg:max-h-[100px] lg:min-h-[100px] lg:max-w-[100px] ">
              {icon}
            </div>
            <p className="whitespace-nowrap pt-1.5 text-[14px] leading-[16px] text-white lg:text-[18px] lg:leading-[21px] ">
              {title}
            </p>
          </div>
        ))}
      </span>

      <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
        Style In Every Angle
      </p>
      <span className="flex w-full flex-col pt-[38px] lg:grid lg:grid-cols-2 lg:justify-center lg:gap-0 ">
        {everyAngle.map((img, index) => (
          <div key={img.src+index} className=" text-center text-white max-lg:px-4">
            {img && (
              <Image
                alt="enhanced-item"
                src={img}
                className="w-full  lg:h-[221px] lg:w-[420px]"
              />
            )}
          </div>
        ))}
      </span>

      <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
        Comfort in Every Mile
      </p>
      <span className="flex w-full flex-col pt-[38px] lg:grid lg:grid-cols-2 lg:justify-center lg:gap-0 ">
        {everyMile.map(({ img, title, description }) => (
          <div key={img.src} className=" text-center text-white max-lg:px-4">
            {img && (
              <Image
                alt="enhanced-item"
                src={img}
                className="w-full lg:h-[221px] lg:w-[420px]"
              />
            )}
            <p className="pt-[18px] text-[22px]  font-[500] leading-[25px] ">
              {title}
            </p>
            <p className=" pt-1.5 text-[14px] leading-[26px] text-[#D3D3D3] lg:text-[16px] lg:leading-[18px] ">
              {description}
            </p>
          </div>
        ))}
      </span>
    </section>
  );
}
