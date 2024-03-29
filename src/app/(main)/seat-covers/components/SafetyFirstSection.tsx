import Image from 'next/image';
import Safety1 from '@/images/PDP/seat-covers-v2/safety-first-1.webp';
import Safety2 from '@/images/PDP/seat-covers-v2/safety-first-2.webp';
import Safety3 from '@/images/PDP/seat-covers-v2/safety-first-3.webp';

const safteyFirstData = [
  {
    img: Safety1,
    title: 'Airbag Compatible',
    description: 'Safety, seamlessly integrated',
  },
  {
    img: Safety2,
    title: 'Car seat Compatible',
    description: 'Ensures Child Seat Compatibility',
  },
  {
    img: Safety3,
    title: 'Anti-Slip Security',
    description: 'Enhanced Grip for Ultimate Security',
  },
];

export default function SafetyFirstSection() {
  return (
    <>
      <p className="flex w-full items-center justify-center pb-[34px] pt-[43px] text-center text-[26px] font-[500] leading-[26px] lg:pb-[20px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Stay New, Stay Fresh
      </p>
      <div className="flex w-full flex-col items-center justify-center pb-[28px] text-[14px] font-[500] leading-[24px] text-[#4D4D4D] ">
        <p>Your Seats Remain Spotless.</p>
      </div>
      <section className="flex w-full flex-col items-center ">
        {safteyFirstData.map(({ img, title, description }, index) => (
          <div
            key={img.src}
            className="flex items-center gap-10 pb-10 text-center text-[#7D7D7D] max-lg:px-4"
          >
            <div
              className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
            >
              <p
                className={`pt-[18px] text-[22px] font-[600]  leading-[25px] text-[#1A1A1A]`}
              >
                {title}
              </p>
              <p
                className={`pt-[18px] text-[16px] font-[500] leading-[18.75px] text-[#4D4D4D]`}
              >
                {description}
              </p>
            </div>
            {img && (
              <Image
                alt={`stay-fresh-item-${index}`}
                src={img}
                width={800}
                height={800}
                className={`w-full lg:h-[328px] lg:w-[621px] ${index % 2 === 0 && 'order-first'} `}
              />
            )}
          </div>
        ))}
      </section>
    </>
  );
}
