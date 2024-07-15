import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FaExclamationCircle } from 'react-icons/fa';
import { TextField } from '@mui/material';

type CustomPhoneInputProps = {
  label: string;
  register: any;
  name: string;
  placeholder: string;
  autoComplete: string;
  errors: any;
  required?: boolean;
};

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  label,
  register,
  name,
  placeholder,
  autoComplete,
  errors,
  required = false,
}) => {
  const inputStyle = errors[name]
    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
    : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-[#ed5f74]';
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const phoneNumber = parsePhoneNumberFromString(rawValue, 'US');

    if (phoneNumber) {
      setInputValue(phoneNumber.formatInternational());
      register(name).onChange(e);
    }
  };

  return (
    <div className={'max-lg:col-span-2'}>
      <div className="relative">
        <TextField
          type="tel"
          label="Phone Number"
          title="Phone Number"
          name="phoneNumber"
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          {...register(name, { required })}
          onChange={handleChange}
          fullWidth
        />
        {errors[name] && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FaExclamationCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {errors[name] && errors[name]?.type === 'required' && (
        <p className="ml-2 mt-2 text-sm text-red-600" id="email-error">
          {label} is required!
        </p>
      )}
      {errors[name] && (
        <p className="ml-2 mt-2 text-sm text-red-600" id="email-error">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
