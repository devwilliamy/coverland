import { HTMLAttributes, SyntheticEvent,MouseEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CustomerInfo, useCheckoutContext } from '@/contexts/CheckoutContext';
import { StripeAddress } from '@/lib/types/checkout';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  MenuItem,
  TextField,
} from '@mui/material';
import { CustomTextField } from './CustomTextField';

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
  isBilling?: boolean;
  handleChangeAccordion?: (accordionTitle: string) => void;
  handleSelectTab?: (id: string) => void;
};

type AddressComponents = {
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

export type CustomFieldTypes =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'line1'
  | 'line2'
  | 'city'
  | 'state'
  | 'postal_code'
  | 'phoneNumber'
  | 'addressAutocomplete';

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
    addressAutocomplete: {
      value: '',
      visited: false,
      message: '',
      error: null,
    },
  });

  type AutocompleteData = {
    placePrediction: any;
  };

  const [isManualAddress, setIsManualAddress] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);

  const autocompleteObj: Record<string, FormString> = {
    locality: 'city',
    administrative_area_level_1: 'state',
    postal_code: 'postal_code',
    country: 'country',
  };

  useEffect(() => {
    const persistedAddressData = {
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
    };

    // TODO: Need to make this checking more robust
    if (addressData.address.line1 && !shippingState.addressAutocomplete.value) {
      const { line1, city, state, postal_code, country } = addressData.address;

      setShippingState({
        ...persistedAddressData,
        addressAutocomplete: {
          value: `${line1}, ${city}, ${state}, ${postal_code}, ${country}`,
          visited: true,
          message: '',
          error: false,
        },
      });
    } else if (addressData.address.line1) {
      // Populate the form fields if there is address data when editing shipping
      setShippingState(persistedAddressData);
    }
  }, [addressData, customerInfo]);

  const checkErrors = () => {
    if (!isManualAddress && !shippingState.addressAutocomplete.value) {
      return true;
    }

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

  const getAddressWithPostalCode = async (addressInput: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/places-text-search', {
        method: 'POST',
        body: JSON.stringify({ addressInput }),
      });

      const data = await response.json();
      const formattedAddress: string = data.places[0].formattedAddress;
      const addressComponents: AddressComponents[] =
        data.places[0].addressComponents;

      let filteredAddressComponents = new Map();

      const filterAddressComponents = (components: AddressComponents) => {
        for (const type in autocompleteObj) {
          if (
            components.longText &&
            components.types &&
            components.types.includes(type)
          ) {
            if (components.types.includes('administrative_area_level_1')) {
              // console.log({ state: component.shortText });
              if (isBillingSameAsShipping) {
                updateTwoLetterStateCode(components.shortText);
                updateBillingTwoLetterStateCode(components.shortText);
              } else {
                isBilling
                  ? updateTwoLetterStateCode(components.shortText)
                  : updateBillingTwoLetterStateCode(components.shortText);
              }
            }
            const val = autocompleteObj[type];
            filteredAddressComponents.set(val, components.longText);
          }
        }
      };

      addressComponents.forEach((component) => {
        filterAddressComponents(component);
      });

      const line1 = String(formattedAddress).split(',')[0];
      setShippingState((prev) => {
        return {
          ...prev,
          line1: {
            value: line1,
            visited: true,
            message: '',
            error: false,
          },
        };
      });

      // Taking each filtered addressComponentArray ([key,value]) in filteredAddressComponents
      for (const addressComponentsArray of filteredAddressComponents) {
        // Map iterator returns [key,value] array for each entry in the Map

        // Setting setting each shipping state value based on the incoming key
        setShippingState((prev) => {
          const key = addressComponentsArray[0];
          const value = addressComponentsArray[1] ?? '';
          return {
            ...prev,
            [key]: {
              value,
              visited: true,
              message: '',
              error: false,
            },
          };
        });
      }

      // console.log({ addressData });

      if (formattedAddress) {
        setShippingState((prev) => {
          return {
            ...prev,
            addressAutocomplete: {
              value: formattedAddress,
              visited: true,
              message: '',
              error: false,
            },
          };
        });
      } else {
        setShippingState((prev) => {
          return {
            ...prev,
            addressAutocomplete: {
              value: addressInput,
              visited: true,
              message: '',
              error: false,
            },
          };
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressAutocompleteOptions = async (addressInput: string) => {
    setLoading(true);
    if (addressInput === '' || addressInput.trim() === '') {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/places-autocomplete', {
        method: 'POST',
        body: JSON.stringify({ addressInput }),
      });

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutocompleteChange = (
    e: SyntheticEvent<Element, Event>,
    eventValue: any
  ) => {
    if (eventValue === null) {
      return '';
    }
    const selectedString = String(eventValue.placePrediction?.text.text);
    setSelectedAddress(true);
    getAddressWithPostalCode(selectedString);
  };

  const handleAutocompleteInputChange = (
    e: SyntheticEvent<Element, Event>,
    newInputValue: any
  ) => {
    const val = String(newInputValue);
    if (newInputValue === null || newInputValue === '') {
      setShippingState((prev) => {
        return {
          ...prev,
          addressAutocomplete: {
            value: '',
            visited: true,
            message: 'Please enter a valid address',
            error: true,
          },
        };
      });
      return '';
    }
    getAddressAutocompleteOptions(val);
    setShippingState((prev) => {
      return {
        ...prev,
        addressAutocomplete: {
          value: val,
          visited: true,
          message: '',
          error: false,
        },
      };
    });
  };

  const handleChangeAddressInputType = () => {
    if (isManualAddress) {
      setShippingState((prev) => {
        return {
          ...prev,
          addressAutocomplete: {
            value: '',
            visited: true,
            message: '',
            error: null,
          },
        };
      });
    }
    setIsManualAddress((prev) => !prev);
    setShippingState((prevState) => {
      return {
        ...prevState,
        line1: {
          value: '',
          visited: false,
          message: '',
          error: null,
        },
        line2: {
          value: '',
          visited: false,
          message: '',
          error: null,
        },
        city: {
          value: '',
          visited: false,
          message: '',
          error: null,
        },
        state: {
          value: '',
          visited: false,
          message: '',
          error: null,
        },
        postal_code: {
          value: '',
          visited: false,
          message: '',
          error: null,
        },
      };
    });
  };

  const handleRenderAddressInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      key={`text-field-address-auto`}
      label="Address*"
      placeholder="Start typing address"
      fullWidth
      error={!!shippingState.addressAutocomplete.error}
      helperText={
        shippingState.addressAutocomplete.visited &&
        shippingState.addressAutocomplete.message
      }
      onFocus={() => {
        setShippingState((prev) => {
          return {
            ...prev,
            addressAutocomplete: {
              ...prev.addressAutocomplete,
              visited: true,
            },
          };
        });
        setSelectedAddress(false);
      }}
      onBlur={() => {
        if (!shippingState.addressAutocomplete.value || !selectedAddress) {
          setShippingState((prev) => {
            return {
              ...prev,
              addressAutocomplete: {
                ...prev.addressAutocomplete,
                visited: true,
                message: 'Please enter a valid address',
                error: true,
              },
            };
          });
        } else {
          setShippingState((prev) => {
            return {
              ...prev,
              addressAutocomplete: {
                ...prev.addressAutocomplete,
                visited: true,
                message: '',
                error: false,
              },
            };
          });
        }
      }}
    >
      {suggestions.map((suggestion) => {
        const text = suggestion?.placePrediction?.text.text;
        return (
          <MenuItem key={text} value={text}>
            {text}
          </MenuItem>
        );
      })}
    </TextField>
  );

  const handleRenderAddressOption = (
    props: HTMLAttributes<HTMLLIElement>,
    option: any
  ) => {
    const text = option?.placePrediction?.text.text;
    return (
      <li {...props} key={text}>
        <p>{text}</p>
      </li>
    );
  }
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
      {isManualAddress ? (
        <>
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
        </>
      ) : (
        <div className="flex w-full flex-col">
          <Autocomplete
            id="address-autocomplete"
            open={addressOpen}
            filterOptions={(x) => x}
            getOptionLabel={(option) => {
              return option?.placePrediction?.text.text ?? option;
            }}
            onOpen={() => setAddressOpen(true)}
            onClose={() => setAddressOpen(false)}
            onChange={handleAutocompleteChange}
            onInputChange={handleAutocompleteInputChange}
            value={shippingState.addressAutocomplete.value}
            className="col-span-2 w-full font-['Roboto'_'Helvetica'_'Arial'_'sans-serif']"
            fullWidth
            options={suggestions}
            loading={loading}
            filterSelectedOptions
            aria-placeholder=""
            noOptionsText="No locations"
            renderInput={handleRenderAddressInput}
            renderOption={handleRenderAddressOption}
          />
        </div>
      )}

      <div className="col-span-2 w-full">
        <p
          className="w-fit cursor-pointer text-[14px] font-[400] leading-[16.4px] text-[#767676] underline"
          onClick={handleChangeAddressInputType}
        >
          {isManualAddress ? 'Find address' : 'Enter address manually'}
        </p>
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
        className={`h-[48px] w-full cursor-pointer self-center rounded-lg bg-black text-base font-bold uppercase text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:mb-[70px] lg:mt-[19.5px] lg:max-w-[307px] lg:self-end lg:text-xl`}
      >
        Save & Continue
      </Button>
    </form>
  );
}
