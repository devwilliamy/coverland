import { Accordion } from '@/components/ui/accordion';
import { useState } from 'react';
import { Separator } from '../ui/separator';
import { useStore } from 'zustand';
import { hasMirrors } from '@/lib/utils';
import useStoreContext from '@/hooks/useStoreContext';
import { getCompleteSelectionData } from '@/utils';
import QuestionAccordionListItem from './QuestionAccordionListItem';
import AskQuestionMobile from './AskQuestionMobile';
import AskQuestionDesktop from './AskQuestionDesktop';
import useDetermineType from '@/hooks/useDetermineType';
// TODO: - Move these into separate file
const carCoverQuestions = [
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
const seatCoverQuestions = [
  {
    name: 'Compatibility and Fit',
    questions: [
      {
        title: 'Are these seat covers custom-made or universal?',
        content:
          'They are custom-made only. Universal ones just never feel good.',
      },
      {
        title: 'What materials are the seat covers made of?',
        content:
          "Our seat covers are crafted from faux leather with memory foam interiors. Additionally, we're in the process of introducing a luxury option made of sheepskin leather. These will be available soon at approximately $800. Contact us to be among the first to acquire them.",
      },
      {
        title:
          'Do the rear seat covers accommodate a split bench or a full bench seat?',
        content:
          'They accommodate a split bench, specifically 60/40, and even 40/20/40 to be precise.',
      },
      {
        title:
          'Do you offer a seat cover for the middle front seat, armrests, and console?',
        content:
          'Not currently. We are working on it and will have it available soon.',
      },
    ],
  },
  {
    name: 'Material and Design',
    questions: [
      {
        title: 'What materials are the seat covers made of?',
        content:
          "Our seat covers are crafted from faux leather with memory foam interiors. Additionally, we're in the process of introducing a luxury option made of sheepskin leather. These will be available soon at approximately $800. Contact us to be among the first to acquire them.",
      },
      {
        title: 'Are the seat covers breathable and comfortable in hot weather?',
        content:
          "Absolutely! We've incorporated breathable cushioning for cool comfort in any climate.",
      },
      {
        title:
          'How durable are these seat covers? Will they withstand wear and tear?',
        content:
          'Our seat covers are highly durable, as evidenced by our 10-year warranty.',
      },
    ],
  },
  {
    name: 'Installation',
    questions: [
      {
        title: 'How easy are these seat covers to install?',
        content:
          'Installation is pretty straightforward, with just 8 simple steps that typically take around 15 minutes.',
      },
      {
        title: 'Do I need any special tools to install these seat covers?',
        content: "No, you won't need any special tools for installation.",
      },
      {
        title: 'Is there a guide or manual available for installation?',
        content: (
          <div>
            Yes, we provide multiple resources for installation guidance. You
            can access a{' '}
            <a
              href="https://www.youtube.com/watch?v=FfPdvTS3vao"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              video guide
            </a>{' '}
            and a{' '}
            <a
              href="/guides/Seat Covers - Installation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              PDF manual
            </a>
            . Additionally, a paper manual is included in every package.
          </div>
        ),
      },
      {
        title: 'Do you have a location in my city that will install it for me?',
        content:
          'Our seat covers are designed for easy self-installation, without the need to remove seats or use special tools. However, if you prefer professional assistance, you can visit any local car service.',
      },
    ],
  },
  {
    name: 'Additional questions',
    questions: [
      {
        title: 'Do the seat covers come with a warranty?',
        content:
          'Yes, they come with a 10-year warranty, covering normal wear and tear as well as ripping and tears. However, please note that this warranty does not cover damage due to improper use or installation, alterations or modifications made to the cover, and damage caused by accidents, abuse, or neglect.',
      },
      {
        title: 'How easy is it to clean them?',
        content:
          'Cleaning our seat covers is very simple. In most cases, a quick swipe with a wet cloth is sufficient. Use mild soap if needed.',
      },
      {
        title:
          'Are there any discounts currently available for veterans and military personnel?',
        content:
          "Typically, we offer a 20% veterans discount. However, this month, we're running a sale with a 50% discount available to everyone. Since discounts cannot be combined, applying your veteran status wouldn't provide additional savings during this sale period.",
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

  // Default to showing mirror FAQ
  const isMirror = !isComplete || hasMirrors(selectedProduct.sku ?? '');

  const [accordionOpen, setAccordionOpen] = useState('');

  const handleAccordionExpand = (value: string) => {
    setAccordionOpen(value);
  };
  const { isSeatCover } = useDetermineType();

  const qa = isSeatCover ? seatCoverQuestions : carCoverQuestions;

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
