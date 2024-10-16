import Image from 'next/image';
import AllSeasonProtectionImage from '@/public/images/PDP/floor-mats/all-season-protection.webp';
import AllSeasonIcons from './AllSeasonIcons';

export default function AllSeasonProtection() {
  return (
    <section className="flex w-full flex-col items-center bg-[#1A1A1A] pb-4 text-center">
      <div className="pb-[20px] pt-[43px] lg:pb-[20px] lg:pt-[110px]">
        <p className="text-[26px] font-medium leading-[32px] text-white lg:text-[45px] lg:leading-[56px]">
          All Season Weather <br />
          Year-Round Protection
        </p>
        <div className="flex flex-col items-center pb-[28px] pt-7 text-[14px] font-[500] leading-[24px] text-[#D3D3D3] lg:text-[28px] lg:leading-9">
          <div className="flex items-end gap-1">
            <p>Resistant to</p>
            <TextWithDot text="Ice, " />
            <TextWithDot text="Salt, " />
            <TextWithDot text="Sand, " />
            <TextWithDot text="Mud, " />
            <TextWithDot text="Heat, " />
            <p>And More!</p>
          </div>
          <p>Fuel Your Adventures with Coverland!</p>
        </div>
      </div>
      <div className="px-4">
        <div className="w-full overflow-hidden rounded-lg lg:max-h-[654px] lg:max-w-[873px]">
          <Image
            alt="all-season-protection"
            src={AllSeasonProtectionImage}
            width={873}
            height={654}
            className="w-full"
          />
        </div>
      </div>
      <AllSeasonIcons />
    </section>
  );
}

const TextWithDot = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex h-[3px] w-[3px] rounded-full bg-[#F27474]" />
    <p className="text-[#F27474]">{text}</p>
  </div>
);
