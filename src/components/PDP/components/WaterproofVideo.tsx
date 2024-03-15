import WaterproofGif from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/WaterGIF-I3oRFkQJIk8PSQddqC2fDKx08cNJNG.mp4';
import ProductVideo from '../ProductVideo';

export default function WaterproofVideo() {
  return (
    <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
      <ProductVideo
        src={WaterproofGif}
        autoplay
        loop
        aspectRatio="16 / 9"
        controls={false}
      />
    </div>
  );
}
