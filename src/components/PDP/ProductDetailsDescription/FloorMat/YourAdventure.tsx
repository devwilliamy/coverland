import DogInTrunk from '@/public/images/PDP/floor-mats/dog-in-trunk.webp';
import EcoFriendly from '@/public/images/PDP/floor-mats/eco-friendly.webp';
import Image from 'next/image';
// import Image from 'next/image';

export default function YourAdventure() {
  return (
    <section className="flex w-full flex-col items-center bg-[#E7E7E7] pb-16 lg:pb-[127px]">
      <div className="pb-[34px] pt-[46px] lg:pb-12 lg:pt-[90px]">
        <p className="text-center text-[26px] font-semibold leading-[30px] lg:text-[45px] lg:leading-[32px]">
          For You & Your Adventure
        </p>
      </div>

      <div className="flex w-full flex-col items-center px-4">
        <Image
          alt={`stay-fresh-item`}
          src={DogInTrunk}
          width={874}
          height={656}
          className="w-full rounded-xl border-4 border-white lg:max-h-[656px] lg:max-w-[874px]"
        />
      </div>
    </section>
  );
}
