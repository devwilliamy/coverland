'use client';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="h-[370px] w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-xl border lg:my-4 lg:flex"
    >
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/TigF03eH0yE?controls=0&modestbranding=1&rel=0&autoplay=1&mute=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
