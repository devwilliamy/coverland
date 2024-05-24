import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Button 
} from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { useState } from 'react';
const qa = 
[
 { 
  name:"General",
  questions:[
    {
      title: "Do I need a cover? ",
      content:`If you want to preserve the paint finish, prevent rust and corrosion, maintain the interior, and prolong the overall lifespan of your vehicle - then yes, a car cover is a wise investment. It provides protection against various environmental factors such as rain, UV rays, dust, bird droppings, and tree sap.
      Additionally, it can deter theft by attracting less attention to your vehicle and reduce the frequency of car washes, saving you time and effort in maintenance.
      `,
    },
    {
      title: "Will this fit my car? Is this a custom fit?  ",
      content:`Certainly! Our car covers are tailored for a precise fit, using the vehicle's shape, with added elastic hems and mirror pockets to ensure a perfect fit.`,
    },
    {
      title: "What if I'm not happy with it? ",
      content:`No worries! We prioritize your happiness. If you're not completely satisfied, you're covered by our free 30-day return policy, along with a 90-day full money-back guarantee. If something happens with a cover later on, you can always utilize our lifetime warranty.`,
    }
  ],
 
  
},
{
  name:"Protection",
  questions:[
    {
      title: "Can a car cover cause rust from trapped moisture?",
      content:`Nope, since our covers feature two air vents to facilitate drying, even when moisture is trapped inside. This unique feature ensures that your car will not rust. Additionally, as of 2024, we're unaware of any other car cover brand offering a similar feature.`,
    },
    {
      title: " Is it safe to leave my car covered outside in heavy rain?",
      content:`Of course! You can leave your vehicle outdoors during heavy rain with our 100% waterproof cover on. No more water spots, paint erosion, rust formation and electrical issues`,
    },
    {
      title: "Can a cover damage paint?",
      content:`No, our covers are designed to protect without causing damage. However, other covers can potentially damage paint due to factors like cheap non-soft lining, lack of a tight fit without bottom straps, dust accumulation caused by wind, and the risk of plastic-like materials fusing to the paint in hot conditions.`
    },
    {
      title: " Does this cover protect from the sun?",
      content:`Yes. This car cover guarantees to provide you with 99.96% protection from the sun's heat and UV rays. No more fading and cracking of paint, dashboard warping, damage to rubber seals and trim.`,
    },
    {
      title: "Can dust blown under the cover scratch my car's paint?",
      content:`It can be a concern, but not with our covers. Our tight custom fit, elastic hem, and additional three straps underneath the car ensure the cover remains snug even in strong winds.`,
    },
    {
      title: "Can dust blown under the cover scratch my car's paint?",
      content:`It can be a concern, but not with our covers. Our tight custom fit, elastic hem, and additional three straps underneath the car ensure the cover remains snug even in strong winds.`,
    },
  ],
},
{ 
  name:"USAGE ",
  questions:[
    {
      title: "Is it easy to put on and take off? ",
      content:`Absolutely! Our car covers are designed for easy installation and removal. With features like elastic hems and a snug fit, you can effortlessly slide the cover on and off your vehicle whenever needed, providing convenience and hassle-free protection.`,
    },
    {
      title: "Does it have mirror pockets? ",
      content:`No, our car covers do not include mirror pockets, but they are tailored to fit your vehicle snugly without compromising protection.`,
      content_two:"Yes, our car covers come equipped with mirror pockets for a secure fit and added protection."
    },
    {
      title: "Do your car covers fit older vehicles with antennas?",
      content:`Yes, our covers include an extra antenna grommet for seamless accommodation, ensuring a perfect fit and protection for vintage vehicles.`,
    },
    {
      title: "Do I need a cable lock if the car cover can prevent theft?",
      content:`Our car covers deter theft by concealing your vehicle. While a cable lock can offer additional security, it may not be necessary for everyone. However, if you seek extra peace of mind, our covers come with reinforced grommets for use with a cable lock, available separately.`,
    }
  ],
},
]
export const AccordingListedItems = ({titleName,value,index,accordionState,handleAccordionState}) =>{
    

  return (
    <AccordionItem className={`${accordionState === `item-${index}-${titleName}` ? 'bg-[#F9F9FB]' : 'bg-white'}  p-2 border-t` } value={`item-${index}-${titleName}`}>
    <AccordionTrigger 
      className="text-left text-base font-black pb-3  text-[#1A1A1A] md:text-xl lg:py-8 lg:text-[22px] hover:no-underline"
      onClick={() =>{
        handleAccordionState(accordionState === `item-${index}-${name}` ? "" : `item-${index}-${titleName}`)

        track(`Opened Q&A${value.title}`)
      }
      }
    >
      {
        value.title
      }
    </AccordionTrigger>
    <AccordionContent className="text-sm text-[#636363]  font-normal   md:text-lg">
      {value.content}
    </AccordionContent>
  </AccordionItem>
  )

}
export function QuestionsAccordion() {
  const handleAccordionExpand = (value:string) => {
    setAccordionOpen(value);
  };
  const [accordionOpen, setAccordionOpen] = useState("");
  return (
    <>
      <div className="min-h-[60vh] bg-white px-2 md:p-8 lg:max-h-none lg:p-14">
        <h3 className="text-center text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl">
          FAQ
        </h3>
        {
        qa && qa?.map(({name,questions},index)=>{
            return(
              <div key={`${name + index}`}>
                <p className='bg-white font-medium my-2	text-2xl text-[#C95656] mt-[36px]  px-2 lg:mt-20 capitalize'>{name.toLowerCase()}</p>
                <Accordion type='single' collapsible className='w-full' >
            {  
            questions.map((question,questionIndex)=>{
            return (
              <div key={`qa-title-${questionIndex}`}>
               <AccordingListedItems
                titleName={name}
                value={question}
                index={questionIndex}
                accordionState={accordionOpen}
                handleAccordionState={handleAccordionExpand}
               /> 
                </div>
              )
              }
            )
        }
        </Accordion>
        </div>
        )
      })
    }
      <Button className="flex h-12 w-[216px] mx-auto my-10 mt-9 text-lg hover:bg-transparent bg-[#1A1A1A] rounded border border-[#1A1A1A]  font-bold hover:text-[#1A1A1A] text-white uppercase">
          ask a question
        </Button> 
      </div>
    </>
  );
}
