import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingSelection from './ShippingSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import SavedShippingBox from './SavedShippingBox';
import AddressForm from './AddressForm';
import { shippingOptions } from './ShippingOptions';
import handleTaxjarCalculation from '@/lib/checkout/handleTaxjarCalculation';
import { useCartContext } from '@/providers/CartProvider';
import { updateStripePaymentIntent } from '@/lib/stripe/paymentIntent';
import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';
import { convertPriceToStripeFormat } from '@/lib/utils/stripe';
import LoadingButton from '../ui/loading-button';
import { TaxJarApiError } from '@/lib/types/taxjar';

type ShippingProps = {
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
};

export default function Shipping({
  handleChangeAccordion,
  handleSelectTab,
}: ShippingProps) {
  // const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);
  const [isSelectingPayment, setIsSelectingPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { cartItems, getCartTotalPrice } = useCartContext();
  const {
    // isAddressComplete
    isEditingAddress,
    updateIsEditingAddress: setIsEditingAddress,
    shipping,
    shippingAddress,
    updateShippingAddress,
    isBillingSameAsShipping,
    toggleIsShippingAddressShown,
    isReadyToShip,
    updateIsReadyToShip,
    customerInfo,
    isReadyToPay,
    twoLetterStateCode,
    updateIsReadyToPay,
    setTax,
    setShowTax,
    orderId,
    orderNumber,
    paymentIntentId,
  } = useCheckoutContext();

  const { line1, line2, city, state, postal_code } = shippingAddress.address;

  // Calculates tax and updates appropriate tables and Stripe PaymentIntentID
  const handleToPayment = async () => {
    setIsLoading(true);
    setError('');

    try {
      const tax = await handleTaxjarCalculation(
        cartItems,
        shipping,
        shippingAddress,
        orderId,
        orderNumber
      );

      const orderTotal = (getCartTotalPrice() + shipping + tax).toFixed(
        2
      ) as unknown as number;
      const orderTotalStripeFormat = convertPriceToStripeFormat(orderTotal);

      await Promise.all([
        updateStripePaymentIntent({
          paymentIntentId,
          amount: orderTotalStripeFormat,
          metadata: { tax },
        }),
        updateAdminPanelOrder({ total_amount: orderTotal }, orderNumber),
      ]);

      setTax(tax);
      setShowTax(true);
      setIsEditingShipping(false);
      toggleIsShippingAddressShown(false);
      updateIsReadyToShip(true);
      handleChangeAccordion('payment');
    } catch (error: unknown) {
      console.error('Error in handleToPayment:', error);
      if (error instanceof TaxJarApiError) {
        setError(
          `TaxJar API Error (${error.status}): ${error.message}. Please verify your shipping address.`
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = () => {
    setError('');
    setShowTax(false);
    setIsEditingAddress(true);
    toggleIsShippingAddressShown(true);
    handleChangeAccordion('shipping');
    handleSelectTab('shipping');
  };
  const handleEditShipping = () => {
    setError('');
    setShowTax(false);
    setIsEditingShipping(true);
    setIsEditingAddress(true);
    updateIsReadyToShip(false);
    updateIsReadyToPay(false);
    toggleIsShippingAddressShown(true);
  };

  return (
    <div>
      {isEditingAddress && !isReadyToShip && (
        <div className="min-h-[400px]">
          <AddressForm
            addressData={shippingAddress}
            updateAddress={(address) =>
              updateShippingAddress(address, isBillingSameAsShipping)
            }
            setIsEditingAddress={setIsEditingAddress}
            handleChangeAccordion={handleChangeAccordion}
            handleSelectTab={handleSelectTab}
          />
        </div>
      )}
      {!isEditingAddress && !isReadyToShip && (
        <>
          <div className="mb-4">
            <SavedAddressBox handleClick={handleEditAddress} />
          </div>
          <ShippingSelection />
        </>
      )}
      {isReadyToShip && (
        <div className="flex justify-between">
          <div className="flex flex-col gap-[26px] text-[16px] leading-[27px] text-[#767676]">
            <section>
              <div className="font-[500] text-black">Shipping Address</div>
              <div>{shippingAddress.name}</div>
              <div>{line1}</div>
              <div>{line2}</div>
              <div>
                {city} {state} {postal_code}
              </div>
              <div>{customerInfo.email}</div>
              <div>{customerInfo.phoneNumber}</div>
            </section>
            <section className="mb-[26px]">
              <div className="font-[500] text-black">Shipping Speed</div>
              <div>{shippingOptions[0].shippingText}</div>
              <div>{shippingOptions[0].shippingEstimateText}</div>
            </section>
          </div>
          <div className="">
            <p
              onClick={handleEditShipping}
              className="cursor-pointer text-[16px] font-[500] leading-[18px] underline"
            >
              Edit
            </p>
          </div>
        </div>
      )}
      {shippingAddress && !isEditingAddress && (
        <div>
          {isEditingShipping && !isReadyToShip && (
            <div className="pb-[48px] pt-[40px] max-lg:pt-[24px]">
              <div className="flex w-full flex-col items-center justify-between  lg:items-end">
                <LoadingButton
                  className={`h-[48px] max-h-[48px] w-full cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:max-w-[307px]`}
                  isDisabled={isEditingAddress}
                  isLoading={isLoading}
                  onClick={handleToPayment}
                  buttonText={'Continue to Payment'}
                />
              </div>
              {error && (
                <p className="w-full pt-8 text-center font-medium text-[red]">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
