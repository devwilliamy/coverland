'use client';

import { VIMEO_VIDEO_LINK } from '@/lib/constants';
// import ReactPlayer from 'react-player/vimeo';
import Video from 'next-video';
// import awesomeVideo from 'https://stream.mux.com/Xidr94DjL01AsdkdKymFNOdzpDDcVKjQTUR9008RcOEgs.m3u8';
export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="flex h-[250px] w-full flex-col items-center lg:my-4 lg:flex lg:h-[500px]"
    >
      {/* <ReactPlayer
        url={VIMEO_VIDEO_LINK}
        width="100%"
        height="100%"
        controls
        muted
        loop
      /> */}
      <Video
        src={
          'https://stream.mux.com/Xidr94DjL01AsdkdKymFNOdzpDDcVKjQTUR9008RcOEgs.m3u8'
        }
      />
    </div>
  );
}
