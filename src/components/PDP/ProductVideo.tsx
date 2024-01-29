'use client';

// import ReactPlayer from 'react-player/vimeo';
import Video from 'next-video';
// import awesomeVideo from '../../../videos/file_example_MP4_1920_18MG.mp4';
import awesomeVideo from '../../../videos/Premium Plus Car Cover_1080p.mp4';

export default function ProductVideo({
  playerRef,
}: {
  playerRef: React.MutableRefObject<ReactPlayer | null>;
}) {
  return (
    <div
      id="product-video"
      className="flex h-[250px] w-full flex-col items-center lg:my-4 lg:flex lg:h-[500px]"
    >
      {/* <ReactPlayer
        url={VIMEO_VIDEO_LINK}
        ref={playerRef}
        width="100%"
        height="100%"
        controls
        muted
        loop
      /> */}
      <Video src={awesomeVideo} />
      {/* <MuxPlayer
        streamType="on-demand"
        playbackId="1m1U9h6TdDlVEkMYqrHYmZ7O5exAyrAtvB5vq01u9wug"
        metadataVideoTitle="Placeholder (optional)"
        metadataViewerUserId="Placeholder (optional)"
        primaryColor="#FFFFFF"
        secondaryColor="#000000"
      /> */}
    </div>
  );
}
