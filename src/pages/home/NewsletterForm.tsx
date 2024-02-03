'use client';
import { FormEvent, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
const NewsletterForm = () => {
  const [email_address, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-l bg-white p-4 text-[#767676]"
        />
        <button
          type="submit"
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
