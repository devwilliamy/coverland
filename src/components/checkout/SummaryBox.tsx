export default function SummaryBox({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) {
  return (
    <div className="w-full rounded-[8px] border-[1px] border-[#DADADA]">
      <div className="flex flex-row px-6 py-5">
        <div className="flex flex-1 flex-col text-base font-normal ">
          {children}
        </div>
        <div
          onClick={handleClick}
          className="flex max-h-fit cursor-pointer font-[500] underline hover:text-[#0C87B8]"
        >
          Edit
        </div>
      </div>
    </div>
  );
}
