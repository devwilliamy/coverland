import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
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

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  country?: string;
  state: string;
  postal_code: string;
  phoneNumber: string;
};

type FormString =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'line1'
  | 'line2'
  | 'city'
  | 'state'
  | 'postal_code'
  | 'phoneNumber'
  | 'country';

type AddressFormProps = {
  addressData: StripeAddress;
  updateAddress: (address: StripeAddress) => void;
  setIsEditingAddress: (isEditing: boolean) => void;
  showEmail?: boolean;
  handleChangeAccordion: (accordionTitle: string) => void;
  handleSelectTab: (id: string) => void;
};

type AddressComponent = {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
};

export type ShippingStateType = {
  value: string;
  visited: boolean;
  message: string;
  error: boolean | null;
};

const formSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name.'),
  lastName: z.string().min(1, 'Please enter your last name.'),
  line1: z
    .string()
    .min(1, 'Please complete address selection or enter address manually'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().refine(
    (value) => {
      const phoneNumber = parsePhoneNumberFromString(value, 'US');
      return phoneNumber && phoneNumber.isPossible();
    },
    {
      message: 'Please provide a valid phone number',
    }
  ),
});

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
  showEmail,
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

  // ----------------------V----------------------VV----------------------V----------------------
  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  //   getValues,
  //   // trigger,
  // } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  // const onSubmit = handleSubmit(
  //   ({
  //     email,
  //     firstName,
  //     lastName,
  //     line1,
  //     line2,
  //     city,
  //     state,
  //     postal_code,
  //     phoneNumber,
  //   }) => {
  //     const formattedPhoneNumber =
  //       parsePhoneNumberFromString(phoneNumber)?.format('E.164');

  //     const address: StripeAddress = {
  //       name: `${firstName} ${lastName}`,
  //       firstName,
  //       lastName,
  //       phone: formattedPhoneNumber,
  //       address: {
  //         line1,
  //         line2,
  //         city,
  //         state,
  //         postal_code,
  //         country: 'US',
  //       },
  //     };
  //     // console.log("Address:", address)
  //     updateAddress(address as StripeAddress);
  //     updateCustomerInfo({ email, phoneNumber });
  //     setIsEditingAddress(false);
  //     toggleIsShippingAddressShown(false);
  //   }
  // );

  // const emailValue = watch('email');

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
    if (addressData) {
      setShippingState({
        email: {
          value: customerInfo.email,
          visited: false,
          message: '',
          error: false,
        },
        firstName: {
          value: addressData.firstName as string,
          visited: false,
          message: '',
          error: false,
        },
        lastName: {
          value: addressData.lastName as string,
          visited: false,
          message: '',
          error: false,
        },
        line1: {
          value: addressData.address.line1 as string,
          visited: false,
          message: '',
          error: false,
        },
        line2: {
          value: addressData.address.line2 as string,
          visited: false,
          message: '',
          error: false,
        },
        city: {
          value: addressData.address.city as string,
          visited: false,
          message: '',
          error: false,
        },
        state: {
          value: addressData.address.state as string,
          visited: false,
          message: '',
          error: false,
        },
        postal_code: {
          value: addressData.address.postal_code as string,
          visited: false,
          message: '',
          error: false,
        },
        phoneNumber: {
          value: customerInfo.phoneNumber,
          visited: false,
          message: '',
          error: false,
        },
      });
      // setValue('email', customerInfo.email || '');
      // setValue('firstName', addressData.firstName || '');
      // setValue('lastName', addressData.lastName || '');
      // setValue('line1', addressData.address.line1 || '');
      // setValue('line2', addressData.address.line2 || '');
      // setValue('city', addressData.address.city || '');
      // setValue('state', addressData.address.state || '');
      // setValue('postal_code', addressData.address.postal_code || '');
      // setValue('phoneNumber', customerInfo.phoneNumber || '');
    }
  }, [addressData, customerInfo]);

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW') {
  //     setValue('email', 'george.icarcover@gmail.com' || '');
  //     setValue('firstName', 'George' || '');
  //     setValue('lastName', 'Anumba' || '');
  //     setValue('line1', '1231 S Hill St' || '');
  //     setValue('line2', 'P.O. Box 424' || '');
  //     setValue('city', 'Los Angeles' || '');
  //     setValue('state', 'CA' || '');
  //     setValue('postal_code', '90015' || '');
  //     setValue('phoneNumber', '+1 424 424 4242' || '');
  //     setAddress('1231 S Hill St, Los Angeles, CA 90015, USA');
  //   }
  // }, []);
  // ---------------------------------------------------------------------------------------------------

  // --------- V ----------- V ---------- Used for Autocomplete --------- V ----------- V ----------
  // type AutocompleteData = {
  //   placePrediction: any;
  // };

  // const [autocompleteAddress, setAutocompleteAddress] = useState<string>('');
  // const [isManualAddress, setIsManualAddress] = useState(false);
  // const [suggestions, setSuggestions] = useState<AutocompleteData[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [addressOpen, setAddressOpen] = useState(false);

  // const autocompleteObj: Record<string, FormString> = {
  //   locality: 'city',
  //   administrative_area_level_1: 'state',
  //   postal_code: 'postal_code',
  //   country: 'country',
  // };

  // const getAddressAutocompleteOptions = async (addressInput: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/places-autocomplete', {
  //       method: 'POST',
  //       body: JSON.stringify({ addressInput }),
  //     });

  //     const data = await response.json();
  //     // const values = getValues();
  //     setSuggestions(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getAddressWithPostalCode = async (addressInput: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/places-text-search', {
  //       method: 'POST',
  //       body: JSON.stringify({ addressInput }),
  //     });

  //     const data = await response.json();
  //     const formattedAddress: string = data.places[0].formattedAddress;
  //     const addressComponents: AddressComponent[] =
  //       data.places[0].addressComponents;
  //     // console.log('FORMATTED ADDRESS SEARCH', {
  //     //   formattedAddress,
  //     //   addressComponents,
  //     // });

  //     let filteredAddressComponents = new Map();

  //     const determineAddressIncludesComponent = (component: any) => {
  //       for (const key in autocompleteObj) {
  //         if (
  //           component.longText &&
  //           component.types &&
  //           component.types.includes(key)
  //         ) {
  //           if (component.types.includes('administrative_area_level_1')) {
  //             // console.log({ state: component.shortText });
  //             if (isBillingSameAsShipping) {
  //               updateTwoLetterStateCode(component.shortText);
  //               updateBillingTwoLetterStateCode(component.shortText);
  //             } else {
  //               showEmail
  //                 ? updateTwoLetterStateCode(component.shortText)
  //                 : updateBillingTwoLetterStateCode(component.shortText);
  //             }
  //           }
  //           const val = autocompleteObj[key];
  //           filteredAddressComponents.set(val, component.longText);
  //         }
  //       }
  //     };

  //     addressComponents.forEach((component, index) => {
  //       // console.log(component);
  //       determineAddressIncludesComponent(component);
  //     });

  //     const line1 = String(formattedAddress).split(',')[0];
  //     setValue('line1', line1 ?? '');

  //     // FilteredAddressComponents => Map([['key','value'],...])
  //     for (const arr of filteredAddressComponents) {
  //       setValue(arr[0], arr[1] ?? '');
  //     }

  //     // console.log({ addressData });

  //     if (formattedAddress) {
  //       setAutocompleteAddress(formattedAddress);
  //     } else {
  //       setAutocompleteAddress(addressInput);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleAutocompleteChange = (
  //   e: SyntheticEvent<Element, Event>,
  //   eventValue: any
  // ) => {
  //   if (eventValue === null) {
  //     return '';
  //   }
  //   const selectedString = String(eventValue.placePrediction?.text.text);
  //   getAddressWithPostalCode(selectedString);
  // };

  // const handleAutocompleteInputChange = (
  //   e: SyntheticEvent<Element, Event>,
  //   newInputValue: any
  // ) => {
  //   if (newInputValue === null) {
  //     return '';
  //   }
  //   const val = String(newInputValue);
  //   getAddressAutocompleteOptions(val);
  //   setAutocompleteAddress(val);
  // };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const checkErrors = () => {
    for (const key in shippingState) {
      if (shippingState[key].error || shippingState[key].error === null) {
        return true;
      }
    }

    return false;
  };

  return (
    <form
      // onSubmit={onSubmit}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-[29.5px]"
    >
      {/* Previous Shipping Checkout Form  */}
      <>
        {/* <OverlappingLabel
          title="First Name"
          name="firstName"
          errors={errors}
          placeholder="John"
          register={register}
          options={{ required: true }}
          autoComplete="given-name"
        />
        <OverlappingLabel
          title="Last Name"
          name="lastName"
          errors={errors}
          placeholder="Smith"
          register={register}
          options={{ required: true }}
          autoComplete="family-name"
        />
        <OverlappingLabel
          title="Address Line 1"
          name="line1"
          errors={errors}
          placeholder="123 Main Street"
          register={register}
          options={{ required: true }}
          autoComplete="address-line1"
        />
        <OverlappingLabel
          title="Address Line 2"
          name="line2"
          errors={errors}
          placeholder="P.O. Box 123"
          register={register}
          options={{ required: false }}
          autoComplete="address-line2"
        />
        <OverlappingLabel
          title="City"
          name="city"
          errors={errors}
          placeholder="Los Angeles"
          register={register}
          options={{ required: true }}
          autoComplete="address-level2"
        />

        <OverlappingLabel
          title="Email"
          name="email"
          errors={errors}
          placeholder="Email"
          register={register}
          options={{ required: true }}
          autoComplete="email"
        />

        <OverlappingLabel
          title="ZIP"
          name="postal_code"
          errors={errors}
          placeholder="91801"
          register={register}
          options={{ required: true }}
          autoComplete="postal-code"
        />

        <CustomPhoneInput
          label="Phone Number"
          name="phoneNumber"
          placeholder="+1 123 456 7890"
          autoComplete="tel"
          register={register}
          errors={errors}
          required={true}
        /> */}
      </>
      {/* Previous Shipping Checkout Form  */}

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
      <Button
        type="submit"
        disabled={checkErrors()}
        onClick={(e) => {
          e.preventDefault();
          console.log(shippingState);

          const incStripeAddress = {
            firstName: shippingState.firstName.value,
            lastName: shippingState.lastName.value,
            name:
              shippingState.firstName.value +
              ' ' +
              shippingState.lastName.value,
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

          const incCustomerInfo = {
            email: shippingState.email.value,
            phoneNumber: shippingState.phoneNumber.value,
          } as CustomerInfo;

          console.log({ incStripeAddress });

          updateAddress(incStripeAddress as StripeAddress);
          updateCustomerInfo(incCustomerInfo);
          setIsEditingAddress(false);
          // handleChangeAccordion('payment');
          // handleSelectTab('payment');
        }}
        className={`h-[48px] w-full cursor-pointer self-center rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:max-w-[390px] lg:text-xl`}
      >
        Save & Continue
      </Button>
    </form>
  );
}
