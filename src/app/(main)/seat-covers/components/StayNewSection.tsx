import ProductVideo from '@/components/PDP/ProductVideo';
// import StayNew1 from '@/images/PDP/seat-covers-v2/stay-new-1.webp';
// import StayNew2 from '@/images/PDP/seat-covers-v2/stay-new-2.webp';
// import StayNew3 from '@/images/PDP/seat-covers-v2/stay-new-3.webp';
import Footprint from '@/videos/seat-covers-footprint.mp4';
import Coke from '@/videos/seat-covers-coke.mp4';
import Fork from '@/videos/seat-covers-fork.mp4';
// import Image from 'next/image';

const stayNewData = [
  { src: Footprint, title: 'Effortlessly clean, from kids to pets' },
  { src: Coke, title: 'Worry no more for spilled or coffee stains' },
  { src: Fork, title: 'Scratch-resistant, No more pet scratches' },
];

export default function StayNewSection() {
  return (
    <div className="flex w-full flex-col bg-[#E7E7E7]">
      <p className="flex w-full items-center justify-center pb-[16px]   pt-[43px] text-center text-[26px] font-[600] leading-[26px] lg:pb-[20px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Stay New, Stay Fresh
      </p>
      <div className="flex w-full flex-col items-center justify-center pb-[28px] text-[14px] font-[500] leading-[24px] text-[#4D4D4D] ">
        <div className="flex items-end gap-1">
          <p>From </p>
          <TextWithDot text="Kids" />
          <p>And </p>
          <TextWithDot text="Pets" />
          <p>to </p>
          <TextWithDot text="Spilled" />
          <p>Drinks, </p>
        </div>
        <p>Your Seats Remain Spotless.</p>
      </div>
      <section className="flex w-full flex-col items-center ">
        {stayNewData.map(({ src, title }, index) => (
          <div
            key={title}
            className="flex  max-w-[621px] flex-col pb-10 text-center text-[#7D7D7D] max-md:px-4 "
          >
            {src && (
              <div className="flex  items-center">
                <ProductVideo
                  src={src}
                  autoPlay
                  loop
                  aspectRatio="16/9"
                  controls={false}
                  className="max-h-[224px] md:max-h-[349px]"
                />
              </div>
            )}
            <p className="pt-[18px] text-[16px] font-[500] capitalize leading-[25px]  lg:mt-[20px] lg:text-[22px] ">
              {title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

const TextWithDot = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex h-[3px] w-[3px] rounded-full bg-[#B23B4E]" />
    <p className="text-[#B23B4E]">{text}</p>
  </div>
);
