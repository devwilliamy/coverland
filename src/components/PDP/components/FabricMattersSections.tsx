import Image from 'next/image';
import FabricWithWater from '@/images/PDP/Product-Details-Redesign-2/white-layer.png';

const FabricMattersSection = () => {
  return (
    <div className="mt-[60px]">
      <div className="flex pb-7 text-center">
        <p className="w-full text-[30px] font-[500] leading-[26px] text-white">
          Fabric Matters
        </p>
      </div>
      <Image
        alt="cover-with-water-droplets"
        src={FabricWithWater}
        className="h-200 mb-[14px] w-full"
      />
    </div>
  );
};
export default FabricMattersSection;
