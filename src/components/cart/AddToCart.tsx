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

interface AddToCartVariables {
  cartId: string;
  variantId: string;
  quantity: number;
}

function getOptimisticResponse(variables: AddToCartVariables) {
  return {
    cartLinesAdd: {
      cart: {
        id: variables.cartId,
        lines: {
          edges: [
            {
              node: {
                id: `temp-line-id-${variables.variantId}`,
                quantity: variables.quantity,
                merchandise: {
                  __typename: 'ProductVariant',
                  id: variables.variantId,
                  title: 'Adding to cart...',
                  price: {
                    amount: '0.00',
                    currencyCode: 'USD',
                  },
                },
              },
            },
          ],
        },
        __typename: 'Cart',
      },
      __typename: 'CartLinesAddPayload',
    },
  };
}

function updateCache(
  cache: ApolloCache<any>,
  mutationData: any,
  cartId: string
) {
  const newLines = mutationData?.cartLinesAdd?.cart?.lines?.edges;
  if (newLines) {
    cache.modify({
      id: cache.identify({ __typename: 'Cart', id: cartId }),
      fields: {
        lines(existingLines = []) {
          return [...existingLines, ...newLines];
        },
      },
    });
  }
}

export function getAddToCartOptions(
  variables: AddToCartVariables
): MutationFunctionOptions {
  return {
    variables: {
      cartId: variables.cartId,
      lines: [
        {
          merchandiseId: variables.variantId,
          quantity: variables.quantity,
        },
      ],
    },
    optimisticResponse: getOptimisticResponse(variables),
    update: (cache, { data }) => updateCache(cache, data, variables.cartId),
  };
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
  const { addToCart } = useCartContext();
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [completeYourVehicleSelectorOpen, setCompleteYourVehicleSelectorOpen] =
    useState<boolean>(false);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const [createCart, { loading: createCartLoading, error: createCartError }] =
    useMutation(CREATE_CART, {
      update: (cache, { data: mutationData }) => {
        const newCart = mutationData?.cartCreate?.cart;
        cache.modify({
          fields: {
            cart(existingCartRefs = []) {
              return [...existingCartRefs, newCart];
            },
          },
        });
      },
    });

  const handleAddToCart = useCallback(async () => {
    debugger;
    let cartId = localStorage.getItem('shopifyCartId');
    if (!cartId) {
      try {
        const { data } = await createCart({
          variables: {
            input: {
              lines: [
                {
                  // merchandiseId: selectedProduct.id,
                  merchandiseId: 'gid://shopify/ProductVariant/46075846820007',
                  quantity: 1,
                },
              ],
            },
          },
        });

        console.log('CreateCart Data:', data);
        const newCartId = data?.cartCreate?.cart?.id;
        if (newCartId) {
          localStorage.setItem('shopifyCartId', newCartId);
          cartId = newCartId;
        } else {
          throw new Error('Failed to create cart');
        }
      } catch (error) {
        console.error('Error creating cart:', error);
        return;
      }
    }

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
