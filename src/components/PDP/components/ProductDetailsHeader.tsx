import {
  GrayCarIcon,
  GraySunIcon,
  GrayWaterIcon,
} from '@/components/PDP/icons';
import ProtectHeaderText from './ProtectHeaderText';
// import ProductDetailsMedia from './ProductDetailsMedia';
import dynamic from 'next/dynamic';
import DetailsTabHeader from '@/app/(main)/[productType]/components/DetailsTabHeader';
import useDetermineType from '@/hooks/useDetermineType';
import videojs from 'video.js';

import VideoJS from '../VideoJS';
import { useRef } from 'react';
const ProductDetailsMedia = dynamic(() => import('./ProductDetailsMedia'));
export default function ProductDetailsHeader() {
  const threeIcons = [
    { title: 'Waterproof', icon: <GrayWaterIcon /> },
    { title: 'Paint Protection', icon: <GraySunIcon /> },
    { title: 'Custom Fit', icon: <GrayCarIcon /> },
  ];
  const { make, model } = useDetermineType();
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'https://91.108.110.247/video/product_video_carousel-1714564225100.mp4',
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  return (
    <>
      <section className="relative -mx-4 mb-[40px] flex flex-col items-center lg:mb-[110px] lg:pt-[60px]  ">
        {make === 'ford' && model === 'f-150' && (
          <div className="hidden w-full  lg:flex">
            <DetailsTabHeader />
          </div>
        )}
        <div className="flex flex-col pb-7 text-center max-lg:pt-10 lg:pb-[38px]">
          <p className="text-[16px] capitalize leading-[26px] text-[#B23B4E] lg:text-[26px]">
            Elevate Style, Keep it new
          </p>
          <ProtectHeaderText />
        </div>

        {/* <div className="flex w-screen items-center justify-center lg:w-full ">
          <div className="flex w-full max-w-[840px]">
            <ProductDetailsMedia />
          </div>
        </div> */}
        <div className="flex w-screen items-center justify-center lg:w-full ">
          <div className="flex w-full h-[800px]">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </div>
        <div className="mt-[30px] grid grid-cols-3 items-center justify-center lg:gap-[120px]">
          {threeIcons.map(({ title, icon }) => (
            <div key={title} className="flex flex-col place-items-center">
              <div>{icon}</div>
              <p className="pt-0.5 text-[14px] text-white lg:text-[16px] ">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
