import PolicyBanner from '@/images/policies/banner.webp';
import Image from 'next/image';

const PolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tracking-wide">
      <div className="relative">
        <p
          className="absolute flex h-full w-full 
        items-center p-[4vw] text-3xl font-black italic
        text-white 
        "
        >
          POLICY
        </p>
        <Image
          className="w-full object-cover sm:h-[10vh] md:h-[15vh] lg:h-full"
          alt="policies banner"
          src={PolicyBanner}
        />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default PolicyLayout;
