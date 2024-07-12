import { TCartItem } from '@/lib/cart/useCart';
import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';
import { StripeAddress } from '@/lib/types/checkout';
import { PaypalShipping } from '@/lib/types/paypal';
import {
  mapPaypalCaptureCreateToOrder,
  mapPaypalCompletionToOrder,
} from '@/lib/utils/adminPanel';
import { loadStripe } from '@stripe/stripe-js';
import { Dispatch, SetStateAction } from 'react';

function isValidShippingAddress({ address }: PaypalShipping) {
  return (
    address &&
    address.address_line_1 !== '' &&
    address.admin_area_2 !== '' &&
    address.admin_area_1 !== '' &&
    address.postal_code !== '' &&
    address.country_code !== ''
  );
}

export async function paypalCreateOrder(
  totalMsrpPrice: number,
  items: TCartItem[],
  orderId: string,
  shipping: number,
  shippingAddress: StripeAddress,
  billingAddress?: StripeAddress,
  incomingTax?: number
): Promise<string | null> {
  const itemsForPaypal = items.map((item) => ({
    name: `${item.parent_generation} ${item.display_id} ${item.model} ${item.type} ${item.display_color}`,
    quantity: item.quantity?.toString(),
    sku: item.sku,
    unit_amount: {
      currency_code: 'USD',
      value: item.msrp,
    },
  }));

  const shippingForPaypal = {
    type: 'SHIPPING',
    name: {
      full_name: shippingAddress.name || '',
    },
    address: {
      address_line_1: shippingAddress?.address?.line1 || '',
      address_line_2: shippingAddress?.address?.line2 || '',
      admin_area_2: shippingAddress?.address?.city || '',
      admin_area_1: shippingAddress?.address?.state || '',
      postal_code: shippingAddress?.address?.postal_code || '',
      country_code: shippingAddress?.address?.country || 'US',
    },
  };

  const billingForPaypal = {
    address_line_1: billingAddress?.address?.line1 || '',
    address_line_2: billingAddress?.address?.line2 || '',
    admin_area_2: billingAddress?.address?.city || '',
    admin_area_1: billingAddress?.address?.state || '',
    postal_code: billingAddress?.address?.postal_code || '',
    country_code: billingAddress?.address?.country || 'US',
  };
  const totalWithTax = incomingTax
    ? (totalMsrpPrice + incomingTax).toFixed(2)
    : totalMsrpPrice.toString();

  const purchase_units = [
    {
      reference_id: orderId, // order-id
      custom_id: orderId, //order-id
      items: itemsForPaypal,
      shipping: isValidShippingAddress(shippingForPaypal)
        ? shippingForPaypal
        : null,
      amount: {
        currency_code: 'USD',
        value: totalWithTax,
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: totalMsrpPrice.toString(),
          },
          shipping: {
            currency_code: 'USD',
            value: shipping.toString(),
          },
          tax_total: {
            currency_code: 'USD',
            value: incomingTax ? incomingTax : '0.00',
          },
        },
      },
      payment_source: {
        paypal: {
          address: billingForPaypal,
        },
      },
    },
  ];

  try {
    const response = await fetch('/api/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_price: totalMsrpPrice,
        // This one kinda useless, thinking about to do with it
        user_id: new Date().toISOString(),
        purchase_units,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();
    // console.log('[Paypal.paypalCreateOrder] data: ', data);
    const mappedData = mapPaypalCaptureCreateToOrder(data);
    // console.log('[Paypal.paypalCreateOrder] mappedData: ', mappedData);
    const adminPanelOrder = await updateAdminPanelOrder(
      mappedData,
      mappedData.order_id
    );
    // console.log('[Paypal.paypalCreateOrder]: adminPanelOrder', adminPanelOrder);
    return data.id;
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

export async function paypalCaptureOrder(orderID: string, phone: string) {
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
      const { error } = await response.json();
      /*
        Full UNPROCESSABLE_ENTITY Error:
        An unexpected error occurred: 
          Error: {
            "name":"UNPROCESSABLE_ENTITY",
            "details":[{"issue":"INSTRUMENT_DECLINED","description":"The instrument presented  was either declined by the processor or bank, or it can't be used for this payment."}],
            "message":"The requested action could not be performed, semantically incorrect, or failed business validation.","debug_id":"2df44f01e4caa","links":[{"href":"https://developer.paypal.com/docs/api/orders/v2/#error-INSTRUMENT_DECLINED","rel":"information_link","method":"GET"},{"href":"https://www.sandbox.paypal.com/checkoutnow?token=61M72432BD444010V",
            "rel":"redirect",
            "method":"GET"}]}
      */
      if (error.includes('UNPROCESSABLE_ENTITY')) {
        throw new Error(
          `UNPROCESSABLE_ENTITY - INSTRUMENT_DECLINED: The instrument presented  was either declined by the processor or bank, or it can't be used for this payment.`
        );
      }
      throw new Error(`Network response was not ok`);
      // throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(`[PaypalCaptureOrder] Error: `, err);
    throw err;
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

export const cleanPhoneInput = (inputString: string) => {
  const cleanedString = inputString
    .replaceAll(' ', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('-', '')
    .replaceAll('+', '');

  return cleanedString;
};
