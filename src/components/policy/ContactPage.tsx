'use client';
import Banner from '@/images/hero/hero.webp';
import Image, { StaticImageData } from 'next/image';
import { Raleway } from 'next/font/google';
import { Lato } from 'next/font/google';
import Phone from '@/images/contact/call 2.webp';
import Chat from '@/images/contact/chat 2.webp';
import Pin from '@/images/contact/location 1.webp';
import Mail from '@/images/contact/mail 1.webp';
import { Separator } from '@/components/ui/separator';
import { ChangeEvent, useContext, useState } from 'react';
import PolicyTabs from '@/components/policy/PolicyTabs';
import PolicyHeader from '@/components/policy/PolicyHeader';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
  { img: Phone, text: '(888)-694-9915' },
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

export default function ContactPage() {
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
  const [emailSent, setEmailSent] = useState<boolean | undefined | null>();
  const [emailSending, setEmailSending] = useState<boolean | undefined>();
  const [errorFromServer, setErrorFromServer] = useState<
    string | null | undefined
  >();

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
  const handleSubmit = async (formData: FormData) => {
    let senderName: string | unknown;
    let subject: string | unknown;
    let body: string | unknown;
    let email: string | unknown;
    let phoneNumber: string | unknown;
    let to: string | unknown;
    if (formData) {
      to = formData.get('to')?.valueOf();
      email = formData.get('email')?.valueOf();
      phoneNumber = formData.get('phoneNumber')?.valueOf();
      senderName = formData.get('senderName')?.valueOf();
      subject = formData.get('subject')?.valueOf();
      body = formData.get('body')?.valueOf();
      setEmailSending(true);

      const bodyData = {
        to,
        email,
        subject,
        text: body,
        name: senderName,
        phoneNumber,
      };

      try {
        const response = await fetch('/api/email/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bodyData }),
        });
        const emailResponse = await response.json();
        if (emailResponse.code) {
          setEmailSent(true);
          setTimeout(() => {
            setEmailSent(undefined);
          }, 5000);
        } else {
          setEmailSent(null);
          setErrorFromServer(emailResponse?.error);
          setTimeout(() => {
            setEmailSent(undefined);
          }, 5000);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setEmailSending(false);
      }
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

  const determineOnClick = (img: StaticImageData) => {
    switch (img) {
      case Mail:
        const el = document.getElementById('emailTop');
        // return (window.location.href = `mailto:info@coverland.com`);
        const elTop = el?.offsetTop;
        window.scrollTo({
          top: (elTop as number) - 10,
          behavior: 'smooth',
        });
        break;
      case Phone:
        return (window.location.href = 'tel:8886949915');
      case Chat:
        if (visible === 'hidden' || visible === 'minimized') {
          return setVisible('maximized');
        } else {
          return setVisible('minimized');
        }
      default:
        return;
    }
  };

  const determineClickable = (img: StaticImageData) => {
    return img === Mail || img === Chat || img === Phone;
  };

  return (
    <section className="flex w-full flex-col items-center">
      <PolicyHeader headerText="Contact Us" />
      <section className="flex w-full max-w-[880px] flex-col">
        <span className="flex h-full w-full items-center justify-center gap-[48px] py-[30px] max-lg:flex-col lg:items-start  lg:gap-[100px]">
          {contactGrid.map(({ img, text }, i) => (
            <div
              key={`contact-item-${i}`}
              className={`${determineClickable(img) && 'cursor-pointer'} flex  flex-col items-center justify-center`}
              onClick={() => determineOnClick(img)}
            >
              <Image src={img} alt="contact-grid-image" />
              <h1
                className={`pt-[14px] text-center text-[16px] font-[700] leading-[21px]`}
              >
                {text}
              </h1>
            </div>
          ))}
        </span>
        <Separator id="emailTop" />
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
              <label htmlFor="senderName" className="pb-2 font-black">
                Name *
              </label>
              <input
                id="senderName"
                name="senderName"
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
          <span className="mt-[30px] flex w-full flex-col lg:mt-0">
            <label htmlFor="subject" className="pb-2 font-black">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="My car cover..."
              type="text"
              className="min-h-[50px] w-full border-[2px] border-[#DBDBDB] pl-1 max-lg:mb-[30px] lg:mb-[13px]"
            />
          </span>
          <label htmlFor="body" className="font-black">
            How Can We Help? *
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="I'd like to talk about..."
            required
            className="mb-[13px] mt-2 min-h-[190px] w-full resize-none border-[2px] border-[#DBDBDB] p-1"
          />
          {emailSent === true && (
            <div className="mb-[13px] font-black text-[red]"> Email Sent! </div>
          )}
          {errorFromServer && (
            <div className="mb-[13px] font-black text-[red]">
              {' '}
              {errorFromServer}{' '}
            </div>
          )}
          {emailSending ? (
            <div
              className={`${lato.className} mb-[70px] flex min-h-[40px] min-w-[135px] max-w-[135px]  cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#072c58] from-5% to-[#034998] to-80% text-[16px] font-[700] leading-[21px] text-white `}
            >
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          ) : (
            <input
              type="submit"
              value={'SUBMIT'}
              disabled={validationObject.email.errors}
              className={`${lato.className} mb-[70px] flex min-h-[40px] min-w-[135px] max-w-[135px]  items-center ${validationObject.email.errors ? 'bg-blue-500/30' : 'cursor-pointer bg-gradient-to-r from-[#072c58] from-5% to-[#034998] to-80%'} justify-center rounded-full   text-[16px] font-[700] leading-[21px] text-white `}
            />
          )}
        </form>
      </section>
    </section>
  );
}
