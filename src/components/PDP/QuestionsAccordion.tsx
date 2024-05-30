import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {  X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { useContext, useState } from 'react';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useStore } from 'zustand';
import { detectMirrors } from '@/lib/utils';
import useStoreContext from '@/hooks/useStoreContext';
const qa = [
  {
    name: 'General',
    questions: [
      {
        title: 'Do I need a cover? ',
        content: `If you want to preserve the paint finish, prevent rust and corrosion, maintain the interior, and prolong the overall lifespan of your vehicle - then yes, a car cover is a wise investment. It provides protection against various environmental factors such as rain, UV rays, dust, bird droppings, and tree sap.
      Additionally, it can deter theft by attracting less attention to your vehicle and reduce the frequency of car washes, saving you time and effort in maintenance.
      `,
      },
      {
        title: 'Will this fit my car? Is this a custom fit?  ',
        content: `Certainly! Our car covers are tailored for a precise fit, using the vehicle's shape, with added elastic hems`,
        altContent: `Certainly! Our car covers are tailored for a precise fit, using the vehicle's shape, with added elastic hems and mirror pockets to ensure a perfect fit.`
      },
      {
        title: "What if I'm not happy with it? ",
        content: `No worries! We prioritize your happiness. If you're not completely satisfied, you're covered by our free 30-day return policy, along with a 90-day full money-back guarantee. If something happens with a cover later on, you can always utilize our lifetime warranty.`,
      },
    ],
  },
  {
    name: 'Protection',
    questions: [
      {
        title: 'Can a car cover cause rust from trapped moisture?',
        content: `Nope, since our covers feature two air vents to facilitate drying, even when moisture is trapped inside. This unique feature ensures that your car will not rust. Additionally, as of 2024, we're unaware of any other car cover brand offering a similar feature.`,
      },
      {
        title: ' Is it safe to leave my car covered outside in heavy rain?',
        content: `Of course! You can leave your vehicle outdoors during heavy rain with our 100% waterproof cover on. No more water spots, paint erosion, rust formation and electrical issues`,
      },
      {
        title: 'Can a cover damage paint?',
        content: `No, our covers are designed to protect without causing damage. However, other covers can potentially damage paint due to factors like cheap non-soft lining, lack of a tight fit without bottom straps, dust accumulation caused by wind, and the risk of plastic-like materials fusing to the paint in hot conditions.`,
      },
      {
        title: ' Does this cover protect from the sun?',
        content: `Yes. This car cover guarantees to provide you with 99.96% protection from the sun's heat and UV rays. No more fading and cracking of paint, dashboard warping, damage to rubber seals and trim.`,
      },
      {
        title: "Can dust blown under the cover scratch my car's paint?",
        content: `It can be a concern, but not with our covers. Our tight custom fit, elastic hem, and additional three straps underneath the car ensure the cover remains snug even in strong winds.`,
      },

    ],
  },
  {
    name: 'USAGE ',
    questions: [
      {
        title: 'Is it easy to put on and take off? ',
        content: `Absolutely! Our car covers are designed for easy installation and removal. With features like elastic hems and a snug fit, you can effortlessly slide the cover on and off your vehicle whenever needed, providing convenience and hassle-free protection.`,
      },
      {
        title: 'Does it have mirror pockets? ',
        content: `No, our car covers do not include mirror pockets, but they are tailored to fit your vehicle snugly without compromising protection.`,
        altContent:
          'Yes, our car covers come equipped with mirror pockets for a secure fit and added protection.',
      },
      {
        title: 'Do your car covers fit older vehicles with antennas?',
        content: `Yes, our covers include an extra antenna grommet for seamless accommodation, ensuring a perfect fit and protection for vintage vehicles.`,
      },
      {
        title: 'Do I need a cable lock if the car cover can prevent theft?',
        content: `Our car covers deter theft by concealing your vehicle. While a cable lock can offer additional security, it may not be necessary for everyone. However, if you seek extra peace of mind, our covers come with reinforced grommets for use with a cable lock, available separately.`,
      },
    ],
  },
];

interface AccordionProps {
  isMirror:boolean;
  titleName: string;
  value: any;
  index: number;
  accordionState: string;
  handleAccordionState: (value: string) => void;
}
export const AccordingListedItems = ({
  isMirror,
  titleName,
  value,
  index,
  accordionState,
  handleAccordionState,
}: AccordionProps) => {
  return (
    <AccordionItem
      className={`${accordionState === `item-${index}-${titleName}` ? 'bg-[#F9F9FB]' : 'bg-white'}  border-t p-2`}
      value={`item-${index}-${titleName}`}
    >
      <AccordionTrigger
        showPlus={true}
        className="pb-3 text-left text-base font-black  text-[#1A1A1A] hover:no-underline md:text-xl lg:py-8 lg:text-[22px]"
        onClick={() => {
          handleAccordionState(
            accordionState === `item-${index}-${titleName}`
              ? ''
              : `item-${index}-${titleName}`
          );

          track(`Opened Q&A${value.title}`);
        }}
      >
        {value.title}
      </AccordionTrigger>
      <AccordionContent className="text-sm font-normal  text-[#636363]   md:text-lg">
        {!isMirror ? value.content : value.altContent}
      </AccordionContent>
    </AccordionItem>
  );
};

