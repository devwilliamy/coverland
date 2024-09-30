import client from '../apollo/apollo-client';
import {
  ADD_TO_CART,
  CREATE_CART,
  UPDATE_CART,
} from '../graphql/mutations/cart';

export async function createCart(variantId: string, quantity: number) {
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
  });
  console.log('CreateCart Data:', data);

  const cart = data.cartCreate.cart;
  // Save cart ID to localStorage for future operations
  localStorage.setItem('shopifyCartId', cart.id);

  return cart;
}

export async function addToCart(variantId: string, quantity: number) {
  const cartId = localStorage.getItem('shopifyCartId');

  if (!cartId) {
    // If no cart exists, create one
    return await createCart(variantId, quantity);
  }

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
  });

  return data.cartLinesAdd.cart;
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
