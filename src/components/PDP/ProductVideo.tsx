'use client';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="lg:my-4 w-full h-[351px] lg:flex hidden flex-col justify-center items-center max-w-full border rounded-xl overflow-hidden"
    >
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/MzF7jIIkDAo?si=t-6lccUtdSOH0NZM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
