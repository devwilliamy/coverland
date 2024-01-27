import TrustBannerBackground from '@/images/trust-banner/trust-banner-background-optimized.png';
import GoogleFiveStar from '@/images/trust-banner/google-banner.png';
import BBB from '@/images/trust-banner/BBB-Rating.png';
import Image from 'next/image';

const TrustBanner = () => {
  return (
    <span className="relative flex max-h-[260px] flex-col items-center justify-end overflow-hidden bg-[#404040] pt-[110px]">
      <Image src={TrustBannerBackground} alt="Trust Banner Background" />
      <div className="absolute top-0 flex h-full w-full items-center justify-between gap-[63px] bg-[#404040] px-[210px] opacity-[90%] ">
        <Image src={BBB} alt="Accredited Buisness Rating" />
        <p className="whitespace-nowrap break-keep text-[40px] font-black uppercase text-white">
          20-years of trust
        </p>
        <div className="">
          <Image
            src={GoogleFiveStar}
            className="flex max-h-[120px] max-w-[188px]"
            alt="Google Five Star Rating"
          />
        </div>
      </div>
    </span>
  );
};

export default TrustBanner;
