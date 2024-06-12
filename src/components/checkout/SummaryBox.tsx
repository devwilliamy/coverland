export default function SummaryBox({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) {
  return (
    <div className="w-full rounded-xl border border-[#707070]">
      <div className="flex flex-row px-6 py-5">
        <div className="flex flex-1 flex-col text-base font-normal text-[#707070]">
          {children}
        </div>
        <div
          onClick={handleClick}
          className="cursor-pointer flex-row text-sm font-normal text-[#0C87B8] underline"
        >
          Edit
        </div>
      </div>
    </div>
  );
}
