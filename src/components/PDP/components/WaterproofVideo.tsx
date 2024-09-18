import { LazyVideo } from '../LazyVideo';
import WaterProofThumbnail from '@/public/images/PDP/Product-Details-Redesign-2/WaterproofingThumbnail.webp'

export default function WaterproofVideo() {
  return (
    <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
      <LazyVideo
        data-src={
          'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/WaterGIF-I3oRFkQJIk8PSQddqC2fDKx08cNJNG.mp4'
        }
        muted
        loop
        playsInline
        autoPlay
        width="100%"
        height="auto"
        poster={WaterProofThumbnail.src}
      >
        Your browser does not support the video tag.
      </LazyVideo>
    </div>
  );
}
