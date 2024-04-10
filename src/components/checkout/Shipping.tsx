import { CheckoutStep, StripeAddress } from '@/lib/types/checkout';
import { AddressElement } from '@stripe/react-stripe-js';
import { AddressMode } from '@stripe/stripe-js';
import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingSelection from './ShippingSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddressElementOptions } from '@stripe/stripe-js';
import SavedShippingBox from './SavedShippingBox';

const options: StripeAddressElementOptions = {
  mode: 'shipping' as AddressMode, // 'billing',
  allowedCountries: ['US'],
  fields: {
    phone: 'always',
  },
  display: {
    name: 'split',
  },
};

type ShippingPriceOption = 0.0 | 29.99;

type ShippingInfo = 'ADDRESS' | 'SHIPPING_OPTION' | 'NONE';

export default function Shipping({ handleSelectTab }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>('ADDRESS');
  const [address, setAddress] = useState<StripeAddress>();
  const [shippingPrice, setShippingPrice] = useState<ShippingPriceOption>();
  const { currentStep, setCurrentStep } = useCheckoutContext();

  const handleAddressFormChange = (event) => {
    if (event.complete) {
      setIsDisabled(false);
      setAddress({
        name: event.value.name,
        address: event.value.address,
      });
    }
  };

  const buttonText = isEditingAddress
    ? 'Save & Continue'
    : 'Continue to Payment';
  const handleButtonClick = () => {
    if (isEditingAddress && shippingInfo === 'ADDRESS') {
      setIsEditingAddress(false);
      setShippingInfo('SHIPPING_OPTION');
    }

    if (isEditingShipping && shippingInfo === 'SHIPPING_OPTION') {
      setIsEditingShipping(false);
      setShippingInfo('NONE');
      handleSelectTab('payment');
    }

    if (!isEditingAddress && !isDisabled) {
      if (currentStep !== CheckoutStep.PAYMENT) {
        handleSelectTab('payment');
      }
      setCurrentStep(CheckoutStep.PAYMENT);
      setShippingInfo('NONE');
    }
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
    setShippingInfo('ADDRESS');
  };
  const handleEditShipping = () => {
    setIsEditingShipping(true);
    setShippingInfo('SHIPPING_OPTION');
  };
  return (
    <div className="px-4">
      <div className="pb-7 pt-9 text-2xl font-medium lg:pt-0">Shipping</div>
      {/* <LinkAuthenticationElement
            // Access the email value like so:
            // onChange={(event) => {
            //  setEmail(event.value.email);
            // }}
            //
            // Prefill the email field like so:
            // options={{defaultValues: {email: 'foo@bar.com'}}}
          /> */}
      {isEditingAddress ? (
        <AddressElement options={options} onChange={handleAddressFormChange} />
      ) : (
        address && (
          <>
            <div className="mb-4">
              <SavedAddressBox
                address={address}
                handleClick={handleEditAddress}
              />
            </div>
            {isEditingShipping ? (
              <div className="pb-12">
                <ShippingSelection />
              </div>
            ) : (
              <div className="pb-4">
                <SavedShippingBox handleClick={handleEditShipping} />
              </div>
            )}
          </>
        )
      )}
      {(currentStep === CheckoutStep.SHIPPING ||
        isEditingAddress ||
        isEditingShipping) && (
        <div className="flex flex-col items-center justify-between lg:mt-11">
          <Button
            disabled={isDisabled}
            onClick={handleButtonClick}
            className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
