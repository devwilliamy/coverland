// Utility function to handle token success
// TODO: Fill out types
const handleHeartlandTokenSuccess = async (
  resp,
  setError,
  resetError,
  error,
  _address,
  orderNumber
) => {
  const amount = 25.0;
  resetError();
  const address = {
    name: 'William Yang',
    address: {
      city: 'Tustin',
      line1: '15211 Camden Way',
      line2: '',
      postal_code: '92782',
      state: 'CA',
      country: 'US',
    },
    firstName: 'William',
    lastName: 'Yang',
    phone: '(626) 736-8476',
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

    const additionalInformation = {
      orderNumber,
    };
    const cardInfo = {
      cardNumber: resp.details.cardNumber,
      cardBin: resp.details.cardBin,
      cardLast4: resp.details.cardLast4,
      cardType: resp.details.cardType,
      expiryMonth: resp.details.expiryMonth,
      expiryYear: resp.details.expiryYear,
      cardSecurityCode: JSON.stringify(resp.details.cardSecurityCode),
    };

    console.log('handleHeartland VERIFY FORM DEBUG:', {
      token,
      cardInfo,
      address,
      additionalInformation,
    });

    try {
      const response = await fetch('/api/heartland/credit/verify/', {
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
      // console.log('Trying to hit the Charge API ');
      // const response = await fetch('/api/heartland/credit/charge', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token,
      //     cardInfo,
      //     additionalInformation,
      //     address: address.address,
      //     amount,
      //   }),
      // });

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
