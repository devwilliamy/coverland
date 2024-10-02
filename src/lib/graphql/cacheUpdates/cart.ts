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
