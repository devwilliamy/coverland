import Image, { StaticImageData } from 'next/image';
import { Asset } from 'next-video/dist/assets.js';
import dynamic from 'next/dynamic';

const Video = dynamic(() => import('next-video'));

type ProductVideoProps = {
  src: Asset;
  imgSrc?: StaticImageData;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  aspectRatio?: string;
  className?: string;
  onLoadedData?: () => void;
};

export default function ProductVideo({
  src,
  imgSrc,
  autoplay = false,
  controls = true,
  loop = false,
  aspectRatio = '1 / 1',
  className = '',
  onLoadedData,
}: ProductVideoProps) {
  return (
    <Video
      src={src}
      muted
      autoPlay={autoplay}
      loop={loop}
      playsInline
      className={className}
      onLoadedData={onLoadedData}
      style={{
        aspectRatio: aspectRatio,
        height: '100%',
        '--controls': controls ? '' : 'none',
        '--seek-backward-button': 'none',
        '--seek-forward-button': 'none',
        '--time-range': 'none',
        '--time-display': 'none',
        '--duration-display': 'none',
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

// '--seek-forward-button': 'none',
// '--time-range': controls ? '' : 'none',
// '--time-display': controls ? '' : 'none',
// '--duration-display': controls ? '' : 'none',
// '--rendition-selectmenu': controls ? '' : 'none',
// '--play-button': controls ? '' : 'none',
// '--mute-button': controls ? '' : 'none',
// '--pip-button': controls ? '' : 'none',
// '--playback-rate-button': controls ? '' : 'none',
// '--fullscreen-button': controls ? '' : 'none',
// '--volume-range': controls ? '' : 'none',
