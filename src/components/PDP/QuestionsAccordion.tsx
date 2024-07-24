import { Accordion } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { getCompleteSelectionData } from '@/utils';
import QuestionAccordionListItem from './QuestionAccordionListItem';
import AskQuestionOpenTrigger from './AskQuestionOpenTrigger';
import AskQuestionMobile from './AskQuestionMobile';
import AskQuestionDesktop from './AskQuestionDesktop';
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
        content: `Certainly! Our car covers are tailored for a precise fit, using the vehicle's shape, with added elastic hems to ensure a perfect fit.`,
        altContent: `Certainly! Our car covers are tailored for a precise fit, using the vehicle's shape, with added elastic hems and mirror pockets to ensure a perfect fit.`,
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
      {
        title: 'Can I use your car cover on a windy day?',
        content: `Yes, this car cover comes with an Anti-Gust 3-Strap system that holds the cover from the front, middle, and back, even in winds of up to 50 mph. Say goodbye to playing "find the car cover" in your neighbor's tree!`,
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

export function QuestionsAccordion() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const modelData = useStore(store, (s) => s.modelData);
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  const isMirror = isComplete && detectMirrors(selectedProduct.sku ?? '');

  const [accordionOpen, setAccordionOpen] = useState('');

  const handleAccordionExpand = (value: string) => {
    setAccordionOpen(value);
  };

  return (
    <>
      <div className="min-h-[60vh] bg-white px-2 md:p-8 lg:max-h-none lg:p-14">
        <h3 className="pt-5 text-center text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl">
          FAQ
        </h3>
        {qa &&
          qa?.map(({ name, questions }, index) => {
            return (
              <div key={`${name + index}`}>
                <p className="my-2 mt-[36px] bg-white	px-2 text-lg font-medium capitalize text-[#C95656] lg:mt-20 lg:pb-7 lg:pl-7 lg:text-2xl">
                  {name.toLowerCase()}
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {questions.map((question, questionIndex) => {
                    return (
                      <div key={`qa-title-${questionIndex}`}>
                        <QuestionAccordionListItem
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
        <AskQuestionMobile />
        <AskQuestionDesktop />
        <Separator />
      </div>
    </>
  );
}
