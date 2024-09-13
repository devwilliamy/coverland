import { Address, CreditCardData, Transaction } from 'globalpayments-api';

/**
 *
 * @param card
 * @param address
 * @param currency USD
 * @param amount 17.01
 * @param invoiceNumber CL-TEST-...
 * @returns
 */
const chargeCard = async (
  card: CreditCardData,
  address: Address,
  currency: string = 'USD',
  amount: string,
  invoiceNumber: string
): Promise<Transaction> => {
  const response = await card
    .charge()
    .withCurrency(currency)
    .withAmount(amount)
    .withAddress(address)
    .withInvoiceNumber(invoiceNumber)
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute();
  return response;
};

export default chargeCard;