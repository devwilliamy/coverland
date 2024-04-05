import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { Button } from '../ui/button';

export default function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement('card');

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post('/api/create-payment-intent', {
        data: { amount: 89 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <LinkAuthenticationElement id="link-authentication-element"/>
      <PaymentElement />
      <Button>Checkout</Button>
    </form>
  );
}
