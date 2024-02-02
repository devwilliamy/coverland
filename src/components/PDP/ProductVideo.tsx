'use client';
import Video from 'next-video';
import Image, { StaticImageData } from 'next/image';
import { Asset } from 'next-video/dist/assets.js';

type ProductVideoProps = {
  src: Asset;
  imgSrc?: StaticImageData;
  autoplay?: boolean;
  loop?: boolean;
};
export default function ProductVideo({
  src,
  imgSrc,
  autoplay = false,
  loop = false,
}: ProductVideoProps) {
  return (
    <Video
      src={src}
      muted
      autoPlay={autoplay}
      loop={loop}
      style={{
        aspectRatio: 1 / 1,
        height: '100%',
        '--seek-backward-button': 'none',
        '--seek-forward-button': 'none',
      }}
    >
      {imgSrc ? (
        <Image
          alt="Video Thumbnail"
          slot="poster"
          src={imgSrc}
          aria-hidden="true"
        />
      ) : null}
    </Video>
  );
}
