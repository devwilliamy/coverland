import { ApolloCache } from '@apollo/client';
import { FETCH_CART } from '../queries/cart';

export const createCartCache = (cache: ApolloCache<any>, newCart: any) => {
  debugger;
  const existingCart = cache.readQuery({
    query: FETCH_CART,
    variables: { cartId: newCart.id },
  });
  cache.writeQuery({
    query: FETCH_CART,
    data: {
      cart: newCart,
    },
    variables: { cartId: newCart.id },
  });
};

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
    url: string;
    productId: string;
    productType: string;
    sku: string;
    variantId: string;
  }
) => {
  // Read the existing cart from the cache
  const existingCart = cache.readQuery({
    query: FETCH_CART,
    variables: { cartId },
  });

  if (!existingCart) return;

  const existingEdges = existingCart.cart.lines.edges;

  // **Check if the newLine already exists in the cart**
  const isLineExisting = existingEdges.some(
    (edge) => edge.node.id === newLine.id
  );

  if (isLineExisting) {
    // **Item already exists; do not add it again**
    return;
  }

  // **Item doesn't exist; proceed to add it**
  const newEdge = {
    node: {
      id: newLine.id,
      quantity: newLine.quantity,
      merchandise: {
        __typename: 'ProductVariant',
        id: newLine.variantId,
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
  };

  const updatedLines = [...existingEdges, newEdge];

  // Write the updated cart back into the cache
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
        __typename: 'Cart',
      },
    },
  });
};
