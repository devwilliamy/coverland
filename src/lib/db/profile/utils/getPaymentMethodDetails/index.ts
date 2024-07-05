import cardLogo from '@/images/profile/orders/card.svg';
import { capitalizeString } from '@/lib/utils/stringFuncs';

export const getPaymentMethodDetails = (order) => {
    const paymentMethods = {
      link: {
        alt: 'Card Link',
        text: 'Card Link',
        logo: '/images/profile/orders/card.svg',
        size: 22,
      },
      card: {
        alt: `${order.card_brand} Card`,
        text: capitalizeString(order.card_brand) || 'Card',
        brandLogos: {
          visa: { logo: '/images/profile/orders/visa.svg', size: 35 },
          mastercard: {
            logo: '/images/profile/orders/mc_symbol.svg',
            size: 33,
          },
          amex: { logo: '/images/profile/orders/amex.svg', size: 28 },
          discover: {
            logo: '/images/profile/orders/discover-icon.webp',
            size: 35,
          },
        },
      },
      klarna: {
        alt: 'Klarna Logo',
        text: capitalizeString(order.payment_method) || 'Klarna',
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

    const walletTypes = {
      google_pay: {
        text: 'Google Pay',
        logo: '/images/profile/orders/google_pay.svg',
        size: 40,
      },
      apple_pay: {
        text: 'Apple Pay',
        logo: '/images/profile/orders/apple_pay.svg',
        size: 35,
      },
    };

    const method =
      order.payment_method ||
      (order.payment_gateway === 'paypal' ? 'paypal' : 'default');
    const paymentMethod = paymentMethods[method] || paymentMethods.default;

    if (method === 'card' && order.card_brand) {
      const brandDetails = paymentMethod.brandLogos[order.card_brand];
      if (brandDetails) {
        paymentMethod.logo = brandDetails.logo;
        paymentMethod.size = brandDetails.size;
      }
    }

    // note for apple pay and google pay, the order also has a credit card type but I am overwriting it with the wallet type
    if (order.wallet_type && walletTypes[order.wallet_type]) {
      const wallet = walletTypes[order.wallet_type];
      paymentMethod.logo = wallet.logo;
      paymentMethod.text = wallet.text;
      paymentMethod.size = wallet.size;
    }

    return paymentMethod;
  };