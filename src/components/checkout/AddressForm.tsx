import { useState } from 'react';
import { useForm } from 'react-hook-form';
import OverlappingLabel from '../ui/overlapping-label';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';

type FormData = {
  firstName: string;
  lastName: string;
};

export default function AddressForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const {
    updateShippingAddress,
    isBillingSameAsShipping,
    updateCustomerEmail,
    toggleIsShippingAddressShown,
  } = useCheckoutContext();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log('Data:', data);
    const {
      email,
      firstName,
      lastName,
      line1,
      line2,
      city,
      state,
      postal_code,
    } = data;
    const address: StripeAddress = {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      address: {
        line1,
        line2,
        city,
        state,
        postal_code,
        country: 'US',
      },
    };
    updateShippingAddress(address as StripeAddress, isBillingSameAsShipping);
    updateCustomerEmail(email);
    setIsEditingAddress(false);
    toggleIsShippingAddressShown(false);
  });
  const handleAddressButtonClick = () => {
    updateShippingAddress(address as StripeAddress, isBillingSameAsShipping);
    updateCustomerEmail(email);
    setIsEditingAddress(false);
    toggleIsShippingAddressShown(false);
  };
  console.log('Errors', errors);

  return (
    <form onSubmit={onSubmit}>
      <div className="pb-6 pt-2">
        <OverlappingLabel
          title="Email"
          name="email"
          errors={errors}
          placeholder="abc@gmail.com"
          register={register}
          options={{ required: true }}
        />
      </div>
      <div className="flex flex-row pb-6">
        <div className="mr-2 flex-grow">
          <OverlappingLabel
            title="First Name"
            name="firstName"
            errors={errors}
            placeholder="John"
            register={register}
            options={{ required: true }}
          />
        </div>
        <div className="ml-2 flex-grow">
          <OverlappingLabel
            title="Last Name"
            name="lastName"
            errors={errors}
            placeholder="Smith"
            register={register}
            options={{ required: true }}
          />
        </div>
      </div>
      <div className="pb-6">
        <OverlappingLabel
          title="Address Line 1"
          name="line1"
          errors={errors}
          placeholder="123 Main Street"
          register={register}
          options={{ required: true }}
        />
      </div>
      <div className="pb-6">
        <OverlappingLabel
          title="Address Line 2"
          name="line2"
          errors={errors}
          placeholder="P.O. Box 123"
          register={register}
        />
      </div>
      <div className="pb-6">
        <OverlappingLabel
          title="City"
          name="city"
          errors={errors}
          placeholder="Los Angeles"
          register={register}
          options={{ required: true }}
        />
      </div>
      <div className="flex flex-row pb-6">
        <div className="mr-2 flex-grow">
          <OverlappingLabel
            title="State"
            name="state"
            errors={errors}
            placeholder="CA"
            register={register}
            options={{ required: true }}
          />
        </div>
        <div className="ml-2 flex-grow">
          <OverlappingLabel
            title="ZIP"
            name="postal_code"
            errors={errors}
            placeholder="91801"
            register={register}
            options={{ required: true }}
          />
        </div>
      </div>
      <div className="pb-6">
        <OverlappingLabel
          title="Phone Number"
          name="phoneNumber"
          errors={errors}
          placeholder="(000) 000-0000"
          register={register}
          options={{ required: true }}
        />
      </div>
      <div className="flex flex-col items-center justify-between lg:mt-11">
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          onClick={handleAddressButtonClick}
          className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
