import Image from 'next/image';
import PerfectCustomFitFloorMat from '@/public/images/PDP/floor-mats/perfect-custom-fit-small.webp';
export default function PerfectCustomFit() {
  return (
    <section className="w-full bg-[#1A1A1A]">
      <h2 className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white lg:pt-[110px] lg:text-[45px] lg:leading-[52px] ">
        The Perfect Custom Fit
      </h2>
      <div className="pt-[10px]">
        <p className="text-center text-sm font-light text-[#D3D3D3] lg:text-[28px] lg:font-light lg:leading-9">
          3D Engineered For Precise Fit <br />
          To Every Curve And Corner
        </p>
      </div>
      <section className="flex w-full flex-row justify-center pt-[34px] lg:pt-12 ">
        <div className="flex justify-center">
          <Image
            alt={`perfect-custom-fit`}
            width={873}
            height={652}
            src={PerfectCustomFitFloorMat}
            className="min-w-full lg:max-h-[652px] lg:max-w-[873px]"
          />
        </div>
      </section>
    </section>
  );
}
