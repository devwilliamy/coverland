import { useState } from 'react';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import SavedBillingAddress from './SavedBillingAddress';
import AddressForm from './AddressForm';

type BillingAddressProps = {
  isEditingAddress: boolean;
  setIsEditingAddress: (isEditing: boolean) => void;
};

export default function BillingAddress({
  isEditingAddress,
  setIsEditingAddress,
}: BillingAddressProps) {
  const { isShippingAddressShown } = useCheckoutContext();

  const {
    billingAddress,
    updateBillingAddress,
    isBillingSameAsShipping,
    updateIsBillingSameAsShipping,
  } = useCheckoutContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateIsBillingSameAsShipping(event.target.checked);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  return (
    <>
      {isShippingAddressShown ? (
        <div> Please fill out your shipping details above </div>
      ) : (
        <div className="">
          <div className="flex flex-row items-center pb-4">
            <input
              type="checkbox"
              className="bg-black fill-black text-black"
              checked={isBillingSameAsShipping}
              onChange={handleCheckboxChange}
            />
            <label className="pl-2">
              Billing address is the same as shipping address
            </label>
          </div>
          {!isBillingSameAsShipping && isEditingAddress ? (
            <div className="min-h-[400px]">
              <AddressForm
                addressData={billingAddress}
                updateAddress={updateBillingAddress}
                setIsEditingAddress={setIsEditingAddress}
                isBilling
              />
            </div>
          ) : (
            <SavedBillingAddress
              address={billingAddress}
              handleClick={handleEditAddress}
            />
          )}
        </div>
      )}
    </>
  );
}
