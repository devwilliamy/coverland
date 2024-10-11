import Image from 'next/image';
import BuckleUpStaySecureImage from '@/public/images/PDP/floor-mats/buckle-up-stay-secure.webp';
export default function BuckleUpStaySecure() {
  return (
    <section className="w-full bg-[#1A1A1A] pb-[60px]">
      <h2 className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white lg:pt-[110px] lg:text-[45px] lg:leading-[52px] ">
        Buckle Up, Stay secured
      </h2>
      <div className="pt-[10px]">
        <p className="text-center text-sm font-light text-[#D3D3D3] lg:text-[28px] lg:font-normal lg:leading-9">
          No More Sliding - Snap-in Buckles <br />
          Keep Mats Securely Anchored
        </p>
      </div>
      <section className="flex w-full flex-row justify-center pt-[34px] lg:pt-12 ">
        <div className="flex justify-center">
          <Image
            alt={`perfect-custom-fit`}
            width={889}
            height={1022}
            src={BuckleUpStaySecureImage}
            className="min-w-full lg:max-h-[1022px] lg:max-w-[889px]"
          />
        </div>
      </section>
    </section>
  );
}
