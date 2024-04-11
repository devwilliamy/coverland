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
import AddressForm from './AddressForm';

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

type ShippingProps = {
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
}
export default function Shipping({ handleChangeAccordion, handleSelectTab }: ShippingProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);
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

  const handleAddressButtonClick = () => {
    setIsEditingAddress(false);
  };
  const handleEditButtonClick = () => {
    setIsEditingShipping(false);
    handleSelectTab('payment');
    handleChangeAccordion('payment');
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };
  const handleEditShipping = () => {
    setIsEditingShipping(true);
  };

  return (
    <div className="px-4">
      {/* <div className="pb-7 pt-9 text-2xl font-medium lg:pt-0">Shipping</div> */}
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
        <div className="min-h-[400px]">
          <AddressElement
            options={options}
            onChange={handleAddressFormChange}
          />
          <div className="mt-4 flex flex-col items-center justify-between lg:mt-11">
            <Button
              disabled={isDisabled}
              onClick={handleAddressButtonClick}
              className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      ) : (
        // <AddressForm/>
        <div className="mb-4">
          <SavedAddressBox address={address} handleClick={handleEditAddress} />
        </div>
      )}
      {address && !isEditingAddress && (
        <div className="pt-4">
          {isEditingShipping ? (
            <div className="pb-12">
              <ShippingSelection />
              <div className="mt-4 flex flex-col items-center justify-between lg:mt-11">
                <Button
                  disabled={isDisabled}
                  onClick={handleEditButtonClick}
                  className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          ) : (
            <div className="pb-8">
              <SavedShippingBox handleClick={handleEditShipping} />
            </div>
          )}
        </div>
      )}
      {/* {(currentStep === CheckoutStep.SHIPPING ||
        isEditingAddress ||
        isEditingShipping) && (
        <div className="mt-4 flex flex-col items-center justify-between lg:mt-11">
          <Button
            disabled={isDisabled}
            onClick={handleButtonClick}
            className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
          >
            {buttonText}
          </Button>
        </div>
      )} */}
    </div>
  );
}
