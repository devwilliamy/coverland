import { CustomerInfo } from '@/contexts/CheckoutContext';
import { TCartItem } from '../cart/useCart';
import { StripeAddress } from '../types/checkout';
import { getCurrentDateInPST } from './date';

// Define the type for items within the stash
type SkuLabItem = {
  quantity: number;
  price: number;
  type: string;
  id?: string; // temp optional
  lineSku?: string; // temp optional
  lineName?: string; // temp optional
};

// Define the type for shipping information within the stash
type SkuLabShippingInformation = {
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  address: string;
  address_2: string;
  method: string;
};

// Define the type for the stash itself
type SkuLabStash = {
  store_id: string;
  type: string;
  id: string;
  notes: string;
  date: string;
  items: SkuLabItem[];
  discount: number;
  shipping: number;
  financial_status: string;
  tax: number;
  total: number;
  shipping_information: SkuLabShippingInformation;
  tags: string[];
};

// Define the type for the main structure
type SkuLabOrderDTO = {
  store_id: string;
  order_number: string;
  stash: SkuLabStash;
};

type SkuLabOrderInput = {
  orderNumber: string;
  cartItems: TCartItem[];
  totalMsrpPrice: number;
  shippingAddress: StripeAddress;
  customerInfo: CustomerInfo;
  paymentMethod: string;
};

// 
/**
 * Generates the note for SKU Labs so CSRs can see SKU, item name, and quantity
 * @param cartItems 
 * @returns 
 */
const generateNote = (cartItems: TCartItem[], paymentMethod: string) => {
  const skuNameQuantity = cartItems.map((cartItem: TCartItem) => {
    const itemName =
      `${cartItem?.year_generation || ''} ${cartItem?.make || ''} ${cartItem?.model || ''} ${
        cartItem?.submodel1 ? cartItem?.submodel1 : ''
      } ${cartItem?.submodel2 ? cartItem?.submodel2 : ''}  ${cartItem?.submodel3 ? cartItem?.submodel3 : ''} ${cartItem.type} ${cartItem?.display_id} ${
        cartItem?.display_color
      }`
        .replace(/\s+/g, ' ')
        .trim();
    return `Payment Method: ${paymentMethod} ${cartItem.sku} ${itemName} Quantity: ${cartItem.quantity}`;
  });

  return skuNameQuantity.join('\n');
};

export const generateSkuLabOrderInput = ({
  orderNumber,
  cartItems,
  totalMsrpPrice,
  shippingAddress,
  customerInfo,
  paymentMethod
}: SkuLabOrderInput): SkuLabOrderDTO => {
  const notes = generateNote(cartItems, paymentMethod);
  return {
    store_id: '62f0fcbffc3f4e916f865d6a', // Hard Coded for now
    order_number: orderNumber,
    stash: {
      store_id: '62f0fcbffc3f4e916f865d6a', // Hard Coded for now, must match store_id higher up
      type: 'manual',
      id: orderNumber,
      notes: notes,
      date: getCurrentDateInPST() as string,
      items: cartItems.map((cartItem) => ({
        quantity: cartItem.quantity as number,
        price: cartItem.msrp as number,
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
      total: totalMsrpPrice,
      shipping_information: {
        name: shippingAddress.name,
        phone: shippingAddress.phone || '',
        email: customerInfo.email,
        company: '',
        city: shippingAddress.address.city || '',
        country: shippingAddress.address.country,
        state: shippingAddress.address.state || '',
        zip: shippingAddress.address.postal_code || '',
        address: shippingAddress.address.line1 || '',
        address_2: shippingAddress.address.line2 || '',
        method: '2 day free shipping',
      },
      tags: ['Coverland'],
    },
  };
};
