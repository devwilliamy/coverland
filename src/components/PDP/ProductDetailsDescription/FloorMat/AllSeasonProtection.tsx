import Image from 'next/image';
import AllSeasonProtectionImage from '@/public/images/PDP/floor-mats/all-season-protection.webp';
import AllSeasonIcons from './AllSeasonIcons';

export default function AllSeasonProtection() {
  return (
    <section className="flex w-full flex-col items-center bg-[#1A1A1A] text-center">
      <div className="pb-[20px] pt-[43px] lg:pb-[20px] lg:pt-[66px]">
        <p className="text-[26px] font-medium leading-[32px] text-white lg:text-[45px] lg:leading-[32px]">
          All Season Weather <br />
          Year-Round Protection
        </p>
        <div className="flex flex-col items-center pb-[28px] pt-7 text-[14px] font-[500] leading-[24px] text-[#D3D3D3]">
          <div className="flex items-end gap-1">
            <p>Resistant to</p>
            <TextWithDot text="Ice" />
            <TextWithDot text="Salt" />
            <TextWithDot text="Sand" />
            <TextWithDot text="Mud" />
            <TextWithDot text="Heat" />
            <p>And More!</p>
          </div>
          <p>Fuel Your Adventures with Coverland!</p>
        </div>
      </div>
      <Image
        alt="all-season-protection"
        src={AllSeasonProtectionImage}
        width={343}
        height={257}
        className="w-full overflow-hidden rounded-lg px-4 lg:max-h-[328px]  lg:max-w-[621px] "
      />
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
