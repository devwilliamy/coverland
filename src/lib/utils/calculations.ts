import { IProductData } from '@/utils';
import { TCartItem } from '../cart/useCart';
import { TSeatCoverDataDB } from '../db/seat-covers';

export const getOrderSubtotal = (cartItems: TCartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + Number(item.price as string) * item.quantity,
    0
  );
};

export const getMsrpTotal = (cartItems: TCartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + Number(item.msrp as string) * item.quantity,
    0
  );
};

export const getCartTotalPrice = (cartItems: TCartItem[]) => {
  return cartItems.reduce(
    (total, item) =>
      total +
      Number(item.msrp as string) * item.quantity -
      (item.preorder ? Number(item.preorder_discount) * item.quantity : 0), // checking for preorder discount here
    0
  );
};

export const getTotalDiscountPrice = (cartItems: TCartItem[]) => {
  return cartItems.reduce(
    (total, item) =>
      total + Number(Number(item.price) - Number(item.msrp)) * item.quantity,
    0
  );
};

export const getTotalCartQuantity = (cartItems: TCartItem[]) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const handleCheckLowQuantity = (
  cartProduct: IProductData | TSeatCoverDataDB
) => {
  if (!cartProduct || !cartProduct.msrp) return;

  return { discountPercent: 50, newMSRP: cartProduct.msrp };
};
