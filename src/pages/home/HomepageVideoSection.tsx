import dynamic from 'next/dynamic';
import SquareVideo from '@/videos/Coverland_Square.mp4';
import SquareThumbnail from '@/video/Thumbnail_Square.webp';
import { Skeleton } from '@/components/ui/skeleton';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
});

export default function HomepageVideoSection() {
  return (
    <span className="flex flex-col items-center">
      <p className=" mb-[32px] text-center text-[24px] font-black uppercase leading-[26px] lg:hidden">
        Perfect Solution <br />
        for All Weather
      </p>
      <p className="mb-[40px] hidden text-center text-[45px] font-black uppercase leading-[36px] lg:flex ">
        Perfect Solution for All Weather
      </p>
      <span className="flex w-full flex-col items-center bg-[#1A1A1A] pt-[40px] lg:px-[150px] lg:pt-[92px]">
        <ProductVideo src={SquareVideo} imgSrc={SquareThumbnail} />
        <button className="my-[30px] flex min-h-[48px] w-full max-w-[214px]  flex-col items-center justify-center rounded-[4px] bg-[#BE1B1B] px-[40px] py-[15px] text-[16px] font-black text-white ">
          <a href="/car-covers">Shop Now</a>
        </button>
      </span>
    </span>
  );
}
