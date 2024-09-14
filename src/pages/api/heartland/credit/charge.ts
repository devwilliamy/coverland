import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Address,
  CreditCardData,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
  Transaction,
  TransactionSummary,
} from 'globalpayments-api';
import verifyCard from '@/lib/heartland/verifyCard';
import chargeCard from '@/lib/heartland/chargeCard';
import { convertStripeAddressToHeartlandAddress } from '@/lib/utils/heartland';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const config = new PorticoConfig();
    config.secretApiKey = process.env.HEARTLAND_SECRET_KEY ?? '';
    config.developerId = process.env.HEARTLAND_DEVELOPER_ID ?? '';
    config.versionNumber = process.env.HEARTLAND_VERSION_NUMBER ?? '';
    config.serviceUrl = process.env.HEARTLAND_API_URL ?? '';
    ServicesContainer.configureService(config);

    const { token, address, additionalInformation, amount } = req.body;
    const card = new CreditCardData();
    card.token = token;
    const heartlandAddress = convertStripeAddressToHeartlandAddress(address, 0);

    try {
      const currency = 'USD';
      const invoiceNumber = additionalInformation.orderNumber;

      const response: Transaction = await chargeCard(
        card,
        heartlandAddress,
        currency,
        amount,
        invoiceNumber
      );

      const txnDetailsResponse: TransactionSummary =
        await ReportingService.transactionDetail(
          response.transactionId
        ).execute();

      // console.info('charge card response', response);
      // console.info('txnDetailsResponse', txnDetailsResponse);

      res.status(200).json({
        success: true,
        response,
        txnDetailsResponse,
        additionalInformation,
      });
    } catch (error) {
      console.error('Charge Card Error: ', (error as Error).message);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
