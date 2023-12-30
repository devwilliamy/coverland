'use client';

import { useState, useCallback, useEffect } from 'react';
import { TProductData } from '../db';

export type TCartItems = TProductData & { quantity: number };

const useCart = () => {
  const [cartItems, setCartItems] = useState<TCartItems[]>(() => {
    if (typeof window !== 'undefined') {
      const localCartItems = localStorage.getItem('cartItems');
      return localCartItems ? JSON.parse(localCartItems) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem('cartItems');
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: TProductData) => {
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

  const removeItemFromCart = useCallback((sku: TCartItems['sku']) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  }, []);

  const adjustItemQuantity = useCallback((sku: string, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => (item.sku === sku ? { ...item, quantity } : item))
        .filter((item) => item.quantity !== 0);
      return updatedItems;
    });
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.msrp as string) * item.quantity,
      0
    );
  }, [cartItems]);

  console.log(cartItems);

  return {
    cartItems,
    addToCart,
    removeItemFromCart,
    adjustItemQuantity,
    getTotalPrice,
  };
};

export default useCart;
