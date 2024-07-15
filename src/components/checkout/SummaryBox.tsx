export default function SummaryBox({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) {
  return (
    <div className="min-w-[343px] rounded-xl border border-[#DADADA]">
      <div className="flex flex-row py-5 pl-6 pr-5">
        <div className="flex flex-1 flex-col text-[16px] font-[400] leading-[27px]">
          {children}
        </div>
        <div
          onClick={handleClick}
          className="cursor-pointer flex-row text-sm font-[500] underline"
        >
          Edit
        </div>
      </div>
    </div>
  );
}
