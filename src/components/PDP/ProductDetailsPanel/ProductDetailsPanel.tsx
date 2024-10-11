'use client';
import { useState } from 'react';
import { useCartContext } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import PreorderSheet from '@/components/cart/PreorderSheet';
import { Separator } from '@/components/ui/separator';
import { getCompleteSelectionData, TQueryParams } from '@/utils';
import AddToCart from '@/components/cart/AddToCart';
import EditVehicle from '@/components/edit-vehicle/EditVehicle';
import useStoreContext from '@/hooks/useStoreContext';
import ProductInfo from './ProductInfo';
import ProductPricing from './ProductPricing';
import FloorMatSelection from '../ProductVariantSelections/FloorMatSelection';
import FreeDetails from '@/app/(main)/[productType]/components/FreeDetails';
import FloorMatColorSelector from '../VariantColorSelectors/FloorMatColorSelector';

export default function ProductDetailsPanel({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const router = useRouter();
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity: 1 });
    if (selectedProduct.preorder) {
      setAddToCartOpen(true);
      return;
    } else {
      router.push('/checkout');
    }
  };

  if (!selectedProduct.price) {
    throw new Error('No Selected Product Price in store');
  }

  return (
    <section className="flex w-full flex-col max-lg:px-4 max-lg:pt-4 lg:sticky lg:top-8 lg:w-1/2">
      <div className="flex flex-col">
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
        <EditVehicle searchParams={searchParams} />
        <Separator className="w-full bg-[#C8C7C7]" />
        <div className="mt-6 flex flex-col gap-0.5 lg:mt-12">
          <ProductInfo />
        </div>
      </div>
      <ProductPricing />
      {/* This would be a component I pass in probably */}
      {/* {isComplete ? <FloorMatSelection /> : null} */}
      {/* I think I also pass in color selector */}
      {/* <FloorMatColorSelector /> */}
      <FreeDetails />
      {/* <CompatibleVehiclesTrigger /> */}
      <div className="lg:py-4"></div>
      <div className="lg:hidden">
        <AddToCart
          selectedProduct={selectedProduct}
          handleAddToCart={handleAddToCart}
          searchParams={searchParams}
          isSticky
        />
      </div>
      <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
      />
      <PreorderSheet
        open={addToCartOpen}
        setOpen={setAddToCartOpen}
        selectedProduct={selectedProduct}
      />
    </section>
  );
}
