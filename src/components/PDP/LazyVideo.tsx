'use client';

import React, { useEffect, useRef } from 'react';

export function LazyVideo({
  children,
  ...rest
}: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Handle data-src on the <video> element
            const dataSrcVideo = video.getAttribute('data-src');
            if (dataSrcVideo) {
              video.setAttribute('src', dataSrcVideo);
              video.removeAttribute('data-src');
            }

            // Replace data-src with src in <source> elements
            const sources = video.querySelectorAll(
              'source[data-src]'
            ) as NodeListOf<HTMLSourceElement>;
            sources.forEach((source) => {
              const dataSrc = source.getAttribute('data-src');
              if (dataSrc) {
                source.setAttribute('src', dataSrc);
                source.removeAttribute('data-src');
              }
            });

            observer.unobserve(video);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video ref={videoRef} {...rest}>
      {children}
    </video>
  );
}
