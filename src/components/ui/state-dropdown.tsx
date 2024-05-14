import React from 'react';
import { states } from './states';
import { US_STATES } from '@/lib/constants';
import { FaExclamationCircle } from 'react-icons/fa';

type StateDropdownProps = {
    name: string;
    label: string;
    register: any;
    errors: any;
  };

const StateDropdown: React.FC<StateDropdownProps> = ({ name, label, register, errors }) => {

    return (
        <div>
          <div className="relative">
            <label
              htmlFor={name}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-500"
            >
              {label} *
            </label>
            <select
              id={name}
              {...register(name, { required: `${label} is required` })}
              className={`block w-full rounded-lg border-0 border-[#E1E1E1] bg-[#FAFAFA] py-3 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-base sm:leading-6 ${
                errors.state ? 'ring-red-500' : 'ring-gray-300'
              }`}
            >
              <option value="" disabled>
                --Select a state--
              </option>
              {US_STATES.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
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

export default StateDropdown;

