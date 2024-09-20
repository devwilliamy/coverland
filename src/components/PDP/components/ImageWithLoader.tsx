// components/ImageWithLoader.tsx
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ImageWithLoaderProps extends ImageProps {
  placeholderComponent?: React.ReactNode;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-[#F0F0F0]/50 lg:bg-[#999999]/50">
          <AiOutlineLoading3Quarters
            className="animate-spin"
            fill="#BE1B1B"
            opacity={0.5}
          />
        </div>
      )}
      <Image
        {...props}
        onLoadingComplete={() => setLoading(false)}
        className={`${props.className} ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default ImageWithLoader;
