'use client';
import { useState, useCallback, useEffect } from 'react';
import { IProductData } from '@/utils';
import { SeatItem } from '@/providers/CartProvider';
import { TSeatCoverDataDB } from '../db/seat-covers';
import { FETCH_CART } from '../graphql/mutations/cart';
import { addToCartMutation, fetchCart } from '../shopify/cart';
import { mapShopifyCartToCartData } from '../utils/shopify';
export type TCartItem = (IProductData & { quantity: 1 }) | TSeatCoverDataDB;

const useCart = () => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCartPreorder, setIsCartPreorder] = useState(false);
  const [cartPreorderDate, setCartPreorderDate] = useState('');

  useEffect(() => {
    const shopifyCartId = localStorage.getItem('shopifyCartId');
    const loadCart = async () => {
      if (!shopifyCartId) return; // If no cart ID is available, exit early

      try {
        // Await the fetchCart function to get the cart data
        const shopifyCart = await fetchCart(shopifyCartId);
        console.log('ShopifyCart:', shopifyCart);

        if (shopifyCart) {
          // Map Shopify cart data to your cart item structure
          const fetchedCartItems = mapShopifyCartToCartData(shopifyCart);

          // Set cart items in state
          setCartItems(fetchedCartItems);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    loadCart();
  }, []);

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

  const addToCart = useCallback(
    async (item: TCartItem) => {
      if (!item?.msrp) {
        return;
      }
      try {
        await addToCartMutation(item.id, 1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
    [addToCartMutation]
  );

  const removeItemFromCart = useCallback(
    (sku: TCartItem['sku'] | SeatItem['sku']) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
    },
    []
  );

  const resetCart = useCallback(() => {
    if (cartItems.length > 0) {
      setCartItems([]);
    }
  }, []);

  const updateItemQuantity = useCallback((sku: string, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => (item.sku === sku ? { ...item, quantity } : item))
        .filter((item) => item.quantity !== 0);
      return updatedItems;
    });
  }, []);

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
