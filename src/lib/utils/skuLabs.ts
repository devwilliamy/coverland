import { CustomerInfo } from '@/contexts/CheckoutContext';
import { TCartItem } from '../cart/useCart';
import { StripeAddress } from '../types/checkout';
import { getCurrentDateInPST } from './date';
import { convertPriceFromStripeFormat } from './stripe';

type SkuLabOrderInput = {
  orderNumber: string;
  cartItems: TCartItem[];
  totalMsrpPrice: number;
  shippingAddress: StripeAddress;
  customerInfo: CustomerInfo;
};

const generateNote = (cartItems: TCartItem[]) => {
  const skuNameQuantity = cartItems.map((cartItem: TCartItem) => {
    const itemName =
      `${cartItem?.year_generation || ''} ${cartItem?.make || ''} ${cartItem?.model || ''} ${
        cartItem?.submodel1 ? cartItem?.submodel1 : ''
      } ${cartItem?.submodel2 ? cartItem?.submodel2 : ''} ${cartItem.type} ${cartItem?.display_id} ${
        cartItem?.display_color
      }`
        .replace(/\s+/g, ' ')
        .trim();
    return `${cartItem.sku} ${itemName} Quantity: ${cartItem.quantity}`;
  });

  return skuNameQuantity.join('\n');
};
export const generateSkuLabOrderInput = ({
  orderNumber,
  cartItems,
  totalMsrpPrice,
  shippingAddress,
  customerInfo,
}: SkuLabOrderInput) => {
  const notes = generateNote(cartItems);
  return {
    store_id: '62f0fcbffc3f4e916f865d6a', // Hard Coded for now
    order_number: orderNumber,
    stash: {
      store_id: '62f0fcbffc3f4e916f865d6a', // Hard Coded for now, must match store_id higher up
      type: 'manual',
      id: orderNumber,
      notes: notes,
      date: getCurrentDateInPST(),
      items: cartItems.map((cartItem) => ({
        quantity: cartItem.quantity,
        price: cartItem.msrp,
        type: 'item', // Item Or Kit (for Full Seat Cover bundle)
        // lineSku: '', // In the future will need to grab the SKU Lab sku
        // id: '' // In the future need to grab SKU Lab item id
        // lineName: '' // In the future need to grab SKU Lab lineName
        // lineId: '' // In the future will need to grab from SKU Lab
      })),
      discount: 0, // TODO: Currently no promo, but need to update later
      shipping: 0, // TODO: Currently no shipping, but need to update later
      financial_status: '',
      tax: 0, // Currently no tax
      total: convertPriceFromStripeFormat(totalMsrpPrice),
      shipping_information: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        email: customerInfo.email,
        company: '',
        city: shippingAddress.address.city,
        country: shippingAddress.address.country,
        state: shippingAddress.address.state,
        zip: shippingAddress.address.postal_code,
        address: shippingAddress.address.line1,
        address_2: shippingAddress.address.line2,
        method: '2 day free shipping',
      },
      tags: ['Coverland'],
    },
  };
};
