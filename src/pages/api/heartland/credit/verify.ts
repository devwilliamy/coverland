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

    try {
      const response = await verifyCard(card, address);

      // Not sure if we need txn details. Will leave here while I contemplate.
      // const txnDetailsResponse: HeartlandTransactionDetails = await ReportingService.transactionDetail(
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
