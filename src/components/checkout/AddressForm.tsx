import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OverlappingLabel from '../ui/overlapping-label';
import { Button } from '../ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomPhoneInput from '../ui/phone-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  phoneNumber: string;
};

type AddressFormProps = {
  addressData: StripeAddress;
  updateAddress: (address: StripeAddress) => void;
  setIsEditingAddress: (isEditing: boolean) => void;
  showEmail: boolean;
};

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  email: z.string().email({ message: 'Please provide a valid email' }),
  // phoneNumber: z
  //   .string()
  //   .regex(
  //     /^(?:\+([0-9]{1,3})[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  //     { message: 'Please provide a valid phone number' }
  //   ),
  phoneNumber: z.string().refine(
    (value) => {
      const phoneNumber = parsePhoneNumberFromString(value, "US");
      return phoneNumber && phoneNumber.isPossible();
    },
    {
      message: 'Please provide a valid phone number',
    }
  ),
});

export default function AddressForm({
  addressData,
  updateAddress,
  setIsEditingAddress,
  showEmail,
}: AddressFormProps) {
  const { customerInfo, updateCustomerInfo, toggleIsShippingAddressShown } =
    useCheckoutContext();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    // trigger,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = handleSubmit(
    ({
      email,
      firstName,
      lastName,
      line1,
      line2,
      city,
      state,
      postal_code,
      phoneNumber,
    }) => {
      const formattedPhoneNumber =
        parsePhoneNumberFromString(phoneNumber)?.format('E.164');

      const address: StripeAddress = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        phone: formattedPhoneNumber,
        address: {
          line1,
          line2,
          city,
          state,
          postal_code,
          country: 'US',
        },
      };
      updateAddress(address as StripeAddress);
      updateCustomerInfo({ email, phoneNumber });
      setIsEditingAddress(false);
      toggleIsShippingAddressShown(false);
    }
  );

  console.log('Errors', errors);

  useEffect(() => {
    // Populate the form fields when shippingAddress changes
    if (addressData) {
      setValue('email', customerInfo.email || '');
      setValue('firstName', addressData.firstName || '');
      setValue('lastName', addressData.lastName || '');
      setValue('line1', addressData.address.line1 || '');
      setValue('line2', addressData.address.line2 || '');
      setValue('city', addressData.address.city || '');
      setValue('state', addressData.address.state || '');
      setValue('postal_code', addressData.address.postal_code || '');
      setValue('phoneNumber', customerInfo.phoneNumber || '');
    }
  }, [addressData, customerInfo, setValue]);

  return (
    <form onSubmit={onSubmit}>
      {showEmail && (
        <div className="pb-6 pt-2">
          <OverlappingLabel
            title="Email"
            name="email"
            errors={errors}
            placeholder="abc@gmail.com"
            register={register}
            options={{ required: true }}
            autoComplete="email"
          />
        </div>
      )}

      <div className="flex flex-row pb-6">
        <div className="mr-2 flex-grow">
          <OverlappingLabel
            title="First Name"
            name="firstName"
            errors={errors}
            placeholder="John"
            register={register}
            options={{ required: true }}
            autoComplete="given-name"
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
            autoComplete="family-name"
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
          autoComplete="address-line1"
        />
      </div>
      <div className="pb-6">
        <OverlappingLabel
          title="Address Line 2"
          name="line2"
          errors={errors}
          placeholder="P.O. Box 123"
          register={register}
          autoComplete="address-line2"
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
          autoComplete="address-level2"
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
            autoComplete="address-level1"
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
            autoComplete="postal-code"
          />
        </div>
      </div>
      <div className="pb-6">
        {showEmail && (
          // <OverlappingLabel
          //   title="Phone Number"
          //   name="phoneNumber"
          //   errors={errors}
          //   placeholder="+1 123 456 7890"
          //   register={register}
          //   options={{ required: true }}
          //   autoComplete="tel"
          // />
          <CustomPhoneInput
            label="Phone Number"
            name="phoneNumber"
            placeholder="+1 123 456 7890"
            autoComplete="tel"
            register={register}
            errors={errors}
            required={true}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-between lg:mt-11">
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className={`h-[48px] w-full max-w-[390px] cursor-pointer rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl`}
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
