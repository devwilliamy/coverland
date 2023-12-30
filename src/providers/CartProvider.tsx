import React, { createContext, useContext } from 'react';
import useCart, { TCartItems } from '@/lib/cart/useCart';

const defaultCartValue = {
  cartItems: [] as TCartItems[],
  addToCart: (item: TCartItems) => {},
  removeItemFromCart: (sku: TCartItems['sku']) => {},
  adjustItemQuantity: (sku: string, quantity: number) => {},
  getTotalPrice: (): number => 0,
};

const CartContext = createContext(defaultCartValue);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCart();
  console.log(cart);

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
