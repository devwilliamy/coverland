import { TCartItem } from '@/lib/cart/useCart';
import { loadStripe } from '@stripe/stripe-js';
import { Dispatch, SetStateAction } from 'react';

export async function paypalCreateOrder(
  totalMsrpPrice: number
): Promise<string | null> {
  try {
    const response = await fetch('/api/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_price: totalMsrpPrice,
        //current time and date
        user_id: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data.data.id;
  } catch (err) {
    return null;
  }
}

export const redirectToCheckout = async ({
  cartItems,
  promoCode,
  setLoading,
}: {
  cartItems: TCartItem[];
  promoCode: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
    );
    if (!stripe) throw new Error('Stripe failed to initialize.');
    const checkoutResponse = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems, promoCode }),
    });
    const { sessionId } = await checkoutResponse.json();
    setLoading(false);
    const stripeError = await stripe.redirectToCheckout({ sessionId });
    if (stripeError) {
      console.error(stripeError);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export async function paypalCaptureOrder(orderID: string) {
  try {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// TODO: this was the previous implementation for checkout on the original coverland.com Next.Js site. We're currently redirecting to Stripe but we may need to restore some of this logic

// import { TCartItem } from '@/lib/cart/useCart';
// import { SHIPPING_RATES } from '@/lib/constants';

export const getEligibleShippingOptions = () =>
  // cartItems: TCartItem[],
  // shippingState: string[]
  {
    // Get unique product types from cart
    // const productTypesInCart = [...new Set(cartItems.map((item) => item.type))];
    // Filter shipping options based on product types and excluded states
    // let eligibleOptions = SHIPPING_RATES.filter(
    //   (rate) =>
    //     productTypesInCart.some((cartType) =>
    //       rate.product_types.includes(cartType)
    //     ) && !rate.states_excluded.includes(shippingState)
    // );
    // Determine the appropriate paid shipping option
    // let paidOption;
    // if (productTypesInCart.length > 1) {
    //   // Multiple product types: choose the most expensive option
    //   paidOption = eligibleOptions
    //     .filter((option) => option.shipping_cost > 0)
    //     .reduce(
    //       (max, option) =>
    //         option.shipping_cost > max.shipping_cost ? option : max,
    //       { shipping_cost: -1 }
    //     );
    // } else {
    //   // Single product type: choose the least expensive option
    //   paidOption = eligibleOptions
    //     .filter((option) => option.shipping_cost > 0)
    //     .reduce(
    //       (min, option) =>
    //         option.shipping_cost < min.shipping_cost ? option : min,
    //       { shipping_cost: Infinity }
    //     );
    // }
    // Always include 'Free Shipping' if it's eligible
    // const freeShippingOption = SHIPPING_RATES.find(
    //   (option) =>
    //     option.shipping_cost === 0 &&
    //     !option.states_excluded.includes(shippingState)
    // );
    // Combine selected paid option with free shipping (if eligible)
    // let finalOptions = [];
    // if (paidOption && paidOption.shipping_cost >= 0) {
    //   finalOptions.push(paidOption);
    // }
    // if (freeShippingOption) {
    //   finalOptions.push(freeShippingOption);
    // }
    // return finalOptions;
  };
