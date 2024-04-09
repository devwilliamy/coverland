import { CheckoutStep, StripeAddress } from '@/lib/types/checkout';
import { AddressElement } from '@stripe/react-stripe-js';
import { AddressMode } from '@stripe/stripe-js';
import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingOptions from './ShippingOptions';
import { Button } from '../ui/button';

const options = {
  mode: 'shipping' as AddressMode, // 'billing',
  allowedCountries: ['US'],
  fields: {
    phone: 'always',
  },
  display: {
    name: 'split',
  },
};

export default function Shipping({ setCurrentStep }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [address, setAddress] = useState<StripeAddress>();

  const handleAddressFormChange = (event) => {
    if (event.complete) {
      setIsDisabled(false);
      setAddress({
        name: event.value.name,
        address: event.value.address,
      });
    }
  };

  const buttonText = isEditing ? 'Save & Continue' : 'Continue to Payment';
  const handleButtonClick = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    if (!isEditing && !isDisabled) {
      setCurrentStep(CheckoutStep.PAYMENT);
    }
  };
  return (
    <div className="px-4">
      <div className="pb-7 pt-9 text-2xl font-medium">Shipping</div>
      {/* <LinkAuthenticationElement
            // Access the email value like so:
            // onChange={(event) => {
            //  setEmail(event.value.email);
            // }}
            //
            // Prefill the email field like so:
            // options={{defaultValues: {email: 'foo@bar.com'}}}
          /> */}
      {isEditing ? (
        <AddressElement options={options} onChange={handleAddressFormChange} />
      ) : (
        address && (
          <>
            <div className="mb-12">
              <SavedAddressBox address={address} setIsEditing={setIsEditing} />
            </div>
            <div className="pb-[52px]">
              <ShippingOptions />
            </div>
          </>
        )
      )}

      <div className="flex flex-col items-center justify-between lg:mt-11">
        <Button
          disabled={isDisabled}
          onClick={handleButtonClick}
          className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
