import { Address, CreditCardData } from 'globalpayments-api';

const verifyCard = async (card: CreditCardData, address?: Address) => {
  const response = await card
    .verify()
    .withCurrency('USD')
    .withAddress(address)
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute();
  return response;
};

export default verifyCard;
