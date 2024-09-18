// Utility function to handle token success
import { StripeAddress } from '@/lib/types/checkout';
import {
  HeartlandCreditCardFieldError,
  HeartlandPaymentDetailsResponse,
} from '@/lib/types/heartland';
import { cardIsExpired } from '@/lib/utils/date';

const handleHeartlandTokenSuccess = async (
  resp: HeartlandPaymentDetailsResponse,
  setError: React.Dispatch<React.SetStateAction<HeartlandCreditCardFieldError>>,
  resetError: () => void,
  error: HeartlandCreditCardFieldError,
  address: StripeAddress
) => {
  resetError();
  if (!resp.details.cardSecurityCode) {
    setError({
      ...error,
      cardCvv: 'CVV is required!',
    });
  } else if (!resp.details.expiryMonth || !resp.details.expiryYear) {
    setError({
      ...error,
      cardExp: 'Expiry date is required!',
    });
  } else if (cardIsExpired(resp.details.expiryMonth, resp.details.expiryYear)) {
    console.log('Card is expired');
    setError({
      ...error,
      cardExp: "Your card's expiration year is in the past.",
    });
  }
  // Will see if need verify code. If still unused, just remove.
  // else {
  //   const token = resp.paymentReference;

  //   try {
  //     const response = await fetch('/api/heartland/credit/verify/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         token,
  //         address: address.address,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const error = await response.json();
  //       console.error('Failed response:', error);
  //       throw error.error;
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     if (error.includes('-21')) {
  //       return {
  //         response: {
  //           responseCode: '-21',
  //           responseMessage: 'Zip code is required for this cardtype',
  //         },
  //       };
  //     }
  //   }
  // }
};

export default handleHeartlandTokenSuccess;
