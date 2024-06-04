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

  const [address, setAddress] = useState<string>('');
  const [isManualAddress, setIsManualAddress] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const getAddressAutocomplete = async (addressInput: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/places-autocomplete', {
        method: 'POST',
        body: JSON.stringify({ addressInput }),
      });

      const data = await response.json();
      console.log({ data });
      setSuggestions(data);
      // for (const iterator of data) {

      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 py-2">
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
      /> */}
      {/* <TextField
        required
        label="First Name"
        name="firstName"
        placeholder="John"
        fullWidth
      />
      <TextField
        required
        label="Last Name"
        name="lastName"
        placeholder="Smith"
        fullWidth
      /> */}
      <OverlappingLabel
        title="First Name"
        name="firstName"
        errors={errors}
        placeholder="John"
        register={register}
        options={{ required: true }}
        autoComplete="family-name"
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
      <Autocomplete
        id="asynchronous-demo"
        open={addressOpen}
        filterOptions={(x) => x}
        getOptionLabel={(option) => {
          return option?.placePrediction?.text.text ?? option;
        }}
        // isOptionEqualToValue={(option, value) => {
        //   if (!option || option === '') {
        //     return false;
        //   }
        //   // return true;
        //   return String(option.placePrediction?.text.text).includes(address);
        //   // option.placePrediction?.text.text ===
        //   // (value?.placePrediction?.text.text ?? value)
        // }}
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
          setAddress(String(eventValue.placePrediction?.text.text));
        }}
        onInputChange={(event, newInputValue) => {
          if (newInputValue === null) {
            return '';
          }
          const val = String(newInputValue);
          getAddressAutocomplete(val);
          setAddress(val);
          console.log({ address: val });
        }}
        value={address?.placePrediction?.text.text ?? address}
        className="w-full"
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
              const text = suggestion.placePrediction.text.text;
              return (
                <MenuItem key={`places-${text}`} value={text}>
                  {text}
                </MenuItem>
              );
            })}
          </TextField>
        )}
        renderOption={(props, option) => {
          const text = option.placePrediction.text.text;
          // return <option value={text}>{text}</option>;
          return (
            <li key={`${option.placeId}`} {...props}>
              <p>{text}</p>
            </li>
          );
        }}
        // helperText="Please complete address selection or enter an address manually."
      ></Autocomplete>
      {/* <TextField
        required
        type="email"
        label="Email"
        title="Email"
        name="email"
        placeholder="abc@gmail.com"
        fullWidth
      /> */}
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
      {/* <div>
       <label htmlFor="AutocompleteAddress">Address</label>
        <input
          type="text"
          placeholder="12345 Sunset Blvd, Los Angeles, CA 54321, USA"
          name="AutocompleteAddress"
          id="AutocompleteAddress"
          list="addressDataList"
          title="Address"
          onChange={(e) => {
            const val = e.target.value;
            getAddressAutocomplete(val);
            setAddress(val);
            console.log({ address: val });
          }}
          value={address}
          autoComplete="off"
          className="block w-full rounded-lg border-0 border-[#E1E1E1] bg-[#FAFAFA] px-3 py-3  ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-base sm:leading-6 "
        />
        <datalist id="addressDataList" className="w-full bg-white">
          {suggestions.map((suggestion) => {
            const text = suggestion.placePrediction.text.text;
            return <option value={text}>{text}</option>;
          })}
        </datalist> 
        <TextField
          label="Address"
          placeholder="12345 Sunset Blvd, Los Angeles, CA 54321, USA"
          name="AutocompleteAddress"
          id="AutocompleteAddress"
          onChange={(e) => {
            const val = e.target.value;
            getAddressAutocomplete(val);
            setAddress(val);
            console.log({ address: val });
          }}
          value={address}
          // helperText="Please complete address selection or enter an address manually."
          className="w-full"
        >
          {suggestions.map((suggestion) => {
            const text = suggestion.placePrediction.text.text;
            return (
              <MenuItem key={`places-${text}`} value={text}>
                {text}
              </MenuItem>
            );
          })}
        </TextField> 
      </div> */}
      {/* {showEmail && (
        <OverlappingLabel
          title="Email"
          name="email"
          errors={errors}
          placeholder="abc@gmail.com"
          register={register}
          options={{ required: true }}
          autoComplete="email"
        />
      )} */}
      {/* {showEmail && (
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
      )} */}
      {/* <div className="flex flex-row pb-6">
        
       
      </div> */}
      {/* <div className="pb-6">
        <OverlappingLabel
          title="Address Line 1"
          name="line1"
          errors={errors}
          placeholder="123 Main Street"
          register={register}
          options={{ required: true }}
          autoComplete="address-line1"
        />
      </div> */}
      {/* <div className="pb-6">
        <OverlappingLabel
          title="Address Line 2"
          name="line2"
          errors={errors}
          placeholder="P.O. Box 123"
          register={register}
          autoComplete="address-line2"
        />
      </div> */}

      {/* <div className="pb-6">
        <OverlappingLabel
          title="City"
          name="city"
          errors={errors}
          placeholder="Los Angeles"
          register={register}
          options={{ required: true }}
          autoComplete="address-level2"
        />
      </div> */}
      {/* <div className="flex flex-row pb-6">
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
          <StateDropdown
            name="state"
            label="State"
            register={register}
            errors={errors}
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
      </div> */}

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
