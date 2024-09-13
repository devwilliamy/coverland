import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreditCardData,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
} from 'globalpayments-api';
import verifyCard from '@/lib/heartland/verifyCard';
import { convertStripeAddressToHeartlandAddress } from '@/lib/utils/heartland';
import { HeartlandTransactionDetailsSummary } from '@/lib/types/heartland';

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
    // console.info('VerifyCard Card:', card);
    const heartlandAddress = convertStripeAddressToHeartlandAddress(address, 1);
    try {
      const response = await verifyCard(card, heartlandAddress);

      // Not sure if we need txn details. Will leave here while I contemplate.
      const txnDetailsResponse: HeartlandTransactionDetailsSummary =
        await ReportingService.transactionDetail(
          response.transactionId
        ).execute();

      console.log('Verify Responses:', { response, txnDetailsResponse });

      res.status(200).json({
        success: true,
        response,
        // txnDetailsResponse,
      });
    } catch (error) {
      console.error('Verify Error: ', error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
