import ProductVideo from '../ProductVideo';
import UVVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/UVGIF-TlV19CyIwM0bRVnUtMrzWyWf7AJucy.mp4';

export default function UVResistanceVideo() {
  return (
    <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
      <ProductVideo
        src={UVVideo}
        autoPlay
        loop
        aspectRatio="16 / 9"
        controls={false}
      />
    </div>
  );
}
