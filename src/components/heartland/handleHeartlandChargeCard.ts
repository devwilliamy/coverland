import { StripeAddress } from '@/lib/types/checkout';
import { Transaction, TransactionSummary } from 'globalpayments-api';

type HeartlandCreditChargeResponse = {
  success: boolean;
  response: Transaction;
  txnDetailsResponse: TransactionSummary;
  additionalInformation: {
    orderNumber: string;
  };
};
const handleHeartlandChargeCard = async (
  address: StripeAddress,
  orderNumber: string,
  cardToken: string,
  amount: number
) => {
  const token = cardToken;
  const additionalInformation = {
    orderNumber,
  };

  try {
    const response = await fetch('/api/heartland/credit/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        additionalInformation,
        address: address.address,
        amount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      //   console.error('Failed response:', error);
      throw error;
    }

    const data: HeartlandCreditChargeResponse = await response.json();
    // console.info('Payment Successful: ', data);
    return data;
  } catch (error) {
    // console.error('Payment failed:', error);
    throw error;
  }
};

export default handleHeartlandChargeCard;
