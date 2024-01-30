import TrustBannerBackground from '@/images/trust-banner/trust-banner-background-optimized.png';
import GoogleFiveStar from '@/images/trust-banner/google-banner-2.svg';
import BBB from '@/images/trust-banner/BBB-Rating.png';
import Image from 'next/image';
import TrustBannerBackgroundMobile from '@/images/trust-banner/trust-banner-bg-mobile.svg';

const TrustBanner = () => {
  return (
    <span className="relative flex max-h-[492px] min-h-[492px] flex-col items-center justify-end overflow-hidden bg-[#404040] pt-[110px] lg:max-h-[260px]">
      <Image
        src={TrustBannerBackground}
        className="hidden max-h-[200px] object-cover lg:flex"
        fill
        alt="Trust Banner Background"
      />
      <Image
        src={TrustBannerBackgroundMobile}
        className="object-cover"
        fill
        alt="Trust Banner Background"
      />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center bg-[#404040]/90  lg:flex-row lg:gap-[63px] lg:px-[210px] ">
        <p className="mb-[56px] mt-[60px]  whitespace-nowrap break-keep text-[24px] font-black uppercase   text-white lg:order-2 lg:my-0 lg:text-[40px]">
          20-years of trust
        </p>
        <Image
          src={BBB}
          alt="Accredited Buisness Rating "
          className="mb-[28px] max-h-[111px] max-w-[159px] lg:mb-0 lg:h-auto lg:w-auto"
        />
        <div className="flex flex-col items-center">
          <Image
            src={GoogleFiveStar}
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
