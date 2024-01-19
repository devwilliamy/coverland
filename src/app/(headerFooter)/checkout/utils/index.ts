// @ts-nocheck

import { SHIPPING_RATES } from '@/lib/constants';

export const getEligibleShippingOptions = (cartItems, shippingState) => {
  // Get unique product types from cart
  const productTypesInCart = [...new Set(cartItems.map((item) => item.type))];

  // Filter shipping options based on product types and excluded states
  let eligibleOptions = SHIPPING_RATES.filter(
    (rate) =>
      productTypesInCart.some((cartType) =>
        rate.product_types.includes(cartType)
      ) && !rate.states_excluded.includes(shippingState)
  );

  // Determine the appropriate paid shipping option
  let paidOption;
  if (productTypesInCart.length > 1) {
    // Multiple product types: choose the most expensive option
    paidOption = eligibleOptions
      .filter((option) => option.shipping_cost > 0)
      .reduce(
        (max, option) =>
          option.shipping_cost > max.shipping_cost ? option : max,
        { shipping_cost: -1 }
      );
  } else {
    // Single product type: choose the least expensive option
    paidOption = eligibleOptions
      .filter((option) => option.shipping_cost > 0)
      .reduce(
        (min, option) =>
          option.shipping_cost < min.shipping_cost ? option : min,
        { shipping_cost: Infinity }
      );
  }

  // Always include 'Free Shipping' if it's eligible
  const freeShippingOption = SHIPPING_RATES.find(
    (option) =>
      option.shipping_cost === 0 &&
      !option.states_excluded.includes(shippingState)
  );

  // Combine selected paid option with free shipping (if eligible)
  let finalOptions = [];
  if (paidOption && paidOption.shipping_cost >= 0) {
    finalOptions.push(paidOption);
  }
  if (freeShippingOption) {
    finalOptions.push(freeShippingOption);
  }

  return finalOptions;
};
