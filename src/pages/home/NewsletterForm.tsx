'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
const NewsletterForm = () => {
  const [email_address, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [isFirstTimeFocus, setIsFirstTimeFocus] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = emailRegex.test(value);
    if (!isValid) {
      setEmail(e.target.value);
      if (!isFirstTimeFocus) {
        setMessage('Invalid Email.');
      }
      return;
    }
    setEmail(e.target.value);
    setMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email_address;
    const isValid = emailRegex.test(value);
    if (!isValid) {
      setMessage('Invalid Email.');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address }),
      });

      if (response.status === 200) {
        setMessage(`You subscribed! We will be in touch via email soon.`);
      } else {
        const data = response.headers.get('content-length')
          ? await response.json()
          : {};
        setMessage(
          // data.error || 'Something went wrong. Please try again later.'
          `You subscribed! We will be in touch via email soon.`
        );
      }
    } catch (error) {
      console.error('There was an error:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex h-12 flex-row">
        <input
          type="email"
          placeholder="Your Email"
          value={email_address}
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={() => {
            if (isFirstTimeFocus) {
              setIsFirstTimeFocus(false);
            }
          }}
          className="w-full rounded-l bg-white p-4 text-[#767676]"
        />
        <button
          type="submit"
          disabled={message ? true : false}
          className=" hover:bg-red flex h-12 w-12 flex-col items-center justify-center bg-[#BE1B1B] duration-300"
        >
          <BsChevronRight size={20} color={'#fff'} />
        </button>
      </form>
      {message && <p className="pt-4 text-white">{message}</p>}
    </div>
  );
};

export default NewsletterForm;
