import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingSelection from './ShippingSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import SavedShippingBox from './SavedShippingBox';
import AddressForm from './AddressForm';

type ShippingProps = {
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
};

export default function Shipping({
  handleChangeAccordion,
  handleSelectTab,
}: ShippingProps) {
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);

  const {
    shippingAddress,
    updateShippingAddress,
    isBillingSameAsShipping,
    toggleIsShippingAddressShown,
  } = useCheckoutContext();

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
          <AddressForm
            addressData={shippingAddress}
            updateAddress={(address) =>
              updateShippingAddress(address, isBillingSameAsShipping)
            }
            setIsEditingAddress={setIsEditingAddress}
            showEmail
          />
        </div>
      ) : (
        <div className="mb-4">
          <SavedAddressBox handleClick={handleEditAddress} />
        </div>
      )}
      {shippingAddress && !isEditingAddress && (
        <div className="pt-4">
          {isEditingShipping ? (
            <div className="pb-12">
              <ShippingSelection />
              <div className="mt-4 flex flex-col items-center justify-between lg:mt-11">
                <Button
                  disabled={isEditingAddress}
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
