import DogInTrunk from '@/public/images/PDP/floor-mats/dog-in-trunk.webp';
import EcoFriendly from '@/public/images/PDP/floor-mats/eco-friendly.webp';
import Image from 'next/image';
// import Image from 'next/image';

export default function YourAdventure() {
  return (
    <section className="flex w-full flex-col items-center bg-[#E7E7E7]">
      <div className="pb-[26px] pt-[43px] lg:pb-[20px] lg:pt-[66px]">
        <p className="text-center text-[26px] font-semibold leading-[30px] lg:text-[45px] lg:leading-[32px]">
          For You & Your Adventure
        </p>
      </div>

      <div className="w-full px-4">
        <Image
          alt={`stay-fresh-item`}
          src={DogInTrunk}
          width={800}
          height={800}
          className="w-full rounded-xl border-4 border-white lg:max-h-[328px] lg:max-w-[621px]"
        />
      </div>
    </section>
  );
}
