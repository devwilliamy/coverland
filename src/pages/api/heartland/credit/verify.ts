import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Address,
  CreditCardData,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
  TransactionSummary,
} from 'globalpayments-api';
import verifyCard from '@/lib/heartland/verifyCard';
import { StripeAddress } from '@/lib/types/checkout';
import { StripeCustomCheckoutAddress } from '@stripe/stripe-js';

const convertStripeAddressToHeartlandAddress = (
  address: StripeCustomCheckoutAddress
): Address => {
  return {
    type: 1,
    streetAddress1: address.line1 || '',
    streetAddress2: address.line2 || '',
    streetAddress3: '',
    city: address.city || '',
    state: address.state || '',
    province: address.state || '',
    postalCode: address.postal_code || '',
    country: address.country || '',
    countryCode: address.country || '',
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const config = new PorticoConfig();
    config.secretApiKey = process.env.HEARTLAND_SECRET_KEY ?? '';
    config.developerId = process.env.HEARTLAND_DEVELOPER_ID ?? '';
    config.versionNumber = process.env.HEARTLAND_VERSION_NUMBER ?? '';
    config.serviceUrl = process.env.HEARTLAND_API_URL ?? '';
    ServicesContainer.configureService(config);

    const { token, address } = req.body;
    const card = new CreditCardData();
    card.token = token;
    const heartlandAddress = convertStripeAddressToHeartlandAddress(address);
    try {
      const response = await verifyCard(card, heartlandAddress);

      // Not sure if we need txn details. Will leave here while I contemplate.
      // const txnDetailsResponse: HeartlandTransactionDetailsSummary = await ReportingService.transactionDetail(
      //   response.transactionId
      // ).execute();

      res.status(200).json({
        success: true,
        response,
        // txnDetailsResponse,
      });
    } catch (error) {
      console.error('Verify Error:', error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
