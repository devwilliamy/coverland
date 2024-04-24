import { StripeAddress } from '@/lib/types/checkout';
import { AddressElement } from '@stripe/react-stripe-js';
import { AddressMode } from '@stripe/stripe-js';
import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingSelection from './ShippingSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddressElementOptions } from '@stripe/stripe-js';
import SavedShippingBox from './SavedShippingBox';
import EmailInput from './EmailInput';
import AddressForm from './AddressForm';

const options: StripeAddressElementOptions = {
  mode: 'shipping' as AddressMode, // 'billing',
  allowedCountries: ['US'],
  fields: {
    phone: 'always',
  },
  validation: {
    phone: {
      required: 'auto',
    },
  },
  display: {
    name: 'split',
  },
};

type ShippingProps = {
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
};

export default function Shipping({
  handleChangeAccordion,
  handleSelectTab,
}: ShippingProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<StripeAddress>();

  const {
    updateShippingAddress,
    isBillingSameAsShipping,
    updateCustomerEmail,
    toggleIsShippingAddressShown,
  } = useCheckoutContext();

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
    updateShippingAddress(address as StripeAddress, isBillingSameAsShipping);
    updateCustomerEmail(email);
    setIsEditingAddress(false);
    toggleIsShippingAddressShown(false);
  };
  const handleEditButtonClick = () => {
    setIsEditingShipping(false);
    toggleIsShippingAddressShown(false);
    handleSelectTab('payment');
    handleChangeAccordion('payment');
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
    toggleIsShippingAddressShown(true);
  };
  const handleEditShipping = () => {
    setIsEditingShipping(true);
    toggleIsShippingAddressShown(true);
  };

  return (
    <div className="px-4">
      {isEditingAddress ? (
        <div className="min-h-[400px]">
          {/* <EmailInput email={email} setEmail={setEmail} /> */}
          <AddressForm/>
          {/* <AddressElement
            options={options}
            onChange={handleAddressFormChange}
          /> */}
          
        </div>
      ) : (
        <div className="mb-4">
          <SavedAddressBox
            address={address as StripeAddress}
            handleClick={handleEditAddress}
          />
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
    </div>
  );
}
