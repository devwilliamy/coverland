import { useState, useMemo } from 'react';
import { GalleryGridImage } from './GalleryGridImage';
import { Button } from '@/components/ui/button';
import { isFullSet } from '@/lib/utils';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

const GalleryImageGrid = () => {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const [showMore, setShowMore] = useState(false);

  if (!selectedProduct) {
    return null; // Return early if there's no selected product
  }

  // Determine if it's a front cover
  const isFrontCover = isFullSet(selectedProduct.display_set || '') === 'front';

  // Memoize gallery images
  const galleryImages = useMemo(() => {
    const images = selectedProduct.product?.split(',');
    return isFrontCover ? images?.slice(0, -3) : images;
  }, [selectedProduct, isFrontCover]);

  // Memoize the first 4 images
  const fourImages = useMemo(() => {
    return selectedProduct.product?.split(',')?.slice(0, 4);
  }, [selectedProduct]);

  // Determine images to display based on showMore state
  const imagesToShow = showMore ? galleryImages : fourImages;

  return (
    <>
      <div className="hidden grid-cols-[1fr_1fr] gap-4 lg:grid">
        {imagesToShow?.map((img: string, index: number) => (
          <GalleryGridImage key={`product-image-${index}`} img={img} />
        ))}
      </div>
      <Button
        className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? 'show less images' : 'show more images'}
      </Button>
    </>
  );
};

export default GalleryImageGrid;
