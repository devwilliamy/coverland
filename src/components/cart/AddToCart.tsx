'use client';
import { Suspense, useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  TPathParams,
  TQueryParams,
  getCompleteSelectionData,
} from '../../utils';
import { useStore } from 'zustand';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import CompleteYourVehicleSheet from './CompleteYourVehicleSheet';
import AddToCartButton from './AddToCartButton';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import {
  ApolloCache,
  MutationFunctionOptions,
  useMutation,
} from '@apollo/client';
import { ADD_TO_CART, CREATE_CART } from '@/lib/graphql/mutations/cart';
import CartSheet from './CartSheet';
import PreorderSheet from './PreorderSheet';
import { useCartContext } from '@/providers/CartProvider';
import { FETCH_CART } from '@/lib/graphql/queries/cart';

interface AddToCartVariables {
  cartId: string;
  variantId: string;
  quantity: number;
}

export default function AddToCart({
  searchParams,
  isSticky,
}: {
  searchParams: TQueryParams;
  isSticky?: boolean;
}) {
  const params = useParams<TPathParams>();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const modelData = useStore(store, (s) => s.modelData);
  const { isSeatCover } = useDetermineType();
  // const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);
  const { createCart, addToCart } = useCartContext();
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [completeYourVehicleSelectorOpen, setCompleteYourVehicleSelectorOpen] =
    useState<boolean>(false);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const handleAddToCart = useCallback(async () => {

    try {
      await addToCart(selectedProduct);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [createCart, addToCart, selectedProduct]);

  // if (error) return <p>Error: Unable to add to cart</p>;

  return (
    <Suspense fallback={<></>}>
      <div className="z-20 w-full" id="selector">
        {isComplete && isSeatCover ? (
          <></>
        ) : (
          <CompleteYourVehicleSheet
            completeYourVehicleSelectorOpen={completeYourVehicleSelectorOpen}
            setCompleteYourVehicleSelectorOpen={
              setCompleteYourVehicleSelectorOpen
            }
            searchParams={searchParams}
          />
        )}
      </div>
      {selectedProduct.preorder ? (
        <PreorderSheet
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          selectedProduct={selectedProduct}
        />
      ) : (
        <CartSheet
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          selectedProduct={selectedProduct}
        />
      )}
      {/* Add to Cart Button */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:p-1">
        <AddToCartButton
          preorder={isComplete && selectedProduct.preorder}
          isColorAvailable={true} // since we are always allowing customers to add to cart, overriding isSelectedColorAvailable with true
          handleAddToCart={handleAddToCart}
          // isLoading={loading}
        />
      </div>
    </Suspense>
  );
}
