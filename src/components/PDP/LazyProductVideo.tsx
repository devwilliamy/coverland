'use client';

import { useInView } from 'react-intersection-observer';

import Image, { StaticImageData } from 'next/image';
import { Asset } from 'next-video/dist/assets.js';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
const Video = dynamic(() => import('@/components/PDP/WrappedNextVideo'));

type ProductVideoProps = VideoProps & {
  src: Asset;
  imgSrc?: StaticImageData;
  aspectRatio?: string;
};

type VideoProps = React.ComponentProps<typeof Video>;

// needed to pass ref to next-video + dynamic import
// see https://stackoverflow.com/questions/63469232/forwardref-error-when-dynamically-importing-a-module-in-next-js
const ForwardRefVideo = forwardRef<HTMLVideoElement, VideoProps>(
  (props, ref) => <Video {...props} videoRef={ref} />
);

ForwardRefVideo.displayName = 'ForwardRefVideo';

export default function ProductVideo({
  src,
  imgSrc,
  autoPlay = false,
  controls = true,
  loop = false,
  aspectRatio = '1 / 1',
  className = '',
}: ProductVideoProps) {
  const [inViewRef, inView] = useInView({
    threshold: 0,
    rootMargin: '100px',
    triggerOnce: true,
  });

  return (
    <ForwardRefVideo
      ref={inViewRef}
      src={inView ? src : undefined}
      muted
      autoPlay={inView && autoPlay ? autoPlay : false}
      loop={loop}
      playsInline
      className={className}
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
    </ForwardRefVideo>
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
