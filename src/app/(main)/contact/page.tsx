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
import { ChangeEvent, useState } from 'react';
import PolicyTabs from '@/components/policy/PolicyTabs';
import PolicyHeader from '@/components/policy/PolicyHeader';

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
  {
    img: Pin,
    text: (
      <>
        Coverland <br /> 15529 Blackburn Ave <br /> Norwalk, CA 90650
      </>
    ),
  },
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
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\+?[0-9()-]+\s?[0-9()-]*[0-9]$/;
const isNumberExp = /^[0-9]*$/;

export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, '');

  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, '$1-$2');
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3');
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

const Contact = () => {
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
      window.location.href = `mailto:info@coverland.com?subject=${subject}&body=${email}%0A${phoneNumber}%0A${body}`;
      return;
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    setValidationObject((state) => {
      return {
        ...state,
        phone: {
          ...state.phone,
          value: phoneNumberAutoFormat(value),
        },
      };
    });
  };

  return (
    <section className="flex w-full flex-col items-center">
      <PolicyHeader headerText="Contact Us" />
      <section className="flex w-full max-w-[880px] flex-col">
        <span className="flex h-full w-full items-center justify-center gap-[48px] py-[30px] max-lg:flex-col lg:items-start  lg:gap-[100px]">
          {contactGrid.map(({ img, text }, i) => (
            <div
              key={`contact-item-${i}`}
              className={`${img === Mail && 'cursor-pointer'} flex  flex-col items-center justify-center`}
              onClick={
                img === Mail
                  ? () => {
                      window.location.href = `mailto:info@coverland.com`;
                    }
                  : () => {}
              }
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
          className={`px-5 pt-[48px] `}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <p className="pb-[48px] text-[16px] leading-[21px] lg:text-center lg:text-[16px] lg:leading-[21px]">
            We love to hear from you! Please let us know if you have any
            questions or concerns and we will get back to you shortly. Thanks!
          </p>
          <p className="pb-2">* Required</p>
          <span className="items center grid w-full grid-cols-1 justify-items-center gap-[30px]  lg:grid-cols-3">
            <div className=" flex w-full flex-col">
              <label htmlFor="subject" className="pb-2 font-black">
                Name *
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="John Doe"
                type="text"
                required
                className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB] pl-1"
              />
            </div>
            <div className="flex w-full flex-col ">
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
                  !validationObject.email.firstVisit && validateEmail(e);
                }}
                onBlur={(e) => {
                  setValidationObject((state) => {
                    return {
                      ...state,
                      email: {
                        ...state.email,
                        firstVisit: false,
                      },
                    };
                  });
                  validateEmail(e);
                }}
                className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB] pl-1"
              />
              <p
                className={`${validationObject.email.errors ? 'font-bold text-[#BE1B1B]' : 'hidden'}`}
              >
                {validationObject.email.errorMessage}
              </p>
            </div>

            <div className="flex w-full flex-col ">
              <label htmlFor="phoneNumber" className="mb-2 font-black">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="(+)123-456-7890"
                value={validationObject.phone.value}
                onChange={handlePhoneChange}
                maxLength={13}
                onBlur={(e) => {
                  setValidationObject((state) => {
                    return {
                      ...state,
                      phone: {
                        ...state.phone,
                        firstVisit: false,
                      },
                    };
                  });
                  handlePhoneChange(e);
                }}
                className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB] pl-1"
              />
              <p
                className={`${validationObject.phone.errors ? 'font-bold text-[#BE1B1B]' : 'hidden'}`}
              >
                {validationObject.phone.errorMessage}
              </p>
            </div>
          </span>
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
    </section>
  );
};

export default Contact;
