import { Dispatch, SetStateAction, useState } from 'react';
import SavedAddressBox from './SavedAddressBox';
import ShippingSelection from './ShippingSelection';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import SavedShippingBox from './SavedShippingBox';
import AddressForm from './AddressForm';
import { shippingOptions } from './ShippingOptions';

type ShippingProps = {
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
};

export default function Shipping({
  handleChangeAccordion,
  handleSelectTab,
}: ShippingProps) {
  const [isEditingShipping, setIsEditingShipping] = useState(true);

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
    updateIsReadyToPay,
  } = useCheckoutContext();

  const handleToPayment = () => {
    setIsEditingShipping(false);
    toggleIsShippingAddressShown(false);
    updateIsReadyToShip(true);
    handleSelectTab('payment');
    handleChangeAccordion('payment');
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
    toggleIsShippingAddressShown(true);
    handleChangeAccordion('shipping');
    handleSelectTab('shipping');
  };
  const handleEditShipping = () => {
    setIsEditingShipping(true);
    setIsEditingAddress(true);
    updateIsReadyToShip(false);
    updateIsReadyToPay(false);
    toggleIsShippingAddressShown(true);
  };

  const { line1, line2, city, state, postal_code } = shippingAddress.address;

  const selectedIndex = shippingOptions.findIndex(
    (shippingOption) => shippingOption.price === shipping
  );
  return (
    <div className="px-4">
      {!isReadyToShip ? (
        isEditingAddress ? (
          <div className="min-h-[400px]">
            <AddressForm
              addressData={shippingAddress}
              updateAddress={(address) => {
                updateShippingAddress(address, isBillingSameAsShipping);
                // console.log({ address });
              }}
              setIsEditingAddress={setIsEditingAddress}
              showEmail
            />
          </div>
        ) : (
          <div className="mb-4">
            <SavedAddressBox handleClick={handleEditAddress} />
          </div>
        )
      ) : (
        <section className="flex justify-between">
          <div className="">
            <div className="text-base font-medium">Shipping Address</div>
            <div className="pb-[26px] text-base font-[400] leading-[27px] text-[#767676]">
              <div>{shippingAddress.name}</div>
              <div>{line1}</div>
              <div>{line2}</div>
              <div>
                {city} {state} {postal_code}
              </div>
              <div>{customerInfo.email}</div>
              <div>{customerInfo.phoneNumber}</div>
            </div>
            <div className="text-base font-medium">
              Select Your Shipping Option
            </div>
            <div className="text-base font-[400] leading-[27px] text-[#767676]">
              <div>{shippingOptions[selectedIndex].shippingText}</div>
              <div>{shippingOptions[selectedIndex].upsText}</div>
            </div>
          </div>
          <div>
            <p
              className="cursor-pointer font-[500] underline hover:text-[#0C87B8]"
              onClick={handleEditShipping}
            >
              Edit
            </p>
          </div>
        </section>
      )}
      {shippingAddress && !isEditingAddress && !isReadyToShip && (
        <div className="pt-4">
          {isEditingShipping ? (
            <div className="pb-12">
              <ShippingSelection />
              <div className="mt-4 flex flex-col items-center justify-between lg:mt-11">
                <Button
                  disabled={isEditingAddress}
                  onClick={handleToPayment}
                  className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <SavedShippingBox handleClick={handleEditShipping} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
