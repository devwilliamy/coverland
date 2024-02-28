import Image from 'next/image';
import WhiteLayerMobile from '@/images/PDP/Product-Details-Redesign-2/white-layer-mobile.png';
import WhiteLayerDesktop from '@/images/PDP/Product-Details-Redesign-2/white-layer-desktop.png';

const FabricMattersSection = () => {
  return (
    <div className="mt-[60px] w-full lg:mt-0">
      <div className="flex pb-7 text-center">
        <p className="w-full text-[30px] font-[500] leading-[26px] text-white">
          Fabric Matters
        </p>
      </div>
      <Image
        alt="cover-with-water-droplets"
        src={WhiteLayerMobile}
        className="mb-[14px]  w-full lg:hidden "
      />
      <Image
        alt="cover-with-water-droplets"
        src={WhiteLayerDesktop}
        width={840}
        height={472}
        className=" hidden w-full lg:block"
      />
    </div>
  );
};
export default FabricMattersSection;
