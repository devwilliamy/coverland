'use client';
import Image from 'next/image';
import WhiteLayerMobile from '@/images/PDP/Product-Details-Redesign-2/white-layer-mobile.webp';
import WhiteLayerDesktop from '@/images/PDP/Product-Details-Redesign-2/white-layer-desktop.webp';
import FabricVid from '@/videos/fabric-matters-video.mp4';
import ProductVideo from '../ProductVideo';
import { useParams } from 'next/navigation';
const FabricMattersSection = () => {
  const params = useParams();
  const coverType = params?.coverType;
  const isDefault = coverType === 'premium-plus' || coverType === undefined;
  return (
    <div className="mt-[60px] w-full lg:mb-[60px] lg:mt-0">
      <div className="flex pb-7 text-center">
        <p className="w-full text-[30px] font-[500] leading-[26px] text-white lg:text-[45px] lg:leading-[52px]">
          Fabric Matters
        </p>
      </div>

      {isDefault ? (
        <ProductVideo
          src={FabricVid}
          autoplay
          loop
          aspectRatio="16/9"
          controls={false}
        />
      ) : (
        <Image
          alt="cover-with-water-droplets"
          src={WhiteLayerDesktop}
          width={1000}
          height={1000}
          className="w-full"
        />
      )}
    </div>
  );
};
export default FabricMattersSection;
