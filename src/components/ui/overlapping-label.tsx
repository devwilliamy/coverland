import { TextField } from '@mui/material';
import { FaExclamationCircle } from 'react-icons/fa';

type OverlappingLabelProps = {
  title: string;
  name: string;
  placeholder: string;
  errors: any;
  register: any;
  required?: boolean;
  options?: any;
  autoComplete: string;
};
export default function OverlappingLabel({
  title,
  name,
  placeholder,
  errors,
  register,
  options,
  autoComplete,
}: OverlappingLabelProps) {
  const inputStyle = errors[name]
    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
    : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-[#ed5f74]';

  return (
    <div className={'max-lg:col-span-2'}>
      <div className={`relative `}>
        <TextField
          label={title}
          fullWidth
          required={options?.required ?? false}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, options)}
          sx={{
            borderRadius: '4px',
          }}
          className={`${inputStyle}  border-[1px] border-[#2A2A2A]`}
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
          {title} is required!
        </p>
      )}
      {errors[name] && (
        <p className="ml-2 mt-2 text-sm text-red-600" id="email-error">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
