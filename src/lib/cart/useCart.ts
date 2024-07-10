'use client';
import { useState, useCallback, useEffect } from 'react';
import { IProductData } from '@/utils';
import { SeatItem } from '@/providers/CartProvider';
import { TSeatCoverDataDB } from '../db/seat-covers';
export type TCartItem = (IProductData & { quantity: 1 }) | TSeatCoverDataDB;

const useCart = () => {
  const [cartItems, setCartItems] = useState<TCartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const localCartItems = localStorage.getItem('cartItems');
      return localCartItems ? JSON.parse(localCartItems) : [];
    }
    return [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem('cartItems');
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: TCartItem) => {
    if (!item?.msrp) {
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.sku === item.sku);
      if (existingItem) {
        return prevItems.map((i) =>
          i.sku === item.sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

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
      (total, item) => total + ((Number(item.msrp as string) - Number(item?.preorder_discount)) * item.quantity),
      0
    );
  }, [cartItems]);

  const getTotalDiscountPrice = useCallback(() => {
    console.log('cartItems', cartItems);
    return cartItems.reduce(
      (total, item) =>
        total + Number((Number(item.price) - Number(item.msrp)) + Number(item?.preorder_discount)) * item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalCartQuantity = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeItemFromCart,
    updateItemQuantity,
    getTotalPrice: getMsrpTotal,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    cartOpen,
    setCartOpen,
    clearLocalStorageCart,
  };
};
export default useCart;
