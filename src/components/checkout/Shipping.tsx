import { useState } from 'react';
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
  // const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isEditingShipping, setIsEditingShipping] = useState(true);
  const [isSelectingPayment, setIsSelectingPayment] = useState(false);
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
  } = useCheckoutContext();

  const { line1, line2, city, state, postal_code } = shippingAddress.address;

  const handleToPayment = () => {
    setIsEditingShipping(false);
    toggleIsShippingAddressShown(false);
    updateIsReadyToShip(true);
    // handleSelectTab('payment');
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
            <div className="pb-[60px] pt-[40px]">
              <div className="flex w-full flex-col items-center justify-between  lg:items-end">
                <Button
                  disabled={isEditingAddress}
                  onClick={handleToPayment}
                  className={`h-[48px] w-full cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:h-[63px] lg:max-w-[390px] lg:text-xl`}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
