import cardLogo from '@/images/profile/orders/card.svg';
import { capitalizeString } from '@/lib/utils/stringFuncs';
import {
  TUserOrder,
  TInitialOrderItemsDataDB, // note I grabbed this type from supabase but it's missing card_brand and a couple other order properties. Maybe need to update our imported _Orders / _Orders_TEST table type?
} from '@/lib/db/profile/ordersHistory';

type PaymentMethod = 'link' | 'card' | 'klarna' | 'paypal' | 'default';
type WalletType = 'google_pay' | 'apple_pay';

type PaymentDetails = {
  alt: string;
  text: string;
  logo: string;
  size: number;
};

const paymentMethods: Record<PaymentMethod, PaymentDetails> = {
  // TODO: we need to store further link details (like link id, card etc. or whatever is grabbable because simply displaying One Click Link doesn't really capture customer payment details)
  link: {
    alt: '1-click Link',
    text: '1-click Link',
    logo: cardLogo,
    size: 22,
  },
  card: {
    alt: 'Card',
    text: 'Card',
    logo: '',
    size: 0,
  },
  klarna: {
    alt: 'Klarna Logo',
    text: 'Klarna',
    logo: '/images/profile/orders/klarna.svg',
    size: 35,
  },
  paypal: {
    alt: 'PayPal',
    text: 'PayPal',
    logo: '/images/profile/orders/paypal-color-icon.webp',
    size: 35,
  },
  default: {
    alt: 'Card',
    text: 'Card',
    logo: cardLogo,
    size: 22,
  },
};

const walletTypes: Record<WalletType, PaymentDetails> = {
  google_pay: {
    alt: 'Google Pay',
    text: 'Google Pay',
    logo: '/images/profile/orders/google_pay.svg',
    size: 40,
  },
  apple_pay: {
    alt: 'Apple Pay',
    text: 'Apple Pay',
    logo: '/images/profile/orders/apple_pay.svg',
    size: 35,
  },
};

/**
 *
 * @param order TUserOrder | TInitialOrderItemsDataDB (takes a general order from DB or the modified User Order)
 * @returns paymentMethod, which is an object with image logoPath, image alt, image size, and display text
 */
export const getPaymentMethodDetails = (
  order: TUserOrder | TInitialOrderItemsDataDB
): PaymentDetails => {
  let method: PaymentMethod = order.payment_method || 'default';
  if (order.payment_method === null && order.payment_gateway === 'paypal') {
    method = 'paypal';
  }
  const paymentMethod = paymentMethods[method];

  if (method === 'card' && order.card_brand) {
    switch (order.card_brand) {
      case 'visa':
        paymentMethod.logo = '/images/profile/orders/visa.svg';
        paymentMethod.size = 35;
        break;
      case 'mastercard':
        paymentMethod.logo = '/images/profile/orders/mc_symbol.svg';
        paymentMethod.size = 33;
        break;
      case 'amex':
        paymentMethod.logo = '/images/profile/orders/amex.svg';
        paymentMethod.size = 28;
        break;
      case 'discover':
        paymentMethod.logo = '/images/profile/orders/discover-icon.webp';
        paymentMethod.size = 35;
        break;
    }
    paymentMethod.alt = `${order.card_brand} Card`;
    paymentMethod.text = capitalizeString(order.card_brand) || 'Card';
  }

  if (order.wallet_type) {
    const wallet = walletTypes[order.wallet_type];
    return {
      ...paymentMethod,
      logo: wallet.logo,
      text: wallet.text,
      size: wallet.size,
    };
  }

  return paymentMethod;
};
