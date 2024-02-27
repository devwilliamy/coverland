import Image from 'next/image';
import Climate from '@/images/PDP/climate_crisis.webp';
import logoWhite from '@/images/logos/logo-white.png';

export function ClimateCrisis() {
  return (
    <div className="relative w-full">
      <div className="-z-0">
        <Image
          alt="product"
          src={Climate}
          placeholder="blur"
          quality={75}
          className="w-full object-cover"
        />
      </div>
      <div className="absolute left-2.5 top-2.5 flex  w-auto flex-col items-stretch gap-5 md:left-[57px] md:top-[84px]">
        <p className="text-left text-lg font-[400] capitalize tracking-[0.48px] text-white md:text-2xl">
          Protect your car with confidence
        </p>
        <p className="text-left font-black uppercase leading-tight tracking-[1.35px] text-white sm:text-xl md:text-3xl lg:text-5xl">
          safeguard Against <br className="hidden md:block" /> climate crisis
        </p>
      </div>

      <Image
        alt="white-coverland-logo"
        src={logoWhite}
        className="absolute bottom-[60px] left-[55px] min-h-[42px] min-w-[230px] "
      />
      {/* <div className="absolute bottom-2.5 left-2.5 w-3/4 bg-[#1A1A1A] p-2 leading-normal md:bottom-[57px] md:left-[57px] md:w-[515px] md:p-5">
        <p className="text-sm font-normal text-white md:text-xl">
          From snowstorms to downpours,
          <br /> our car covers guarantee year-round protection providing
          top-notch car care in any weather.
        </p>
      </div> */}
    </div>
  );
}
