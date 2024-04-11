/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { createContext, useContext } from 'react';
import useCart, { TCartItem } from '@/lib/cart/useCart';

export type SeatItem = {
  sku: string;
  type: string | null;
  feature: string | null;
  product: string | null;
  display_color: string | null;
  msrp: number | string | null;
  price: number | string | null;
  display_id: string | null;
  quantity: number;
};

const defaultCartValue = {
  cartItems: [] as TCartItem[],
  addToCart: (item: TCartItem) => {},
  removeItemFromCart: (sku: TCartItem['sku']) => {},
  updateItemQuantity: (sku: string, quantity: number) => {},
  getTotalPrice: (): number => 0,
  getOrderSubtotal: (): number => 0,
  getTotalDiscountPrice: (): number => 0,
  getTotalCartQuantity: (): number => 0,
  setCartOpen: (open: boolean) => {},
  clearLocalStorageCart: () => {},
  cartOpen: false,
};
const CartContext = createContext(defaultCartValue);
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
// Hook to use cart context
const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
export { CartProvider, useCartContext };
