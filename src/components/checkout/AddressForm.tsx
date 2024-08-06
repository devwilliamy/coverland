import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CustomerInfo, useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';
import { CustomTextField } from './CustomTextField';
import { updateOrdersShipping } from '@/lib/db/orders/updateOrders';
import { cleanString } from '@/lib/utils/stringHelpers';

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
    orderNumber,
  } = useCheckoutContext();

  // TODO: Extract this to checkout context or its own context

  const [shipping, setShipping] = useState<Record<string, ShippingStateType>>({
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
      setShipping({
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
    for (const key in shipping) {
      if (
        key !== 'line2' &&
        (shipping[key].error || shipping[key].error === null)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSaveAndContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stripeAddress = {
      firstName: cleanString(shipping.firstName.value),
      lastName: cleanString(shipping.lastName.value),
      name:
        cleanString(shipping.firstName.value) +
        ' ' +
        cleanString(shipping.lastName.value),
      phone: cleanString(shipping.phoneNumber.value),
      address: {
        city: cleanString(shipping.city.value),
        line1: cleanString(shipping.line1.value),
        line2: cleanString(shipping.line2.value),
        postal_code: cleanString(shipping.postal_code.value),
        state: cleanString(shipping.state.value),
        country: 'US',
      },
    };

    const customerInfo = {
      email: cleanString(shipping.email.value),
      phoneNumber: cleanString(shipping.phoneNumber.value),
    } as CustomerInfo;

    updateAddress(stripeAddress as StripeAddress);
    updateCustomerInfo(customerInfo);
    setIsEditingAddress(false);
    updateOrdersShipping(
      stripeAddress,
      cleanString(shipping.email.value),
      orderNumber
    );
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
          shipping={shipping}
          setShipping={setShipping}
        />
        <CustomTextField
          label="Last Name"
          type="lastName"
          required
          placeholder="Last Name"
          shipping={shipping}
          setShipping={setShipping}
        />
      </div>
      <CustomTextField
        label="Address"
        type="line1"
        required
        placeholder="Start typing address"
        shipping={shipping}
        setShipping={setShipping}
      />
      <CustomTextField
        label="Company, C/O, Apt, Suite, Unit"
        type="line2"
        required={false}
        placeholder="Add Company, C/O, Apt, Suite, Unit"
        shipping={shipping}
        setShipping={setShipping}
      />
      <div className="flex grid-cols-3 flex-col gap-[29.5px] lg:grid lg:gap-[14px]">
        <CustomTextField
          label="City"
          type="city"
          required
          placeholder="City"
          shipping={shipping}
          setShipping={setShipping}
        />
        <CustomTextField
          label="State"
          type="state"
          required
          placeholder="State"
          shipping={shipping}
          setShipping={setShipping}
        />
        <CustomTextField
          label="ZIP"
          type="postal_code"
          required
          placeholder="ZIP"
          shipping={shipping}
          setShipping={setShipping}
        />
      </div>

      {!isBilling && (
        <div className="flex grid-cols-2 flex-col gap-[29.5px] lg:grid lg:gap-[14px]">
          <CustomTextField
            label="Email"
            type="email"
            required
            placeholder="Email"
            shipping={shipping}
            setShipping={setShipping}
          />
          <CustomTextField
            label="Phone Number"
            type="phoneNumber"
            required
            placeholder="Phone Number"
            shipping={shipping}
            setShipping={setShipping}
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={checkErrors()}
        onClick={handleSaveAndContinue}
        className={`h-[48px] w-full cursor-pointer self-center rounded-lg bg-black text-base font-bold uppercase text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:mb-[70px] lg:mt-[19.5px] lg:max-w-[307px] lg:self-end lg:text-xl`}
      >
        Save & Continue
      </Button>
    </form>
  );
}
