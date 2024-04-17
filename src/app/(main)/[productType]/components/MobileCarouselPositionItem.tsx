import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { removeWwwFromUrl } from '@/utils';

export const CarouselPositionItem = ({
  index,
  current,
  src,
  handleClick,
}: {
  index: number;
  current: number;
  src: string | StaticImport;
  handleClick: (index: number) => void;
}) => (
  <button
    className={`relative flex min-h-[80px] min-w-[80px] items-center justify-center rounded-[4px] ${index === current && 'outline outline-1  '} `}
    onClick={() => handleClick(index)}
  >
    <Image
      className="rounded-[4px]"
      width={74}
      height={74}
      src={removeWwwFromUrl(src as string) + '?v=10'}
      sizes="(max-width: 768px) 100vw"
      alt={`carousel-position-item-${index}`}
    />
  </button>
);
