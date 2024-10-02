export const getOptimisticCartUpdateResponse = (
  cartId: string,
  lineItemId: string,
  newQuantity: number,
  shopifyCart: any
) => ({
  cartLinesUpdate: {
    cart: {
      id: cartId,
      lines: {
        // __typename: 'BaseCartLineConnection',
        edges: shopifyCart.cart.lines.edges.map((edge) =>
          edge.node.id === lineItemId
            ? {
                __typename: 'BaseCartLineEdge',
                node: {
                  ...edge.node,
                  quantity: newQuantity,
                  // __typename: 'CartLine',
                },
              }
            : edge
        ),
      },
      // __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesUpdatePayload',
  },
});

export const getOptimisticCartRemoveResponse = (
  cartId: string,
  lineItemId: string,
  shopifyCart: any
) => ({
  cartLinesRemove: {
    cart: {
      id: cartId,
      lines: {
        __typename: 'BaseCartLineConnection',
        edges:
          shopifyCart?.cart?.lines?.edges.filter(
            (edge) => edge.node.id !== lineItemId
          ) || [],
      },
      __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesRemovePayload',
  },
});
