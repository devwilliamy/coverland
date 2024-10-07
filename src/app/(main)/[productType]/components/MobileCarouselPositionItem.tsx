import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { removeWwwFromUrl } from '@/utils';

export const CarouselPositionItem = ({
  index,
  src,
  handleClick,
  className,
}: {
  index: number;
  src: string | StaticImport;
  handleClick: (index: number) => void;
  className: string;
}) => (
  <button className={className} onClick={() => handleClick(index)}>
    <Image
      className="h-full w-full rounded-[4px]"
      width={74}
      height={74}
      src={removeWwwFromUrl(src as string) + '?v=1'}
      sizes="(max-width: 768px) 100vw"
      alt={`carousel-position-item-${index}`}
    />
  </button>
);
