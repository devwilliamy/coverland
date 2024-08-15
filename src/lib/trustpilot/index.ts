import { TCartItem } from '../cart/useCart';
import { slugify } from '../utils';
import { generateItemName } from '../utils/stripe';

type TrustPilotProduct = {
  productUrl: string;
  imageUrl: string;
  name: string;
  sku: string;
  gtin: string;
  mpn?: string;
  brand?: string;
  productCategoryGoogleId?: string;
};

type TrustPilotReviewInvitation = {
  recipientName: string;
  recipientEmail: string;
  referenceId: string;
  productReviewInvitationPreferredSendTime?: string; // used if we want to send review during separate time
  productReviewInvitationTemplateId?: string; // used if we have a special template, but TrustPilot recommends using their default one first
  products: TrustPilotProduct[];
};

export const generateTrustPilotPayload = (
  name: string,
  email: string,
  orderNumber: string,
  cartItems: TCartItem[]
): TrustPilotReviewInvitation => {
  return {
    recipientName: name,
    recipientEmail: email,
    referenceId: orderNumber,
    // productReviewInvitationPreferredSendTime: '2018-12-25T13:00:00',
    // productReviewInvitationTemplateId: 'insert your product review template ID',
    products: generateTrustPilotProducts(cartItems),
  };
};

const generateTrustPilotProducts = (cartItems: TCartItem[]) => {
  return cartItems.map((item) => {
    const { product, sku, gtin, mpn } = item;
    return {
      productUrl: generateProductUrl(item),
      imageUrl: product?.split(',')[0] || '',
      name: generateItemName(item),
      sku: sku || '',
      gtin: gtin || '',
      mpn: mpn || '',
      brand: 'Coverland',
    };
  });
};

const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString().toLowerCase();
};

/**
 * Takes cart item and generates website URL from it
 * @param cartItem
 * @returns
 */
const generateProductUrl = (cartItem: TCartItem) => {
  // const host = process.env.NEXT_PUBLIC_HOSTNAME;
  const host = "https://coverland.com"; // Will just default this to Coverland
  const type = cartItem?.type ?? '';
  const make = cartItem?.make ?? '';
  const model = cartItem?.model ?? '';
  const parent_generation = cartItem?.parent_generation;
  const submodel1 = cartItem?.submodel1 ?? '';
  const submodel2 = cartItem?.submodel2 ?? '';
  const submodel3 = cartItem?.submodel3 ?? '';
  const determineType = type !== 'Seat Covers' ? 'premium-plus' : 'leather';
  let url = `${host}/${slugify(type)}/${determineType}/${slugify(make)}/${slugify(model)}/${parent_generation}`;
  if (submodel1) {
    url += `?${createQueryString('submodel', submodel1)}`;
  }
  if (submodel2) {
    url += `&${createQueryString('submodel2', submodel2)}`;
  }
  if (submodel3) {
    url += `&${createQueryString('submodel3', submodel3)}`;
  }
  return url;
};
