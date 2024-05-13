import Image from 'next/image';
import Indoor from '@/images/solutions/indoor-car-cover-picture.png';

export default function DesignedInUSA() {
  return (
    <section className="px-[16px]  lg:px-0">
      <div className="flex w-full flex-col items-center justify-center  lg:flex-row-reverse ">
        <div className="relative aspect-square max-h-[562px] w-full max-w-[617px] lg:w-1/2  ">
          <Image
            className="rounded-[8px] lg:rounded-[15px]"
            fill
            // width={617}
            // height={562}
            src={Indoor}
            alt="a fully-covered vehicle with a coverland car cover on it"
          />
          <div className="absolute bottom-[27px] left-[14px] z-10 flex flex-col  gap-[12px] lg:bottom-[42px] lg:left-[42px]">
            <p className="text-[18px] font-[700] capitalize text-white lg:text-[24px]">
              Indoor car covers
            </p>
            <button className="flex h-[44px] max-w-[160px] items-center rounded-[100px] bg-white px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px]">
              <a href="/car-covers/premium-plus">Shop Now</a>
            </button>
          </div>
        </div>
        <div
          id="USADetails"
          className="flex h-full max-w-[527px] flex-col gap-[32px] lg:mr-[83px] lg:w-1/2 lg:items-start "
        >
          <p className=" mb-[-10px] mt-[32px] max-w-[382px] text-left text-[24px] font-black uppercase leading-[32px] lg:mb-0 lg:mt-0 lg:whitespace-nowrap lg:text-[34px] lg:leading-[40px] ">
            Custom-Fit Car Covers <br /> Designed In The USA
          </p>
          <div className="text-[14px] font-[400] leading-[24px]">
            For every car enthusiast, owning a car is a considerable investment.
            Therefore, investing some money and effort for its protection is
            also an important step that involves buying premium quality car
            cover that is best for providing complete protection against extreme
            weather conditions.
            <br />
            <br />
            <button className="flex h-[44px] max-w-[160px] items-center whitespace-nowrap rounded-[100px] bg-white px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px] outline outline-1 outline-black lg:hidden">
              Read More
            </button>
            <div className="hidden lg:flex">
              Now, the question is what kind of auto cover is best for your
              vehicle? If you have the privilege of a garage, you can use our
              indoor car covers whereas if you have to park your cars outdoors,
              you can benefit from our universal customizable car cover. All our
              indoor and outdoor covers are custom made to be perfectly fitted,
              durable, and cost-effective.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
