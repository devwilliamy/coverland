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

export const getOptimisticAddToCartResponse = (
  cartId: string,
  newLine: {
    id: string;
    quantity: number;
    title: string;
    price: number;
    currencyCode: string;
    url: string;
    productId: string;
    productType: string;
    sku: string;
    variantTitle: string;
  }
) => ({
  cartLinesAdd: {
    cart: {
      id: cartId,
      lines: {
        __typename: 'BaseCartLineConnection',
        edges: [
          {
            __typename: 'BaseCartLineEdge',
            node: {
              id: `temp-line-${Date.now()}`,
              quantity: 1,
              merchandise: {
                __typename: 'ProductVariant',
                id: newLine.id,
                image: {
                  url: newLine.url,
                },
                title: newLine.variantTitle,
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
          },
        ],
      },
      __typename: 'Cart',
    },
    __typename: 'CartLinesAddPayload',
  },
});
