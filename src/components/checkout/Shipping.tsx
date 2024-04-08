import { AddressElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const options = {
  mode: 'shipping', // 'billing',
  allowedCountries: ['US'],
};
export default function Shipping() {
  const [isDisabled, setIsDisabled] = useState(true);
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
      <AddressElement
        options={options}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
            console.log('Address:', address);
            setIsDisabled(false);
          }
        }}
        // Access the address like so:
        // onChange={(event) => {
        //   setAddressState(event.value);
        // }}
      />
      <div className="flex flex-col items-center justify-between">
        <button
          disabled={isDisabled}
          className={`h-[48px] w-full max-w-[390px] rounded-lg ${isDisabled ? 'bg-gray-300/90' : 'bg-black'} text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
