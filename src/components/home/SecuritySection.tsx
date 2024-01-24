import Beach from '../../../public/images/security/security-beach.webp';
import ScratchIcon from '../icons/ScratchIcon';
import SunIcon from '../icons/SunIcon';
import ThunderCloudIcon from '../icons/ThunderCloudIcon';
import UmbrellaIcon from '../icons/UmbrellaIcon';
import SecuritySectionIcon from './SecuritySectionIcon';
import Image from 'next/image';

export default function SecuritySection() {
  return (
    <section className="xxl:px-0 flex h-auto w-screen max-w-[1440px] flex-col bg-white px-4 md:px-24 lg:px-20 lg:pt-20">
      <div className="flex w-full flex-col items-start justify-end object-cover pb-4 pt-4 md:pb-0 md:pt-16">
        <Image
          src={Beach}
          className=" w-full rounded-xl"
          alt="a fully-covered vehicle with a coverland car cover on it"
        />
      </div>
      <div className="flex flex-col items-center justify-center xl:flex-row ">
        <div className="flex h-full flex-col items-start justify-center">
          <div className="w-full pb-10 pt-7 lg:pb-10 lg:pt-0">
            <h1 className="text-center text-2xl font-black uppercase md:text-5xl xl:text-left">
              Experience the Best Car Cover In THe USA
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
            <SecuritySectionIcon
              icon={<UmbrellaIcon />}
              title="Weatherproof Car Covers"
            >
              It fully protects my car in all weather conditions. Built to be
              effective in all seasons.
            </SecuritySectionIcon>
            <SecuritySectionIcon
              icon={<SunIcon />}
              title="UV & Heat Protection"
            >
              Without heat accumulation, our covers reflect 100% of all UV rays.
            </SecuritySectionIcon>
            <SecuritySectionIcon icon={<ScratchIcon />} title="Scratchproof">
              Serving as a protective coat, our covers guard against scratches
              by kids, dirt and even cats.
            </SecuritySectionIcon>
            <SecuritySectionIcon
              icon={<ThunderCloudIcon />}
              title="Hail, Storm & Snow Protection"
            >
              Regardless of weather conditions, our covers are snowproof,
              waterproof and windproof.{' '}
            </SecuritySectionIcon>
          </div>
        </div>
      </div>
    </section>
  );
}
