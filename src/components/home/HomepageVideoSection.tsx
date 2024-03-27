import dynamic from 'next/dynamic';
import NewVideo from '@/videos/Cinematic Car Cover Ads_FINAL.mp4';
import NewVideoThumb from '@/video/Thumbnail.webp';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Suspense } from 'react';
// import { list } from '@vercel/blob';
// import ProductVideo from '../PDP/ProductVideo';
const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'));

// async function VideoComponent({ fileName }) {
//   const pathname = 'videos/Cinematic Car Cover Ads_FINAL.mp4';
//   const { blobs } = await list({ prefix: fileName });
//   const video = blobs.find((blob) => blob.pathname === pathname);
//   const { url } = video;
//   return (
//     <video
//       controls
//       preload="none"
//       aria-label="Video player"
//       // autoPlay
//       muted
//       // loop
//       poster="/video/Thumbnail.webp"
//       width={400}
//       height={230}
//     >
//       <source src={url} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   );
// }

export default function HomepageVideoSection() {
  return (
    <span className="flex flex-col items-center">
      <p className=" mb-[32px] text-center text-[24px] font-black uppercase leading-[32px] lg:hidden">
        Perfect Solution <br />
        for All Weather
      </p>
      <p className="mb-[40px] hidden text-center text-[45px] font-black uppercase leading-[36px] lg:flex ">
        Perfect Solution for All Weather
      </p>
      <span className="flex w-full flex-col items-center bg-[#1A1A1A] px-[18px] pt-[45px] lg:px-[150px] lg:pt-[92px]">
        {/* <Suspense fallback={<p>Loading video...</p>}>
          <VideoComponent fileName="videos/" />
        </Suspense> */}
        <ProductVideo
          src={NewVideo}
          imgSrc={NewVideoThumb}
          aspectRatio="16 / 9"
        />
        <button className="my-[30px] flex min-h-[48px] w-full max-w-[214px]  flex-col items-center justify-center rounded-[4px] bg-[#BE1B1B] px-[40px] py-[15px] text-[16px] font-black text-white ">
          <a href="/car-covers/premium-plus">Shop Now</a>
        </button>
      </span>
    </span>
  );
}
