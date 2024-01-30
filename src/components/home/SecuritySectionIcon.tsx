type SecuritySectionIconProps = {
  icon: JSX.Element;
  title: string;
  children: React.ReactNode;
};

export default function SecuritySectionIcon({
  icon,
  title,
  children,
}: SecuritySectionIconProps) {
  return (
    <div className="flex w-full flex-row pb-8 lg:pb-10">
      <div className="bg-offWhite icon-shadow mr-3 flex flex-row rounded-lg">
        {icon}
      </div>
      <div className="flex w-3/4 flex-col items-start justify-start">
        <h2 className="text-base font-bold capitalize leading-7 text-[#1A1A1A] lg:text-lg lg:uppercase">
          {title}
        </h2>
        <p className="text-sm font-normal leading-7 text-[#767676]">
          {children}
        </p>
      </div>
    </div>
  );
}
