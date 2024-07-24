import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AskQuestionOpenTrigger from './AskQuestionOpenTrigger';
import { useState } from 'react';

export default function AskQuestionDesktop() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  });
  const handleCloseForm = () => {
    setFormState({
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    });
    setName('');
    setEmail('');
    setMessage('');
  };
  const handleEmailSubmit = async () => {
    try {
      setFormState({ ...formState, isLoading: true });
      const formData = {
        name,
        email,
        message,
      };
      const response = await fetch('/api/email/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setFormState({
          ...formState,
          errorMessage: 'An error occurred. Please try again.',
        });
        throw Error('Server Error : Email not sent');
      }
      console.log('we are here');
      setFormState({
        ...formState,
        successMessage: 'Message submitted successfully!',
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setTimeout(() => {
        setFormState({ ...formState, errorMessage: '', isLoading: false });
      }, 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="hidden lg:flex w-full items-center justify-center">
        <DialogTrigger className="">
          <AskQuestionOpenTrigger />
        </DialogTrigger>
      </div>
      <DialogContent
        className={`flex max-h-[86vh]  min-h-[85vh] min-w-[75vw]  flex-col items-center gap-0 rounded-t-2xl px-[200px] py-0 `}
      >
        {formState.successMessage ? null : (
          <div className="w-full pt-5">
            <div className=" w-full pt-[30px]  text-left text-[38px] font-black	 ">
              Have Questions?
            </div>
            <DialogDescription className=" w-full py-2 text-left text-base font-normal">
              We&apos;re here for you! Let us know, and we&apos;ll get back to
              you shortly. Thanks!
            </DialogDescription>
          </div>
        )}
        <Separator
          className={`${formState.successMessage ? 'mt-[121px]' : 'my-2'} `}
        />
        {formState.isLoading ? (
          <AiOutlineLoading3Quarters className=" size-24 animate-spin" />
        ) : formState.errorMessage ? (
          <p>{formState.errorMessage}</p>
        ) : formState.successMessage ? (
          <div className="flex flex-col pb-[20px] pt-[43px] text-center">
            <p className="mb-3 text-4xl font-black">
              Thank you for reaching out to us!
            </p>
            <p className="text-[20px] text-[#767676]">
              {
                "Your message has been received, and we'll get back to you shortly. Thanks!"
              }
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex w-full py-5">
              <div className="w-1/2 pr-4">
                <label className="pl-2 font-bold capitalize" htmlFor="name">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded border p-2"
                />
              </div>
              <div className="w-1/2 pl-4">
                <label className="pl-2 font-bold capitalize" htmlFor="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Your email"
                  className="w-full rounded border p-2"
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <label className="pl-2 font-bold " htmlFor="leave_question">
                Leave your question
              </label>
              <div className="flex">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="leave_question"
                  placeholder="Write your question here."
                  className="h-[240px] flex-grow rounded border p-2"
                ></textarea>
              </div>
            </div>
          </div>
        )}
        <Separator className="my-8" />
        {formState.successMessage ? (
          <div className=" w-100">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              className="mx-auto mt-5 flex h-12 w-[200px]   rounded  border border-[#1A1A1A]  bg-transparent text-base  font-bold  uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              ok
            </Button>
          </div>
        ) : (
          <div className="  flex  w-full flex-row justify-end">
            <Button
              onClick={() => {
                handleCloseForm();
                setOpen(false);
              }}
              className=" mx-2  h-12 w-1/5   rounded border  border-[#1A1A1A] bg-transparent text-lg font-bold  uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleEmailSubmit();
              }}
              className=" mx-2 h-12 w-1/5 rounded border border-[#1A1A1A] bg-[#1A1A1A] text-lg font-bold  uppercase text-white hover:bg-transparent hover:text-[#1A1A1A]"
            >
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
