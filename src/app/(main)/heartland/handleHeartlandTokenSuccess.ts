import { useCheckoutContext } from '@/contexts/CheckoutContext';

// Utility function to handle token success
const handleHeartlandTokenSuccess = async (
  resp,
  setError,
  resetError,
  error,
  _address
) => {
  //   debugger;
  console.log('INside handle heartland');
  //   const address = {};
  const amount = 0;
  resetError();
  const address = {
    name: 'William Yang',
    address: {
      city: 'Irvine',
      line1: '123 Main',
      line2: '',
      postal_code: '75024',
      state: 'IN',
      country: 'US',
    },
    firstName: 'William',
    lastName: 'Yang',
    phone: '(123) 456-7898',
  };
  console.log('Address:', address);
  console.log('Token-Success:', resp);

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
  } else {
    const token = resp.paymentReference;

    const additionalInformation = {};
    const cardInfo = {
      cardNumber: resp.details.cardNumber,
      cardBin: resp.details.cardBin,
      cardLast4: resp.details.cardLast4,
      cardType: resp.details.cardType,
      expiryMonth: resp.details.expiryMonth,
      expiryYear: resp.details.expiryYear,
      cardSecurityCode: JSON.stringify(resp.details.cardSecurityCode),
    };

    console.log('VERIFY FORM DEBUG:', {
      token,
      cardInfo,
      address,
      additionalInformation,
    });

    try {
      const response = await fetch('/api/heartland/credit/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          cardInfo,
          additionalInformation,
          address: address.address,
          amount,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed resposne:', error);
        throw new Error('Response failed');
      }

      const data = await response.json();
      console.log('Payment Successful:', data);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  }
};

export default handleHeartlandTokenSuccess;
