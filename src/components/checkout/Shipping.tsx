import { StripeAddress } from '@/lib/types/checkout';
import { AddressElement } from '@stripe/react-stripe-js';
import { AddressMode } from '@stripe/stripe-js';
import { useState } from 'react';
import SavedAddressBox from './SavedAddressBox';

const options = {
  mode: 'shipping' as AddressMode, // 'billing',
  allowedCountries: ['US'],
};
export default function Shipping() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [address, setAddress] = useState<StripeAddress>();

  const handleAddressFormChange = (event) => {
    if (event.complete) {
      const address = event.value.address;
      console.log('Address:', event.value);
      setIsDisabled(false);
      setAddress({
        name: event.value.name,
        address: event.value.address,
      });
    }
  };

  const handleSaveClicked = () => {
    setIsEditing(false);
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
        address && <SavedAddressBox address={address} setIsEditing={setIsEditing}/>
      )}

      <div className="flex flex-col items-center justify-between">
        <button
          disabled={isDisabled}
          onClick={() => setIsEditing(false)}
          className={`h-[48px] w-full max-w-[390px] rounded-lg ${isDisabled ? 'bg-gray-300/90' : 'bg-black'} text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
