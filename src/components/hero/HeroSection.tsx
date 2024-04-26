import { HeroDropdown } from './dropdown/HeroDropdown';
import HeroImage from './HeroImage';
const HeroSection = () => {
  return (
    <section className="flex h-full  min-w-[343px] flex-col items-center px-4   lg:justify-center lg:px-0">
      <div className="relative w-full  flex-col  ">
        <HeroImage />
        <div className="absolute bottom-0 w-full flex-col justify-center pb-2 text-center">
          <h1 className="mb-1 text-[14px] font-[500] uppercase leading-[16px] tracking-wider text-white lg:my-2 lg:text-[28px] lg:font-[500] lg:leading-[39px]">
            #1 Rated Car Cover in the USA
          </h1>
          <p className="text-[22px] font-black uppercase leading-[22px] tracking-wide text-white lg:my-2 lg:text-[55px] lg:leading-[55px]">
            Select your Vehicle
          </p>
          <div id="desktop-filter" className="z-[2] my-4 px-4">
            <HeroDropdown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
