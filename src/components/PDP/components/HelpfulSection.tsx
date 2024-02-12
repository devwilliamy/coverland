type HelpfulSectionProps = {
  numberOfHelpful: string;
};

export default function HelpfulSection({
  numberOfHelpful,
}: HelpfulSectionProps) {
  return (
    <span>
      <div className="mt-[34px] flex max-w-[80px] flex-col ">
        <p className="whitespace-nowrap text-sm font-normal text-[#767676]">
          {numberOfHelpful} people found this helpful
        </p>
        {/* <button className="mt-4 rounded-[4px] px-1 py-2 text-sm font-bold leading-[17px] outline outline-1 ">
          Helpful
        </button> */}
      </div>
    </span>
  );
}
