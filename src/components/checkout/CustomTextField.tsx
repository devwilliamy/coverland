import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CustomFieldTypes, ShippingStateType } from './AddressForm';
import { US_STATES } from '@/lib/constants';
import { phoneNumberAutoFormat } from '../policy/ContactPage';
import { cleanPhoneInput } from '@/app/(noFooter)/checkout/utils';
import parsePhoneNumberFromString from 'libphonenumber-js';

export const CustomTextField = ({
  label,
  type,
  placeholder,
  shippingState,
  setShippingState,
  required,
  // errorMessage,
}: {
  label: string;
  type: CustomFieldTypes;
  placeholder: string;
  shippingState: Record<string, ShippingStateType>;
  setShippingState: Dispatch<SetStateAction<Record<string, ShippingStateType>>>;
  required: boolean;
  // errorMessage?: string;
}) => {
  const shippingStateOption = shippingState[type];
  const { visited, error, value } = shippingStateOption;

  const validateEmail = (email: string) => {
    // Matching strings with valid email format
    // Ex:
    // ---- paul@example.org
    // ---- example.dev.co@example.co
    // ---- example3@gmail.com

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLengthGreaterThanOne = (inputString: string) => {
    // Regex to match strings with more than one alphabetic character

    if (!inputString) {
      return false;
    }

    const pattern = /\b[a-zA-Z]{2,}\b/g;
    return pattern.test(inputString);
  };

  const validatePostal = (inputString: string) => {
    // Regex pattern to check if the input is a number of max length 5
    const pattern = /^\d{5}$/;
    return pattern.test(inputString);
  };

  const isValidPhoneNumber = (inputString: string) => {
    const cleanedInput = cleanPhoneInput(inputString);

    if (cleanedInput.length < 10) {
      return false;
    }

    // Regex pattern to check if the input is a valid phone number
    const pattern =
      /^\+?(\d{1,3})?[-.\s]?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return pattern.test(inputString);
  };

  const isValidInput = (value: string) => {
    switch (type) {
      case 'email':
        return validateEmail(value);
      case 'postal_code':
        return validatePostal(value);
      case 'phoneNumber':
        return isValidPhoneNumber(value);
      default:
        return validateLengthGreaterThanOne(value);
    }
  };

  const determineInputErrorMessage = () => {
    switch (type) {
      case 'firstName':
        return 'Please enter your first name';
      case 'lastName':
        return 'Please enter your last name';
      case 'line1':
        return 'Please enter your street address';
      case 'email':
        return 'Please enter a valid email address';
      case 'city':
        return 'Please enter a valid city';
      case 'postal_code':
        return 'Please enter a valid ZIP code';
      case 'phoneNumber':
        return 'This field is required';
      default:
        return `Invalid ${label}`;
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    const value = event?.target.value as string;
    setShippingState((prevState) => {
      return {
        ...prevState,
        [type]: { ...prevState[type], value: value, error: false },
      };
    });

    // Validate and update the error object
    if (type !== 'line2' && !isValidInput(value)) {
      setShippingState((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          // visited: true,
          message: determineInputErrorMessage(),
          error: !visited && value.length < 2 ? false : true,
        },
      }));
      return;
    } else {
      setShippingState((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], message: '', error: false },
        };
      });
    }
  };

  const handleBlur = () => {
    // When the user clicks away from the component
    if (type === 'line2') {
      setShippingState((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], visited: true, error: false },
        };
      });
      return;
    }
    if (!isValidInput(shippingStateOption.value)) {
      setShippingState((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          visited: true,
          message: determineInputErrorMessage(),
          error: true,
        },
      }));
      return;
    } else {
      setShippingState((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], visited: true, error: false },
        };
      });
    }
  };

  const formatPhoneNumber = (input: string) => {
    const parsedPhone = parsePhoneNumberFromString(input, 'US');
    const formattedPhone = parsedPhone?.formatNational();
    return formattedPhone;
  };

  const handlePhoneChange = (value: string) => {
    setShippingState((prevState) => {
      return {
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber,
          value: formatPhoneNumber(value),
          error: false,
        },
      };
    });

    // Validate and update the error object
    if (
      shippingStateOption.visited &&
      type !== 'line2' &&
      !isValidInput(value)
    ) {
      setShippingState((prevState) => ({
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber,
          visited: true,
          message: determineInputErrorMessage(),
          error: true,
        },
      }));
    } else {
      setShippingState((prevState) => {
        return {
          ...prevState,
          phoneNumber: { ...prevState.phoneNumber, message: '', error: false },
        };
      });
    }
  };

  const handleZipChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    const value = event?.target.value as string;
    if (isNaN(Number(value)) || value.length > 5) {
      return;
    }

    setShippingState((prevState) => {
      return {
        ...prevState,
        postal_code: {
          ...prevState.postal_code,
          value: value,
          error: false,
        },
      };
    });

    if (
      shippingStateOption.visited &&
      type !== 'line2' &&
      !isValidInput(value)
    ) {
      setShippingState((prevState) => ({
        ...prevState,
        postal_code: {
          ...prevState.postal_code,
          visited: true,
          message: determineInputErrorMessage(),
          error: true,
        },
      }));
    } else {
      setShippingState((prevState) => {
        return {
          ...prevState,
          postal_code: { ...prevState.postal_code, message: '', error: false },
        };
      });
    }
  };

  const handleStateSelectionFocus = () => {
    // setShippingState((prevState) => ({
    //   ...prevState,
    //   state: {
    //     ...prevState.state,
    //     visited: true,
    //   },
    // }));
  };

  const handleStateSelectionBlur = () => {
    if (shippingState.state.value === '') {
      setShippingState((prevState) => ({
        ...prevState,
        state: {
          ...prevState.state,
          message: 'Please select a state',
          visited: true,
          error: true,
        },
      }));
    }
  };

  return (
    <>
      {type !== 'state' && type !== 'phoneNumber' && type !== 'postal_code' && (
        <TextField
          id={label}
          label={label}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!error}
          helperText={
            shippingStateOption.visited && shippingStateOption.message
          }
          required={required}
          sx={{
            margin: 0,
            '.MuiInputBase-root': {
              borderRadius: '8px',
            },
          }}
          style={{
            borderRadius: '20px',
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
      {type === 'postal_code' && (
        <TextField
          id={label}
          type="tel"
          label={label}
          value={shippingStateOption.value}
          onChange={handleZipChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!shippingStateOption.error}
          helperText={
            shippingStateOption.visited && shippingStateOption.message
          }
          required={required}
          sx={{
            margin: 0,
            '.MuiInputBase-root': {
              borderRadius: '8px',
              color: '#707070',
              borderColor: '#707070',
            },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
      {type === 'phoneNumber' && (
        <TextField
          id={label}
          type="tel"
          label={label}
          value={shippingStateOption.value}
          onChange={(e) => {
            const value = e.target.value;
            const cleaned = ('' + value).replace(/\D/g, '');
            if (cleaned.length > 10) {
              return;
            }
            handlePhoneChange(cleaned);
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!shippingStateOption.error}
          helperText={shippingStateOption.message}
          required={required}
          sx={{
            margin: 0,
            '.MuiInputBase-root': {
              borderRadius: '8px',
            },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
      {type === 'state' && (
        <FormControl>
          <InputLabel
            error={!!shippingStateOption.error}
            id="demo-simple-select-helper-label"
          >
            State *
          </InputLabel>
          <Select
            value={shippingState.state.value}
            label={label}
            fullWidth
            onChange={(e) => {
              setShippingState((prevState) => ({
                ...prevState,
                state: {
                  ...prevState.state,
                  value: e.target.value as string,
                  message: '',
                  visited: true,
                  error: false,
                },
              }));
            }}
            onFocus={handleStateSelectionFocus}
            onBlur={handleStateSelectionBlur}
            error={!!shippingStateOption.error}
            required={required}
            sx={{
              margin: 0,
              borderRadius: '8px',
              '.MuiInputBase-root': {
                borderRadius: '8px',
              },
            }}
          >
            <MenuItem value="" disabled>
              --Select a state--
            </MenuItem>
            {US_STATES.map((state) => (
              <MenuItem key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!shippingStateOption.error}>
            {shippingStateOption.message}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
};
