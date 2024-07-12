import { IProductData } from '@/utils';
import { TCartItem } from '../cart/useCart';
import {
  NO_DISCOUNT_LOWER_BOUND,
  NO_DISCOUNT_UPPER_BOUND,
  DISCOUNT_25_LOWER_BOUND,
  DISCOUNT_25_UPPER_BOUND,
} from '../constants';
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

export const getTotalPrice = (cartItems: TCartItem[]) => {
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
  const isInNoDiscountRange =
    Number(cartProduct.quantity) >= NO_DISCOUNT_LOWER_BOUND &&
    Number(cartProduct.quantity) <= NO_DISCOUNT_UPPER_BOUND;
  const isIn25PercentDiscountRange =
    Number(cartProduct.quantity) >= DISCOUNT_25_LOWER_BOUND &&
    Number(cartProduct.quantity) <= DISCOUNT_25_UPPER_BOUND;
  const original_price = Number(cartProduct.price);
  let calculatedPrice: number;
  // If product stock quantity is in the no disocunt range
  if (isInNoDiscountRange) {
    calculatedPrice = Number((cartProduct.msrp = cartProduct.price));
    // Return no discount and original price
    return { discountPercent: null, newMSRP: original_price };
  } else if (isIn25PercentDiscountRange) {
    calculatedPrice = original_price * 0.75;
    const formattedPrice = calculatedPrice.toFixed(2);
    // If the ending number is 0.50¢ keep it at 50¢
    if (formattedPrice.slice(-3) === '.50') {
      return { discountPercent: 25, newMSRP: calculatedPrice };
    }
    // Everything else reduce by 0.05¢
    calculatedPrice -= 0.05;
    return { discountPercent: 25, newMSRP: calculatedPrice };
  } else {
    return { discountPercent: 50, newMSRP: cartProduct.msrp };
  }
};
