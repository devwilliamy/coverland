import { ApolloCache } from '@apollo/client';
import { FETCH_CART } from '../queries/cart';

export const updateCartCache = (
  cache: ApolloCache<any>,
  cartLinesUpdate: any,
  cartId: string
) => {
  const existingCart = cache.readQuery({
    query: FETCH_CART,
    variables: { cartId },
  });

  const updatedLines = existingCart.cart.lines.edges.map((edge) => {
    const updatedLine = cartLinesUpdate.cart.lines.edges.find(
      (updateEdge) => updateEdge.node.id === edge.node.id
    );
    return updatedLine || edge;
  });

  cache.writeQuery({
    query: FETCH_CART,
    variables: { cartId },
    data: {
      cart: {
        ...existingCart.cart,
        lines: {
          edges: updatedLines,
          __typename: 'BaseCartLineConnection',
        },
      },
    },
  });
};

export const removeCartCache = (
  cache: ApolloCache<any>,
  cartId: string,
  lineId: string
) => {
  const existingCart = cache.readQuery({
    query: FETCH_CART,
    variables: { cartId },
  });

  if (existingCart && existingCart.cart) {
    const updatedLines = existingCart.cart.lines.edges.filter(
      (edge) => edge.node.id !== lineId
    );

    cache.writeQuery({
      query: FETCH_CART,
      variables: { cartId },
      data: {
        cart: {
          ...existingCart.cart,
          lines: {
            __typename: 'BaseCartLineConnection',
            edges: updatedLines,
          },
        },
      },
    });
  }
};

export const updateAddToCartCache = (
  cache: ApolloCache<any>,
  cartId: string,
  newLine: {
    id: string;
    quantity: number;
    title: string;
    price: number;
    currencyCode: string;
  }
) => {
  // Read the existing cart from the cache
  const existingCart = cache.readQuery({
    query: FETCH_CART,
    variables: { cartId },
  });

  if (!existingCart) return;

  // Add the new cart line to the existing cart lines
  const updatedLines = [
    ...existingCart.cart.lines.edges,
    {
      node: {
        id: newLine.id,
        quantity: newLine.quantity,
        merchandise: {
          __typename: 'ProductVariant',
          id: newLine.id,
          image: {
            url: newLine.url,
          },
          title: newLine.title,
          price: {
            amount: newLine.price,
            currencyCode: newLine.currencyCode,
          },
          product: {
            id: newLine.productId,
            productType: newLine.productType,
            title: newLine.title,
          },
          sku: newLine.sku,
        },
        __typename: 'CartLine',
      },
      __typename: 'BaseCartLineEdge',
    },
  ];

  // Write the updated cart back into the cache
  cache.writeQuery({
    query: FETCH_CART,
    variables: { cartId },
    data: {
      cart: {
        ...existingCart.cart,
        lines: {
          edges: updatedLines,
        },
        __typename: 'Cart',
      },
    },
  });
};
