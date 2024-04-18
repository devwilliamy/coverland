import { CheckoutStep, StripeAddress } from '@/lib/types/checkout';
import { AddressElement } from '@stripe/react-stripe-js';
import { AddressMode } from '@stripe/stripe-js';
import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import BillingAddressSelection from './BillingAddressSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddressElementOptions } from '@stripe/stripe-js';
import SavedBillingAddressBox from './SavedBillingAddressBox';
import SavedBillingAddress from './SavedBillingAddress';

const options: StripeAddressElementOptions = {
  mode: 'billing' as AddressMode, // 'billing',
  allowedCountries: ['US'],
  fields: {
    phone: 'always',
  },
  display: {
    name: 'split',
  },
};

export default function BillingAddress() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const { isShippingAddressShown } = useCheckoutContext();
  console.log('isShippingAddressShown', isShippingAddressShown);
  // const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  const [address, setAddress] = useState<StripeAddress>();

  const {
    billingAddress,
    updateBillingAddress,
    isBillingSameAsShipping,
    updateIsBillingSameAsShipping,
  } = useCheckoutContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateIsBillingSameAsShipping(event.target.checked);
  };

  const handleAddressFormChange = (event) => {
    if (event.complete) {
      setIsDisabled(false);
      setAddress({
        name: event.value.name,
        address: event.value.address,
        phone: event.value.phone,
      });
    }
  };

  const handleAddressButtonClick = () => {
    setIsEditingAddress(false);
    updateBillingAddress(address);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  return (
    <>
      {isShippingAddressShown ? <div> Please fill out your shipping details above </div> : (
        <div className="">
          <div className="flex flex-row items-center pb-4">
            <input
              type="checkbox"
              checked={isBillingSameAsShipping}
              onChange={handleCheckboxChange}
            />
            <label className="pl-2">
              Billing address is the same as shipping address
            </label>
          </div>
          {!isBillingSameAsShipping && isEditingAddress ? (
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
            // !isBillingSameAsShipping && (
            <div className="mb-4">
              <SavedBillingAddress
                address={billingAddress}
                handleClick={handleEditAddress}
              />
            </div>
            // )
          )}
        </div>
      )}
    </>
  );
}
