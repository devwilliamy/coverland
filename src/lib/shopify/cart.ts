import { ApolloError } from '@apollo/client';
import client from '../apollo/apollo-client';
import {
  ADD_TO_CART,
  CREATE_CART,
  UPDATE_CART,
} from '../graphql/mutations/cart';

export async function createCart(variantId: string, quantity: number) {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CART,
      variables: {
        input: {
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      },
      update: (cache, { data: mutationData }) => {
        const newCart = mutationData?.cartCreate?.cart;
        cache.modify({
          fields: {
            cart(existinCartRefs = []) {
              return [...existinCartRefs, newCart];
            },
          },
        });
      },
    });
    console.log('CreateCart Data:', data);
    const cart = data?.cartCreate?.cart;
    if (cart?.id) {
      localStorage.setItem('shopifyCartId', cart.id);
    }

    return cart;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('Error creating cart:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export async function addToCart(variantId: string, quantity: number) {
  const cartId = localStorage.getItem('shopifyCartId');

  if (!cartId) {
    // If no cart exists, create one
    return await createCart(variantId, quantity);
  }
  try {
    const { data } = await client.mutate({
      mutation: ADD_TO_CART,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
      optimisticResponse: {
        __typename: 'Mutation',
        cartLinesAdd: {
          cart: {
            id: cartId,
            lines: {
              edges: [
                {
                  node: {
                    id: `temp-line-id-${variantId}`,
                    quantity,
                    merchandise: {
                      __typename: 'ProductVariant',
                      id: variantId,
                      title: 'Temp Product Title',
                      price: {
                        amount: '0.00',
                        currencyCode: 'USD',
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
      update: (cache, { data: mutationData }) => {
        const newLines = mutationData?.cartLinesAdd?.cart?.lines?.edges;
        if (newLines) {
          cache.modify({
            id: cache.identify({ id: cartId, __typename: 'Cart ' }),
            fields: {
              lines(existingLines = []) {
                return [...existingLines, ...newLines];
              },
            },
          });
        }
      },
    });

    return data?.cartLinesAdd?.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

export async function updateCart(lineId: string, quantity: number) {
  const cartId = localStorage.getItem('shopifyCartId'); // Get the cart ID from localStorage

  if (!cartId) {
    console.error('Cart ID not found in localStorage.');
    return;
  }

  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CART,
      variables: {
        cartId,
        lines: [
          {
            id: lineId,
            quantity: quantity,
          },
        ],
      },
    });

    const updatedCart = data.cartLinesUpdate.cart;
    // Update your cart state with the updatedCart object
    console.log('Cart after update:', updatedCart);
    return updatedCart;
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}
