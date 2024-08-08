import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Address,
  CreditCardData,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
} from 'globalpayments-api';
import verifyCard from '@/lib/heartland/verifyCard';
import chargeCard from '@/lib/heartland/chargeCard';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const config = new PorticoConfig();
    config.secretApiKey = process.env.HEARTLAND_SECRET_KEY ?? '';
    config.developerId = process.env.HEARTLAND_DEVELOPER_ID ?? '';
    config.versionNumber = process.env.HEARTLAND_VERSION_NUMBER ?? '';
    config.serviceUrl = 'https://cert.api2.heartlandportico.com';
    ServicesContainer.configureService(config);

    const { token, cardInfo, additionalInformation } = req.body;
    console.log('DEBUG:', { token, cardInfo });
    const card = new CreditCardData();
    card.token = token;
    const address = new Address();
    address.postalCode = '12345';

    try {
      // const response = await card
      //   .verify()
      //   .withCurrency('USD')
      //   .withAddress(address)
      //   .withRequestMultiUseToken(true)
      //   .withAllowDuplicates(true)
      //   .execute();

      const currency = 'USD';
      const amount = '17.01';
      const invoiceNumber = '123456';

      const response = await chargeCard(
        card,
        address,
        currency,
        amount,
        invoiceNumber
      );
      const txnDetailsResponse = await ReportingService.transactionDetail(
        response.transactionId
      ).execute();

      console.log(response);
      console.log(txnDetailsResponse);

      res.status(200).json({
        success: true,
        response,
        txnDetailsResponse,
        cardInfo,
        additionalInformation,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
