import { ChangeEvent, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

type EmailInputProps = {
  email: string;
  setEmail: (newEmail: string) => void;
};

export default function EmailInput({ email, setEmail }: EmailInputProps) {
  const [error, setError] = useState('');
  const inputStyle = error
    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
    : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-[#ed5f74]';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [isFirstTimeFocus, setIsFirstTimeFocus] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = email && emailRegex.test(value);
    if (!isValid) {
      setEmail(e.target.value);
      if (!isFirstTimeFocus) {
        setError('Invalid Email.');
      }
      //   setError('Invalid Email.');
      return;
    }
    setEmail(e.target.value);
    setError('');
  };
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-normal leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="relative mt-0.5 rounded-md shadow-sm">
        <input
          type="email"
          name="email"
          id="email"
          className={`block w-full rounded-lg border-0 border-[#E1E1E1] bg-[#FAFAFA] py-2.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputStyle}`}
          //   placeholder="you@example.com"
        //   aria-invalid="true"
        //   aria-describedby="email-error"
          value={email}
          onChange={handleChange}
          onBlur={() => {
            if (isFirstTimeFocus && email) {
              setIsFirstTimeFocus(false);
            }
          }}
        />

        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FaExclamationCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {error && error}
      </p>
    </div>
  );
}
