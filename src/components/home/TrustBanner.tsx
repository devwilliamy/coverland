import TrustBannerBackground from '@/images/trust-banner/trust-banner-background-optimized.png';
import GoogleFiveStar from '@/images/trust-banner/google-banner-2.svg';
import BBB from '@/images/trust-banner/BBB-Rating.png';
import Image from 'next/image';
import TrustBannerBackgroundMobile from '@/images/trust-banner/trust-banner-bg-mobile.svg';

const TrustBanner = () => {
  return (
    <span className="relative mx-[16px] flex max-h-[492px] min-h-[492px] flex-col items-center justify-end overflow-hidden pt-[110px] md:mx-0 md:max-h-[260px] md:min-h-[260px]">
      <Image
        src={TrustBannerBackgroundMobile}
        className="max-h-[492px] object-cover md:hidden"
        fill
        width={400}
        height={500}
        alt="Trust Banner Background"
      />
      <Image
        src={TrustBannerBackground}
        className="hidden max-h-[260px] object-cover md:flex"
        fill
        width={1280}
        height={260}
        alt="Trust Banner Background"
      />
      {/* Mobile */}
      <div className="absolute top-0 flex max-h-[492px] min-h-[492px] w-full flex-col items-center bg-[#404040]/90 pb-[65px] md:hidden  ">
        <p className="mb-[56px] mt-[80px] w-full whitespace-nowrap break-keep px-[56px] text-center text-[24px] font-black uppercase leading-[24px] tracking-wider  text-white  ">
          20-years of trust
        </p>
        <Image
          src={BBB}
          width={159}
          height={110}
          alt="Accredited Buisness Rating "
          className="mb-[28px] max-h-[111px] max-w-[159px] lg:mb-0 lg:h-auto lg:w-auto"
        />
        <div className="flex flex-col items-center">
          <Image
            src={GoogleFiveStar}
            width={159}
            height={101}
            className="flex max-h-[111px] max-w-[159px] "
            alt="Google Five Star Rating"
          />
          <div className="mt-[11px]  flex max-h-[121px] max-w-[149px] flex-col place-items-center">
            <div className="text-[20px] font-[500] uppercase leading-3 tracking-wide text-white">
              Five Star
            </div>
            <div className="mt-[7px] text-[10px] font-thin leading-3 tracking-wider text-white">
              Customer Rating
            </div>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="absolute top-0 hidden h-full max-h-[260px] w-full items-center justify-center bg-[#404040]/90 md:flex md:flex-row md:gap-[63px] lg:px-[210px] ">
        <Image
          src={BBB}
          width={220}
          height={153}
          alt="Accredited Buisness Rating "
          className=" h-[153px] max-h-[153px] w-[220px] max-w-[220px] "
        />
        <p className="mb-[56px] mt-[60px]  whitespace-nowrap break-keep text-[24px] font-black uppercase   text-white  lg:my-0 lg:text-[40px]">
          20-years of trust
        </p>
        <div className="flex flex-col items-center">
          <Image
            src={GoogleFiveStar}
            width={188}
            height={120}
            className="flex max-h-[95px] max-w-[149px] lg:max-h-[120px] lg:max-w-[188px]"
            alt="Google Five Star Rating"
          />
          <div className="mt-[11px] flex max-h-[121px] max-w-[149px] flex-col place-items-center">
            <div className="text-[20px] font-[700] uppercase leading-3 text-white">
              Five Star
            </div>
            <div className="mt-[7px] text-[10px] font-thin leading-3 text-white">
              Customer Rating
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default TrustBanner;
