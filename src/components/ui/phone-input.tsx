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
      // trigger(name);
      //   setInputValue(phoneNumber.format('E.164'));
    }
  };

  return (
    <div className={'max-lg:col-span-2'}>
      <div className="relative">
        {/* <label
          htmlFor={name}
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-500"
        >
          {label} {required && '*'}
        </label> */}
        {/* <input
          id={name}
          type="tel"
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, { required })}
          value={inputValue}
          onChange={handleChange}
          className={`block w-full rounded-lg border-0 border-[#E1E1E1] bg-[#FAFAFA] py-3 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-base sm:leading-6 ${inputStyle}`}
        /> */}
        <TextField
          type="tel"
          label="Phone Number"
          title="Phone Number"
          name="phoneNumber"
          // placeholder="+1 123 456 7890"
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          value={inputValue}
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
