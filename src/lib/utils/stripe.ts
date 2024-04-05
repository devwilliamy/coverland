// NlSkeS0v is 99% off for Dev testing, UQpfBHt7 is 100% off

import { TCartItem } from '../cart/useCart';

// fnUHD0s8 is 99% off for Prod (for Google Tag Testing)
const devPromoCodes = ['UQpfBHt7', 'NlSkeS0v'];

export const checkPromoCode = (promoCode: string, isDev: boolean): boolean => {
  return isDev ? devPromoCodes.includes(promoCode) : promoCode === 'fnUHD0s8';
};

/**
 * CL-240405-CC-AA01

    CL (Brand), 240405(YYMMDD), CC (Car Cover), AA01 (Unique number. AA02 to AA99 and then AB01)

    Regarding the one after the date, here is the initials
    CC for Car Covers
    SC for SUV Covers
    TC for Truck Covers
    SE for Seat Covers
    AC for Accessories
    NX for Mixed
    CL-240405-MX-AA01

 * 
 * 
 * 
 * 
 */
export const generateOrderId = (
  items: TCartItem[],
  uniqueNumber: string
): string => {
  const brand = 'CL'; // Constant brand prefix
  const date = formatDate(new Date()); // Current date in YYMMDD format
  const productInitials = getProductInitials(items); // Initials based on item type

  return `${brand}-${date}-${productInitials}-${uniqueNumber}`;
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

export const getProductInitials = (items: TCartItem[]): string => {
  const types = new Set(items.map((item) => item.type));

  if (types.size === 1) {
    // If all items have the same type
    return getProductInitialsForType(items[0].type as string);
  } else {
    // If there are multiple types
    return 'MX';
  }
};

export const getProductInitialsForType = (type: string): string => {
  switch (type) {
    case 'Car Covers':
      return 'CC';
    case 'SUV Covers':
      return 'SC';
    case 'Truck Covers':
      return 'TC';
    case 'Seat Covers':
      return 'SE';
    case 'Accessories':
      return 'AC';
    default:
      return 'MX';
  }
};
