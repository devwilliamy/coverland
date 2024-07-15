import Image from 'next/image';
import VisaBlue from '@/images/checkout/VisaLogoBlue.webp';
import Mastercard from '@/images/checkout/MastercardIcon.webp';
import AMEX from '@/images/checkout/AMEX-Logo.webp';
import Diners from '@/images/checkout/DCI_Logo.webp';
import Discover from '@/images/checkout/DiscoverLogo.webp';
import JCB from '@/images/checkout/JCB-LOGO.webp';
import UnionPay from '@/images/checkout/UnionPayLogo.webp';
import CheckoutCard from './icons/CheckoutCard';

export const SelectedCardLogo = ({ brand }: { brand: string }) => {
  // Card Brand can be: `amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`
  const determineBrandLogo = () => {
    switch (brand) {
      case 'amex':
        return <Image alt="American Express" src={AMEX} />;
      case 'diners':
        return <Image alt="Diners Club International" src={Diners} />;
      case 'discover':
        return <Image alt="Discover Card" src={Discover} />;
      case 'mastercard':
        return <Image alt="Mastercard" src={Mastercard} />;
      case 'jcb':
        return <Image alt="JCB" src={JCB} />;
      case 'unionpay':
        return <Image alt="Union Pay" src={UnionPay} />;
      case 'visa':
        return <Image alt="Visa" src={VisaBlue} />;
      default:
        return <CheckoutCard />;
    }
  };

  return <div>{determineBrandLogo()}</div>;
};
