import { LazyVideo } from '../LazyVideo';
import UVThumbnail from '@/public/images/PDP/Product-Details-Redesign-2/UVProtectionThumbnail.webp';

export default function UVResistanceVideo() {
  return (
    <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
      <LazyVideo
        data-src={
          'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/UVGIF-TlV19CyIwM0bRVnUtMrzWyWf7AJucy.mp4'
        }
        muted
        loop
        playsInline
        autoPlay
        width="100%"
        height="auto"
        poster={UVThumbnail.src}
      >
        Your browser does not support the video tag.
      </LazyVideo>
    </div>
  );
}
