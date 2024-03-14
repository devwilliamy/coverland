'use client';
import Banner from '@/images/hero/hero.webp';
import Image from 'next/image';
import { Raleway } from 'next/font/google';
import { Lato } from 'next/font/google';
import Phone from '@/images/contact/call 2.webp';
import Chat from '@/images/contact/chat 2.webp';
import Pin from '@/images/contact/location 1.webp';
import Mail from '@/images/contact/mail 1.webp';
import { Separator } from '@/components/ui/separator';
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { sendEmail } from './util';

const raleway = Raleway({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-raleway',
});
const lato = Lato({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-lato',
});

const contactGrid = [
  { img: Pin, text: 'Coverland 15529 Blackburn Ave Norwalk, CA 90650' },
  { img: Chat, text: 'Live Chat' },
  { img: Phone, text: '(800)-799-5165' },
  { img: Mail, text: 'info@coverland.com' },
];
type validObj = {
  value: string;
  errors: boolean;
  errorMessage: string;
  firstVisit: boolean;
};

const Contact = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const [validationObject, setValidationObject] = useState<
    Record<string, validObj>
  >({
    email: {
      value: '',
      errors: false,
      errorMessage: '',
      firstVisit: true,
    },
    phone: {
      value: '',
      errors: false,
      errorMessage: '',
      firstVisit: true,
    },
  });
  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = emailRegex.test(value);
    if (!isValid) {
      console.log(value);
      setValidationObject((e) => {
        return {
          ...e,
          email: {
            ...e.email,
            errors: true,
            errorMessage: 'Invalid Email',
          },
        };
      });
      return;
    }
    setValidationObject((e) => {
      return {
        ...e,
        email: {
          ...e.email,
          errors: false,
          errorMessage: '',
        },
      };
    });
  };
  const validatePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = phoneRegex.test(value);
    if (!isValid) {
      console.log(value);
      setValidationObject((e) => {
        return {
          ...e,
          phone: {
            ...e.phone,
            errors: true,
            errorMessage: 'Invalid Phone Number',
          },
        };
      });
      return;
    }
    setValidationObject((e) => {
      return {
        ...e,
        phone: {
          ...e.phone,
          errors: false,
          errorMessage: '',
        },
      };
    });
  };
  const handleSubmit = (formData: FormData) => {
    let subject: string | unknown;
    let body: string | unknown;
    let email: string | unknown;
    let phoneNumber: string | unknown;
    if (formData) {
      email = formData.get('email')?.valueOf();
      phoneNumber = formData.get('phoneNumber')?.valueOf();
      subject = formData.get('subject')?.valueOf();
      body = formData.get('body')?.valueOf();
      window.location.href = `mailto:?subject=${subject}&body=${email}%0A${phoneNumber}%0A${body}`;
      return;
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.target.value))) {
      return;
    }
    setValidationObject((state) => {
      return {
        ...state,
        phone: {
          ...state.phone,
          value: e.target.value,
        },
      };
    });
    validatePhone(e);
  };

  return (
    <section className="flex w-full flex-col">
      <header className="relative h-28 overflow-hidden lg:h-44">
        <Image
          className="w-full bg-gray-300 bg-no-repeat object-contain"
          alt="coverland-banner"
          src={Banner}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={`${raleway.className} text-[32px] font-bold leading-[32px] text-white lg:text-[40px] lg:leading-[44px]`}
          >
            Contact Us
          </p>
        </div>
      </header>
      <span className="flex h-full w-full flex-col items-center justify-center gap-[48px] py-[30px]">
        {contactGrid.map(({ img, text }) => (
          <div
            key={`contact-item-${img}`}
            className="flex max-w-[153px] flex-col items-center justify-center"
          >
            <Image src={img} alt="contact-grid-image" />
            <p
              className={`pt-[14px] text-center text-[16px] font-[700] leading-[21px]`}
            >
              {text}
            </p>
          </div>
        ))}
      </span>
      <Separator />
      <form
        id="form"
        method="post"
        encType="text/plain"
        className={`px-5 pt-[48px]`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <p className="pb-[48px] text-[16px] leading-[21px] lg:text-[16px] lg:leading-[21px]">
          We love to hear from you! Please let us know if you have any questions
          or concerns and we will get back to you shortly. Thanks!
        </p>
        <p className="pb-2">* Required</p>
        <label htmlFor="subject" className="pb-2 font-black">
          Name *
        </label>
        <input
          id="subject"
          name="subject"
          placeholder="John Doe"
          type="text"
          required
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <label htmlFor="email" className="pb-2 font-black">
          Email *
        </label>
        <input
          id="email"
          name="email"
          placeholder="JohnDoe@email.com"
          type="text"
          required
          onChange={(e) => {
            console.log(validationObject.email.firstVisit);
            !validationObject.email.firstVisit && validateEmail(e);
          }}
          onBlur={(e) => {
            setValidationObject((e) => {
              return {
                ...e,
                email: {
                  ...e.email,
                  firstVisit: false,
                },
              };
            });
            validateEmail(e);
          }}
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <p
          className={`${validationObject.email.errors ? 'font-bold text-[#BE1B1B]' : 'hidden'}`}
        >
          {validationObject.email.errorMessage}
        </p>
        <label htmlFor="phoneNumber" className="pb-2 font-black">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          required
          placeholder="123-45-678"
          value={validationObject.phone.value}
          onChange={handlePhoneChange}
          onBlur={validatePhone}
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <p
          className={`${validationObject.phone.errors ? 'font-bold text-[#BE1B1B]' : 'hidden'}`}
        >
          {validationObject.phone.errorMessage}
        </p>
        <label htmlFor="body" className="pb-2 font-black">
          How Can We Help? *
        </label>
        <textarea
          id="body"
          name="body"
          placeholder="I'd like to talk about..."
          required
          className="mb-[13px] min-h-[190px] w-full resize-none border-[2px] border-[#DBDBDB] p-1"
        />

        <input
          type="submit"
          value={'SUBMIT'}
          disabled={validationObject.email.errors}
          className={`${lato.className} mb-[70px] flex min-h-[40px] min-w-[135px] max-w-[135px]  items-center ${validationObject.email.errors ? 'bg-blue-500/30' : 'cursor-pointer bg-gradient-to-r from-[#072c58] from-5% to-[#034998] to-80%'} justify-center rounded-full   text-[16px] font-[700] leading-[21px] text-white `}
        />
      </form>
    </section>
  );
};

export default Contact;
