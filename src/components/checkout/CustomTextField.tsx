import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CustomFieldTypes, ShippingStateType } from './AddressForm';
import { US_STATES } from '@/lib/constants';
import { phoneNumberAutoFormat } from '../policy/ContactPage';

export const CustomTextField = ({
  label,
  type,
  placeholder,
  shippingState,
  setShippingState,
}: {
  label: string;
  type: CustomFieldTypes;
  placeholder: string;
  shippingState: Record<string, ShippingStateType>;
  setShippingState: Dispatch<SetStateAction<Record<string, ShippingStateType>>>;
}) => {
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLengthGreaterThanOne = (inputString: string) => {
    // Regex to match strings with more than one alphabetic character
    const pattern = /\b[a-zA-Z]{2,}\b/g;
    return pattern.test(inputString);
  };

  const validatePostal = (inputString: string) => {
    // Regex pattern to check if the input is a number of max length 5
    const pattern = /^\d{5}$/;
    return pattern.test(inputString);
  };

  const isValidPhoneNumber = (inputString: string) => {
    // Regex pattern to check if the input is a valid phone number
    const pattern =
      /^\+?(\d{1,3})?[-.\s]?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return pattern.test(inputString);
  };

  const determineValidation = (value: string) => {
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
    if (
      shippingState[type].visited &&
      type !== 'line2' &&
      !determineValidation(value)
    ) {
      setShippingState((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          visited: true,
          message: `Invalid ${label}`,
          error: true,
        },
      }));
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
    if (type === 'line2') {
      setShippingState((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], visited: true, error: false },
        };
      });
      return;
    }
    if (!determineValidation(shippingState[type].value)) {
      setShippingState((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          visited: true,
          message: `Invalid ${label}`,
          error: true,
        },
      }));
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
    // Remove any non-digit characters
    const cleaned = ('' + input).replace(/\D/g, '');

    // Format based on the length of the cleaned number
    let match;
    if (cleaned.length === 7) {
      match = cleaned.match(/^(\d{3})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}`;
      }
    } else if (cleaned.length === 10) {
      match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    } else if (cleaned.length === 11) {
      match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
      }
    } else if (cleaned.length <= 6) {
      return cleaned;
    }

    // If the number doesn't match any of the expected lengths
    return input;
  };

  const handlePhoneChange = (value: string) => {
    // if (isNaN(Number(value))) {
    //   return;
    // }

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
      shippingState[type].visited &&
      type !== 'line2' &&
      !determineValidation(value)
    ) {
      setShippingState((prevState) => ({
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber,
          visited: true,
          message: `Invalid ${label}`,
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
      shippingState[type].visited &&
      type !== 'line2' &&
      !determineValidation(value)
    ) {
      setShippingState((prevState) => ({
        ...prevState,
        postal_code: {
          ...prevState.postal_code,
          visited: true,
          message: `Invalid ${label}`,
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

  return (
    <>
      {type !== 'state' && type !== 'phoneNumber' && type !== 'postal_code' && (
        <TextField
          id={label}
          label={label}
          value={shippingState[type].value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!shippingState[type].error}
          helperText={shippingState[type].message}
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
          value={shippingState[type].value}
          onChange={handleZipChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!shippingState[type].error}
          helperText={shippingState[type].message}
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
      {type === 'phoneNumber' && (
        <TextField
          id={label}
          // type="tel"
          label={label}
          value={shippingState[type].value}
          onChange={(e) => {
            const value = e.target.value;
            const cleaned = ('' + value).replace(/\D/g, '');
            if (cleaned.length > 11) {
              return;
            }
            handlePhoneChange(cleaned);
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={!!shippingState[type].error}
          helperText={shippingState[type].message}
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
          <InputLabel id="demo-simple-select-helper-label">State</InputLabel>

          <Select
            // labelId="demo-simple-select-helper-label"
            // id="demo-simple-select-helper"
            value={shippingState.state.value}
            label={label}
            fullWidth
            onChange={(e) => {
              setShippingState((prevState) => ({
                ...prevState,
                state: {
                  ...prevState.state,
                  value: e.target.value as string,
                  visited: true,
                  error: false,
                },
              }));
            }}
            sx={{
              margin: 0,
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
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      )}
    </>
  );
};
