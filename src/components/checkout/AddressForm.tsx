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
import StateDropdown from '../ui/state-dropdown';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import { ManualAdressComponents } from './ManualAdressComponents';

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
  showEmail: boolean;
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
  // phoneNumber: z
  //   .string()
  //   .regex(
  //     /^(?:\+([0-9]{1,3})[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  //     { message: 'Please provide a valid phone number' }
  //   ),
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
    getValues,
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
      // console.log("Address:", address)
      updateAddress(address as StripeAddress);
      updateCustomerInfo({ email, phoneNumber });
      setIsEditingAddress(false);
      toggleIsShippingAddressShown(false);
    }
  );

  // console.log('Errors', errors);
  const [address, setAddress] = useState<string>('');
  const [isManualAddress, setIsManualAddress] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const determineDisabled = () => {
    const formValues = getValues();
  };

  useEffect(() => {
    // Populate the form fields when shippingAddress changes
    setValue('email', customerInfo.email || '');
    setValue('firstName', addressData.firstName || '');
    setValue('lastName', addressData.lastName || '');
    setValue('phoneNumber', customerInfo.phoneNumber || '');
    if (addressData && isManualAddress) {
      setValue('line1', addressData.address.line1 || '');
      setValue('line2', addressData.address.line2 || '');
      setValue('city', addressData.address.city || '');
      setValue('state', addressData.address.state || '');
      setValue('postal_code', addressData.address.postal_code || '');
    }
    determineDisabled();
  }, [addressData, customerInfo, setValue]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW') {
      setValue('email', 'george.icarcover@gmail.com' || '');
      setValue('firstName', 'George' || '');
      setValue('lastName', 'Anumba' || '');
      setValue('line1', '123 Main Street' || '');
      setValue('line2', 'P.O. Box 424' || '');
      setValue('city', 'Norwalk' || '');
      setValue('state', 'CA' || '');
      setValue('postal_code', '12345' || '');
      setValue('phoneNumber', '+14244244242' || '');
    }
  }, []);

  const autocompleteObj: Record<string, FormString> = {
    locality: 'city',
    administrative_area_level_1: 'state',
    postal_code: 'postal_code',
    country: 'country',
  };

  const getAddressAutocompleteOptions = async (addressInput: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/places-autocomplete', {
        method: 'POST',
        body: JSON.stringify({ addressInput }),
      });

      const data = await response.json();
      const values = getValues();
      console.log({ data, values });
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressWithPostalCode = async (addressInput: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/places-text-search', {
        method: 'POST',
        body: JSON.stringify({ addressInput }),
      });

      const data = await response.json();
      const formattedAddress = data.places[0].formattedAddress;
      const addressComponents: any[] = data.places[0].addressComponents;
      console.log('FORMATTED ADDRESS SEARCH', {
        formattedAddress,
        addressComponents,
      });

      let filteredAddressComponents = new Map();

      const determineIncludes = (component) => {
        for (const key in autocompleteObj) {
          if (
            component.longText &&
            component.types &&
            component.types.includes(key)
          ) {
            const val = autocompleteObj[key];
            filteredAddressComponents.set(val, component.longText);
            // console.log({ val, text: component.longText });
          }
        }
      };

      addressComponents.forEach((component, index) =>
        determineIncludes(component)
      );

      const line1 = String(formattedAddress).split(',')[0];
      setValue('line1', line1 ?? '');

      //
      for (const arr of filteredAddressComponents) {
        setValue(arr[0], arr[1] ?? '');
      }
      // country: string;
      // line1?: string | null;
      // line2?: string | null;
      // city?: string | null;
      // postal_code?: string | null;
      // state?: string | null;

      // const address: StripeAddress = {
      //   // name:
      //   address: {
      //     line1: line1,
      //     city: filteredAddressComponents.get('city'),
      //     state: filteredAddressComponents.get('state'),
      //     postal_code: filteredAddressComponents.get('postal_code'),
      //     country: filteredAddressComponents.get('country'),
      //   },
      // };
      // updateAddress(address as StripeAddress);

      console.log({ addressData });

      if (formattedAddress) {
        setAddress(formattedAddress);
      } else {
        setAddress(addressInput);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex grid-cols-2 flex-col gap-6 py-2 lg:grid"
    >
      <OverlappingLabel
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

      {/* Manual Address Fields */}
      {isManualAddress ? (
        // <ManualAdressComponents register={register} errors={errors} />
        // Unable to extract for some reason:
        //    - I keep getting "register is not a function" error no matter how I pass register in
        // V---------------VV---------------VV---------------VV---------------V
        <>
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
            title="State"
            name="state"
            errors={errors}
            placeholder="CA"
            register={register}
            options={{ required: true }}
            autoComplete="address-level1"
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
        </>
      ) : (
        <Autocomplete
          id="address-autocomplete"
          open={addressOpen}
          filterOptions={(x) => x}
          getOptionLabel={(option) => {
            return option?.placePrediction?.text.text ?? option;
          }}
          onOpen={() => {
            setAddressOpen(true);
          }}
          onClose={() => {
            setAddressOpen(false);
          }}
          onChange={(e, eventValue) => {
            if (eventValue === null) {
              return '';
            }
            const selectedString = String(
              eventValue.placePrediction?.text.text
            );
            getAddressWithPostalCode(selectedString);
          }}
          onInputChange={(event, newInputValue) => {
            if (newInputValue === null) {
              return '';
            }
            const val = String(newInputValue);
            getAddressAutocompleteOptions(val);
            setAddress(val);
            console.log({ address: val });
          }}
          value={address?.placePrediction?.text.text ?? address}
          className="col-span-2 w-full"
          fullWidth
          options={suggestions}
          loading={loading}
          filterSelectedOptions
          noOptionsText="No locations"
          renderInput={(params) => (
            <TextField
              {...params}
              key={`text-field-address-auto`}
              label="Address"
              placeholder="12345 Sunset Blvd, Los Angeles, CA, USA"
              // placeholder="12345 Sunset Blvd, Los Angeles, CA 54321, USA" // With zipcode
              fullWidth
            >
              {suggestions.map((suggestion) => {
                const text = suggestion?.placePrediction?.text.text;
                return <MenuItem value={text}>{text}</MenuItem>;
              })}
            </TextField>
          )}
          renderOption={(props, option) => {
            const text = option?.placePrediction?.text.text;
            // return <option value={text}>{text}</option>;
            return (
              <li {...props}>
                <p>{text}</p>
              </li>
            );
          }}
          // helperText="Please complete address selection or enter an address manually."
        />
      )}

      <p
        className="cursor-pointer text-[14px] font-[400] leading-[16.4px] text-[#767676] underline"
        onClick={() => {
          setIsManualAddress((prev) => !prev);
          setValue('line1', '');
          setValue('line2', '');
          setValue('city', '');
          setValue('state', '');
          setValue('postal_code', '');
        }}
      >
        {isManualAddress ? 'Find address' : 'Enter address manually'}
      </p>
      <OverlappingLabel
        title="Email"
        name="email"
        errors={errors}
        placeholder="abc@gmail.com"
        register={register}
        options={{ required: true }}
        autoComplete="email"
      />
      <CustomPhoneInput
        label="Phone Number"
        name="phoneNumber"
        placeholder="+1 123 456 7890"
        autoComplete="tel"
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-col items-center justify-between lg:col-span-2 lg:mt-11">
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
