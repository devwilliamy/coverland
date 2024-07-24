import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type AccordionProps = {
  isMirror: boolean;
  titleName: string;
  value: any;
  index: number;
  accordionState: string;
  handleAccordionState: (value: string) => void;
};
const QuestionAccordionListItem = ({
  isMirror,
  titleName,
  value,
  index,
  accordionState,
  handleAccordionState,
}: AccordionProps) => {
  return (
    <AccordionItem
      className={`${accordionState === `item-${index}-${titleName}` ? 'bg-[#F9F9FB]' : 'bg-white'}  border-t p-2 lg:pl-7`}
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
        }}
      >
        {value.title}
      </AccordionTrigger>
      <AccordionContent className="text-sm font-normal  text-[#636363]   md:text-lg">
        {isMirror && value.altContent ? value.altContent : value.content}
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionAccordionListItem;
