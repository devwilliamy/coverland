import {
  ChangeEventHandler,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import OverlappingLabel from '../ui/overlapping-label';
import { Button } from '../ui/button';
import { CustomerInfo, useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomPhoneInput from '../ui/phone-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Autocomplete, MenuItem } from '@mui/material';
import { CustomTextField } from './CustomTextField';
import { GEORGE_DEFAULT_ADDRESS_DATA } from '@/lib/constants';
import { cleanPhoneInput } from '@/app/(noFooter)/checkout/utils';

type AddressFormProps = {
  addressData: StripeAddress;
  updateAddress: (address: StripeAddress) => void;
  setIsEditingAddress: (isEditing: boolean) => void;
  isBilling?: boolean;
  handleChangeAccordion?: (accordionTitle: string) => void;
  handleSelectTab?: (id: string) => void;
};

export type ShippingStateType = {
  value: string;
  visited: boolean;
  message: string;
  error: boolean | null;
};

export type CustomFieldTypes =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'line1'
  | 'line2'
  | 'city'
  | 'state'
  | 'postal_code'
  | 'phoneNumber';

export default function AddressForm({
  addressData,
  updateAddress,
  setIsEditingAddress,
  isBilling,
  handleChangeAccordion,
  handleSelectTab,
}: AddressFormProps) {
  const {
    customerInfo,
    updateCustomerInfo,
    toggleIsShippingAddressShown,
    twoLetterStateCode,
    updateTwoLetterStateCode,
    updateBillingTwoLetterStateCode,
    isBillingSameAsShipping,
  } = useCheckoutContext();

  // TODO: Extract this to checkout context or its own context

  const [shippingState, setShippingState] = useState<
    Record<string, ShippingStateType>
  >({
    email: { value: '', visited: false, message: '', error: null },
    firstName: { value: '', visited: false, message: '', error: null },
    lastName: { value: '', visited: false, message: '', error: null },
    line1: { value: '', visited: false, message: '', error: null },
    line2: { value: '', visited: false, message: '', error: null },
    city: { value: '', visited: false, message: '', error: null },
    state: { value: '', visited: false, message: '', error: null },
    postal_code: { value: '', visited: false, message: '', error: null },
    phoneNumber: { value: '', visited: false, message: '', error: null },
  });

  useEffect(() => {
    // Populate the form fields when shippingAddress changes
    if (addressData.address.line1) {
      setShippingState({
        email: {
          value: customerInfo.email,
          visited: true,
          message: '',
          error: false,
        },
        firstName: {
          value: addressData.firstName as string,
          visited: true,
          message: '',
          error: false,
        },
        lastName: {
          value: addressData.lastName as string,
          visited: true,
          message: '',
          error: false,
        },
        line1: {
          value: addressData.address.line1 as string,
          visited: true,
          message: '',
          error: false,
        },
        line2: {
          value: addressData.address.line2 as string,
          visited: true,
          message: '',
          error: false,
        },
        city: {
          value: addressData.address.city as string,
          visited: true,
          message: '',
          error: false,
        },
        state: {
          value: addressData.address.state as string,
          visited: true,
          message: '',
          error: false,
        },
        postal_code: {
          value: addressData.address.postal_code as string,
          visited: true,
          message: '',
          error: false,
        },
        phoneNumber: {
          value: customerInfo.phoneNumber,
          visited: true,
          message: '',
          error: false,
        },
      });
    }
  }, [addressData, customerInfo]);

  const checkErrors = () => {
    for (const key in shippingState) {
      if (
        key !== 'line2' &&
        (shippingState[key].error || shippingState[key].error === null)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSaveAndContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const incStripeAddress = {
      firstName: shippingState.firstName.value,
      lastName: shippingState.lastName.value,
      name: shippingState.firstName.value + ' ' + shippingState.lastName.value,
      phone: shippingState.phoneNumber.value,
      address: {
        city: shippingState.city.value,
        line1: shippingState.line1.value,
        line2: shippingState.line2.value,
        postal_code: shippingState.postal_code.value,
        state: shippingState.state.value,
        country: 'US',
      },
    };

    // const formattedPhone = parsePhoneNumberFromString(
    //   shippingState.phoneNumber.value
    // )?.format('E.164');

    // const incCustomerInfo = {
    //   email: shippingState.email.value,
    //   phoneNumber: formattedPhone,
    // } as CustomerInfo;

    const incCustomerInfo = {
      email: shippingState.email.value,
      phoneNumber: shippingState.phoneNumber.value,
    } as CustomerInfo;

    updateAddress(incStripeAddress as StripeAddress);
    updateCustomerInfo(incCustomerInfo);
    setIsEditingAddress(false);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 flex flex-col gap-[29.5px]"
    >
      <div className="flex grid-cols-2 flex-col gap-[29.5px] lg:grid lg:gap-[14px]">
        <CustomTextField
          label="First Name"
          type="firstName"
          placeholder="First Name"
          required
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
        <CustomTextField
          label="Last Name"
          type="lastName"
          required
          placeholder="Last Name"
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
      </div>
      <CustomTextField
        label="Address"
        type="line1"
        required
        placeholder="Start typing address"
        shippingState={shippingState}
        setShippingState={setShippingState}
      />
      <CustomTextField
        label="Company, C/O, Apt, Suite, Unit"
        type="line2"
        required={false}
        placeholder="Add Company, C/O, Apt, Suite, Unit"
        shippingState={shippingState}
        setShippingState={setShippingState}
      />
      <div className="flex grid-cols-3 flex-col gap-[29.5px] lg:grid lg:gap-[14px]">
        <CustomTextField
          label="City"
          type="city"
          required
          placeholder="City"
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
        <CustomTextField
          label="State"
          type="state"
          required
          placeholder="State"
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
        <CustomTextField
          label="ZIP"
          type="postal_code"
          required
          placeholder="ZIP"
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
      </div>

      {!isBilling && (
        <div className="flex grid-cols-2 flex-col gap-[29.5px] lg:grid lg:gap-[14px]">
          <CustomTextField
            label="Email"
            type="email"
            required
            placeholder="Email"
            shippingState={shippingState}
            setShippingState={setShippingState}
          />
          <CustomTextField
            label="Phone Number"
            type="phoneNumber"
            required
            placeholder="Phone Number"
            shippingState={shippingState}
            setShippingState={setShippingState}
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={checkErrors()}
        onClick={handleSaveAndContinue}
        className={`lg:mb-[70px]p h-[48px] w-full cursor-pointer self-center rounded-lg bg-black text-base font-bold uppercase text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:max-w-[307px] lg:self-end lg:text-xl`}
      >
        Save & Continue
      </Button>
    </form>
  );
}