export function QuestionsAccordion() {
  const store = useStoreContext();
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const isMirror = detectMirrors(selectedProduct.sku)
  const [accordionOpen, setAccordionOpen] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  });

  const handleAccordionExpand = (value: string) => {
    setAccordionOpen(value);
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
  return (
    <>
      <div className="min-h-[60vh] bg-white px-2 md:p-8 lg:max-h-none lg:p-14">
        <h3 className="text-center pt-5 text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl">
          FAQ
        </h3>
        {qa &&
          qa?.map(({ name, questions }, index) => {
            return (
              <div key={`${name + index}`}>
                <p className="my-2 mt-[36px] bg-white	px-2 text-2xl font-medium  capitalize text-[#C95656] lg:mt-20">
                  {name.toLowerCase()}
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {questions.map((question, questionIndex) => {
                    return (
                      <div key={`qa-title-${questionIndex}`}>
                        <AccordingListedItems
                          isMirror={isMirror}
                          titleName={name}
                          value={question}
                          index={questionIndex}
                          accordionState={accordionOpen}
                          handleAccordionState={handleAccordionExpand}
                        />
                      </div>
                    );
                  })}
                </Accordion>
              </div>
            );
          })}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex w-full items-center md:hidden">
            <OpenTrigger />
          </SheetTrigger>
          <SheetContent
            side={'bottom'}
            className="max-h-[85vh] min-h-[80vh] overflow-y-scroll rounded-t-2xl px-4 "
          >
            <SheetHeader>
              <div className="justify-left flex flex-col">
                <SheetTitle className="pb-4 pt-[32px] text-left text-[29px] font-[700] leading-[26px]">
                  Have Questions?
                </SheetTitle>
                <SheetDescription className="mb-2 text-left text-[14px]">
                  We&apos;re here for you! Let us know, and we&apos;ll get back to you
                  shortly. Thanks!
                </SheetDescription>

                <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
                  <div
                    id="CloseModalButton"
                    className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <X className="h-[24px] w-[24px]" />
                  </div>
                </SheetClose>
              </div>
            </SheetHeader>
            <Separator />
            {formState.isLoading ? (
              <div className="flex justify-center items-center py-20">
                <AiOutlineLoading3Quarters className=" size-24 animate-spin text-center" />
              </div>
              
            ) : formState.errorMessage ? (
              <div className="flex justify-center items-center py-20">
                <p>{formState.errorMessage}</p>
              </div>
              
            ) : formState.successMessage ? (
              <div className="flex justify-center items-center py-20">
                 <p>{formState.successMessage}</p>
              </div>
            ) : (
            <div className="grid gap-4 py-4 pt-10">
              <div className="grid grid-cols-1 items-center gap-4">
                <label htmlFor="name" className="pl-2 font-bold capitalize		">
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
                <label htmlFor="email" className="pl-2 font-bold capitalize		 ">
                  Email
                </label>
                <input
                  className="rounded-lg border border-[#9C9C9C] p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Your Email"
                />
                <label
                  htmlFor="leave_question"
                  className="pl-2 font-bold capitalize		"
                >
                  Leave a question
                </label>
                <textarea
                  className="h-[150px] rounded-lg border border-[#9C9C9C] p-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="leave_question"
                  placeholder="Email subject here"
                />
              </div>
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
            </div>
            )
          }
          </SheetContent>
        </Sheet>
        {/* </span> */}

        {/* <span className="hidden lg:block"> */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="hidden w-full items-center md:flex">
            <OpenTrigger />
          </DialogTrigger>
          <DialogContent className="flex max-h-[86vh] min-h-[85vh]  min-w-[75vw] flex-col items-center gap-0 rounded-t-2xl py-0 ">
            {/* <DialogHeader>
              <DialogClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
                <div
                  id="CloseModalButton"
                  className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <X className="h-[24px] w-[24px]" />
                </div>
              </DialogClose>
                
            </DialogHeader> */}
            <div className="w-full py-5">
              <div className=" w-full pt-[30px]  text-left text-[38px] font-[900] ">
                Have Questions?
              </div>
              <DialogDescription className=" font-large w-full py-2 text-left">
                We&apos;re here for you! Let us know, and we&apos;ll get back to you
                shortly. Thanks!
              </DialogDescription>
            </div>

            <Separator className="my-2" />
            {formState.isLoading ? (
              <AiOutlineLoading3Quarters className=" size-24 animate-spin" />
            ) : formState.errorMessage ? (
              <p>{formState.errorMessage}</p>
            ) : formState.successMessage ? (
              <p>{formState.successMessage}</p>
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
                    <label
                      className="pl-2 font-bold capitalize"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="text"
                      placeholder="Your Email"
                      className="w-full rounded border p-2"
                    />
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <label
                    className="pl-2 font-bold capitalize"
                    htmlFor="leave_question"
                  >
                    Leave Your Questions
                  </label>
                  <div className="flex">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      name="leave_question"
                      placeholder="Email subject here"
                      className="h-[240px] flex-grow rounded border p-2"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            <Separator className="my-8" />
            <div className=" mt-10 flex  w-full flex-row justify-end">
              <Button
                onClick={() => {
                  handleCloseForm();
                  setDialogOpen(false);
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
          </DialogContent>
        </Dialog>
        {/* </span> */}

        <Separator />
      </div>
    </>
  );
}

const OpenTrigger = () => (
  <Button className="mx-auto my-10 mt-9 flex h-12 w-[216px] rounded border border-[#1A1A1A] bg-[#1A1A1A] text-lg font-bold  uppercase text-white hover:bg-transparent hover:text-[#1A1A1A]">
    ask a question
  </Button>
);
