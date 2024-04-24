import { FaExclamationCircle } from 'react-icons/fa';

type OverlappingLabelProps = {
  title: string;
  //   type: string;
  name: string;
  //   id: string;
  placeholder: string;
  errors: any;
  register: any;
  options?: any;
};
export default function OverlappingLabel({
  title,
  //   type,
  name,
  //   id,
  placeholder,
  errors,
  register,
  options,
}: OverlappingLabelProps) {
  const inputStyle = errors[name]
    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
    : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-[#ed5f74]';
  return (
    <div>
      <div className="relative">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-500"
        >
          {/* Name */}
          {title} {options?.required && '*'}
        </label>
        <input
          className={`block w-full rounded-lg border-0 border-[#E1E1E1] bg-[#FAFAFA] py-2.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputStyle}`}
          placeholder={placeholder} //Jane Doe
          {...register(name, options)}
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
        <p className="mt-2 ml-2 text-sm text-red-600" id="email-error">
          {title} is required!
        </p>
      )}
    </div>
  );
}
