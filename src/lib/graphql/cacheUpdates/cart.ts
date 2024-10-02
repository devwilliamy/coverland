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
