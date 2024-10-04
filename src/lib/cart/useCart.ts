'use client';
import { useState, useCallback, useEffect } from 'react';
import { IProductData } from '@/utils';
import { SeatItem } from '@/providers/CartProvider';
import { TSeatCoverDataDB } from '../db/seat-covers';
import {
  ADD_TO_CART,
  CREATE_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from '../graphql/mutations/cart';
import { addToCartMutation, fetchCart } from '../shopify/cart';
import { mapShopifyCartToCartData } from '../utils/shopify';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_CART } from '../graphql/queries/cart';
import {
  createCartCache,
  removeCartCache,
  updateAddToCartCache,
  updateCartCache,
} from '../graphql/cacheUpdates/cart';
import {
  getOptimisticAddToCartResponse,
  getOptimisticCartRemoveResponse,
  getOptimisticCartUpdateResponse,
} from '../graphql/optimisticResponses/cart';
export type TCartItem = (IProductData & { quantity: 1 }) | TSeatCoverDataDB;

const useCart = () => {
  // const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCartPreorder, setIsCartPreorder] = useState(false);
  const [cartPreorderDate, setCartPreorderDate] = useState('');
  const [createCartMutation] = useMutation(CREATE_CART, {
    update: (cache, { data: mutationData }) =>
      createCartCache(cache, mutationData?.cartCreate?.cart),
  });
  const [addCartLine] = useMutation(ADD_TO_CART);
  const [updateCartLines] = useMutation(UPDATE_CART, {
    update: (cache, { data: { cartLinesUpdate } }) =>
      updateCartCache(cache, cartLinesUpdate, cartId),
  });
  const [removeCartLine] = useMutation(REMOVE_FROM_CART);
  // Retrieve the cartId from localStorage in useEffect
  useEffect(() => {
    const shopifyCartId = localStorage.getItem('shopifyCartId');
    setCartId(shopifyCartId);
  }, []);

  // Use useQuery directly in the component to fetch the cart data
  const {
    data: shopifyCart,
    loading: cartLoading,
    error: cartError,
  } = useQuery(FETCH_CART, {
    variables: { cartId },
    skip: !cartId, // Skip the query if no cartId is found
    fetchPolicy: 'cache-and-network',
  });
  // Process the cart data when shopifyCart changes
  useEffect(() => {
    if (shopifyCart) {
      const cartItems =
        shopifyCart.cart?.lines.edges.map(({ node }) =>
          mapShopifyCartToCartData(node)
        ) || [];
      setCartItems(cartItems);
    }
  }, [shopifyCart]);

  useEffect(() => {
    const preorderItem = cartItems.find((item) => item?.preorder);
    if (preorderItem) {
      setIsCartPreorder(true);
      // this only captures the first preorder item found in the cart, will have to come back and fix this later
      setCartPreorderDate(preorderItem?.preorder_date);
    } else {
      setIsCartPreorder(false);
      setCartPreorderDate('');
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem('cartItems');
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const createCart = useCallback(async () => {
    try {
      const { data } = await createCartMutation();
      const newCartId = data.cartCreate.cart.id;
      localStorage.setItem('shopifyCartId', newCartId); // Store cartId in local storage
      setCartId(newCartId); // Update state to trigger useQuery
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  }, []);

  const addToCart = useCallback(async (newItem: TCartItem) => {
    let cartId = localStorage.getItem('shopifyCartId');
    if (!cartId) {
      try {
        const { data } = await createCartMutation();
        const newCartId = data.cartCreate.cart.id;
        localStorage.setItem('shopifyCartId', newCartId); // Store cartId in local storage
        setCartId(newCartId); // Update state to trigger useQuery
        cartId = newCartId;
      } catch (error) {
        console.error('Error creating cart:', error);
        return;
      }
    }

    try {
      await addCartLine({
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: newItem.id,
              // merchandiseId: 'gid://shopify/ProductVariant/46075846820007',
              quantity: 1,
            },
          ],
        },
        // optimisticResponse: getOptimisticAddToCartResponse(cartId, {
        //   id: newItem.id,
        //   quantity: 1,
        //   title: newItem.title,
        //   price: newItem.msrp,
        //   currencyCode: 'usd',
        //   url: newItem.feature,
        //   productId: newItem.productId,
        //   productType: newItem.type,
        //   sku: newItem.sku,
        //   variantTitle: newItem.variantTitle,
        // }),
        update(cache, { data: { cartLinesAdd } }) {
          const addedLine = cartLinesAdd.cart.lines.edges[0].node; // Assuming only one line is added
          updateAddToCartCache(cache, cartId, {
            id: addedLine.id,
            quantity: addedLine.quantity,
            title: addedLine.merchandise.title,
            price: addedLine.merchandise.price.amount,
            currencyCode: addedLine.merchandise.price.currencyCode,
            url: addedLine.merchandise.image?.url, // Optional chaining for safety
            productId: addedLine.merchandise.product.id,
            productType: addedLine.merchandise.product.productType,
            sku: addedLine.merchandise.sku,
            variantId: addedLine.merchandise.id,
          });
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, []);

  const removeItemFromCart = useCallback(
    async (lineItemId: string) => {
      console.log('RemoveItemFromCart:', { lineItemId, cartId });
      try {
        await removeCartLine({
          variables: {
            cartId,
            lineIds: [lineItemId],
          },
          optimisticResponse: getOptimisticCartRemoveResponse(
            cartId,
            lineItemId,
            shopifyCart
          ),
          update: (cache, { data: { cartLinesRemove } }) =>
            removeCartCache(cache, cartId, lineItemId),
        });
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },
    [cartId, shopifyCart]
  );

  const resetCart = useCallback(() => {
    if (cartItems.length > 0) {
      setCartItems([]);
    }
  }, []);

  const updateItemQuantity = useCallback(
    async (lineItemId: string, newQuantity: number) => {
      try {
        await updateCartLines({
          variables: {
            cartId,
            lines: [{ id: lineItemId, quantity: newQuantity }],
          },
          optimisticResponse: getOptimisticCartUpdateResponse(
            cartId,
            lineItemId,
            newQuantity,
            shopifyCart
          ),
        });
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    },
    [cartId, shopifyCart]
  );

  const clearLocalStorageCart = useCallback(() => {
    if (typeof window !== 'undefined' && cartItems?.length > 0) {
      localStorage.removeItem('cartItems');
      resetCart();
    }
  }, []);

  const getOrderSubtotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price as string) * item.quantity,
      0
    );
  }, [cartItems]);

  const getMsrpTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.msrp as string) * item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalPreorderDiscount = useCallback(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (item.preorder ? Number(item.preorder_discount) * item.quantity : 0),
      0
    );
  }, [cartItems]);

  const getTotalDiscountPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(Number(item.price) - Number(item.msrp)) * item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalDiscountPricePlusPreorder = useCallback(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(
          Number(item.price) -
            Number(item.msrp) +
            Number(item?.preorder_discount)
        ) *
          item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalCartQuantity = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  /**
   * Returns cart total including discounts.
   */
  const getCartTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.msrp as string) * item.quantity -
        (item.preorder ? Number(item.preorder_discount) * item.quantity : 0), // checking for preorder discount here
      0
    );
  }, [cartItems]);

  return {
    cartItems,
    createCart,
    addToCart,
    removeItemFromCart,
    updateItemQuantity,
    getMsrpTotal,
    getCartTotalPrice,
    getOrderSubtotal,
    getTotalPreorderDiscount,
    getTotalDiscountPrice,
    getTotalDiscountPricePlusPreorder,
    getTotalCartQuantity,
    cartOpen,
    setCartOpen,
    isCartPreorder,
    cartPreorderDate,
    clearLocalStorageCart,
  };
};
export default useCart;
