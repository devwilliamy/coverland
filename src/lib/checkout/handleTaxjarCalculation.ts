import { ShippingAddress } from '@stripe/stripe-js';
import { TCartItem } from '../cart/useCart';
import { useCartContext } from '@/providers/CartProvider';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { getCartTotalPrice } from '../utils/calculations';

const handleTaxjarCalculation = async (
  cartItems,
  shipping,
  shippingAddress,
  twoLetterStateCode
) => {
  const cartMSRP = getCartTotalPrice(cartItems) + shipping;

  const taxItems = cartItems.map((item, index) => ({
    id: item.id ? item.id : index,
    quantity: item.quantity,
    unit_price: item.msrp,
    discount: 0,
  }));

  const bodyData = {
    to_country: shippingAddress.address.country,
    to_zip: shippingAddress.address.postal_code,
    to_state: twoLetterStateCode,
    shipping: shipping,
    line_items: taxItems,
  };
  const response = await fetch('/api/taxjar/sales-tax', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bodyData }),
  });

  const taxData = await response.json();
  console.log('TaxData:', taxData);
  const amount_to_collect = taxData?.tax?.amount_to_collect;
  return amount_to_collect;

  // const totalWithTax = convertPriceToStripeFormat(taxSum);

  // if (totalWithTax) {
  //   try {
  //     elements?.update({
  //       amount: totalWithTax,
  //       mode: 'payment',
  //       currency: 'usd',
  //     });
  //     await elements?.submit();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // await fetch('/api/stripe/payment-intent', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     paymentIntentId,
  //     amount: totalWithTax,
  //   }),
  // });
  //   setIsLoading(false);

  // return totalWithTax;
};

export default handleTaxjarCalculation;
