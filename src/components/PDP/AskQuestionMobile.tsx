import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import AskQuestionOpenTrigger from './AskQuestionOpenTrigger';

export default function AskQuestionMobile() {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex w-full items-center justify-center lg:hidden">
        <SheetTrigger>
          <AskQuestionOpenTrigger />
        </SheetTrigger>
      </div>
      <SheetContent
        side={'bottom'}
        className="max-h-[85vh] min-h-[80vh] overflow-y-scroll rounded-t-2xl px-4 "
      >
        <SheetHeader>
          <div className="justify-left flex flex-col">
            {formState.successMessage ? null : (
              <>
                <SheetTitle className="pb-4 pt-[32px] text-left text-[29px] font-black leading-[26px]">
                  Have Questions?
                </SheetTitle>
                <SheetDescription className="mb-2 text-left text-[14px]">
                  We&apos;re here for you! Let us know, and we&apos;ll get back
                  to you shortly. Thanks!
                </SheetDescription>
              </>
            )}
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setOpen(false);
                  handleCloseForm();
                }}
              >
                <X className="h-[24px] w-[24px]" />
              </div>
            </SheetClose>
          </div>
        </SheetHeader>
        <Separator />
        {formState.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <AiOutlineLoading3Quarters className=" size-24 animate-spin text-center" />
          </div>
        ) : formState.errorMessage ? (
          <div className="flex items-center justify-center py-20">
            <p>{formState.errorMessage}</p>
          </div>
        ) : formState.successMessage ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col pb-[20px] pt-[43px] text-center">
              <p className="mb-3 text-3xl font-black">
                Thank you for reaching out to us!
              </p>
              <p className="text-[16px] text-[#767676]">
                {
                  "Your message has been received, and we'll get back to you shortly. Thanks!"
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4 pt-[38px]">
            <div className="flex flex-col">
              <div className="flex flex-col ">
                <label
                  htmlFor="name"
                  className="pb-[6px] pl-2 font-bold capitalize		"
                >
                  Name
                </label>
                <input
                  className="rounded-lg border border-[#9C9C9C] p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col py-[16px]">
                <label
                  htmlFor="email"
                  className="pb-[6px] pl-2 font-bold capitalize		 "
                >
                  Email
                </label>
                <input
                  className="rounded-lg border border-[#9C9C9C] p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Your email"
                />
              </div>
              <div className="flex flex-col pb-[22px]">
                <label
                  htmlFor="leave_question"
                  className="pb-[6px] pl-2 font-bold capitalize		"
                >
                  Leave a question
                </label>
                <textarea
                  className="h-[150px] rounded-lg border border-[#9C9C9C] p-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="leave_question"
                  placeholder="Write your question here."
                />
              </div>
            </div>
            {formState.successMessage ? (
              <div className="w-[200px]">
                <Button
                  onClick={() => {
                    handleCloseForm();
                    setOpen(false);
                  }}
                  className="mx-auto mt-5 flex h-12 w-full   rounded border  border-[#1A1A1A] bg-transparent text-lg font-bold  uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                >
                  Close
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmailSubmit();
                  }}
                  className="mx-auto mt-3 flex h-12  w-full rounded border border-[#1A1A1A] bg-[#1A1A1A] text-lg font-bold  uppercase text-white hover:bg-transparent hover:text-[#1A1A1A]"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    handleCloseForm();
                    setOpen(false);
                  }}
                  className="mx-auto mt-5 flex h-12 w-full   rounded border  border-[#1A1A1A] bg-transparent text-lg font-bold  uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
