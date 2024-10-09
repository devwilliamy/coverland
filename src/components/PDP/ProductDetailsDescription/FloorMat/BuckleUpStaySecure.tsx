import Image from 'next/image';
import BuckleUpStaySecureImage from '@/public/images/PDP/floor-mats/buckle-up-stay-secure.webp';
export default function BuckleUpStaySecure() {
  return (
    <section className="w-full ">
      <div className="bg-[#1A1A1A]">
        <h2 className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
          Buckle Up, Stay secured
        </h2>
        <div className="pt-[10px]">
          <p className="text-center text-sm font-light text-[#D3D3D3]">
            No More Sliding - Snap-in Buckles <br />
            Keep Mats Securely Anchored
          </p>
        </div>
      </div>
      <span className="grid max-w-[840px] grid-cols-2 grid-rows-2 justify-center justify-items-stretch gap-[22px] bg-[#1A1A1A] pt-[34px]  max-lg:grid-cols-1 ">
        <div className="flex flex-col items-center bg-white text-center text-white">
          <Image
            alt={`perfect-custom-fit`}
            width={375}
            height={516}
            src={BuckleUpStaySecureImage}
            className="min-w-full lg:max-h-[221px] lg:max-w-[420px]"
          />
        </div>
      </span>
    </section>
  );
}
