export default function KeyBenefitsSection() {
  const KeyBenefits = [
    { title: 'Waterproof', description: 'Keeps car dry in any weather.' },
    { title: 'Paint Protection', description: 'From scratches & Sun/UV.' },
    { title: 'Custom-Fit', description: 'Perfectly Tailored to your Vehicle.' },
  ];
  return (
    <div className="mt-[30px]">
      <p className="pb-6 text-[16px] font-[900] uppercase leading-[18px] ">
        Key benefits
      </p>
      <div className="flex flex-col gap-2.5">
        {KeyBenefits.map(({ title, description }, index) => (
          <li
            key={`benefit-${index}`}
            className="flex items-center gap-2 text-[14px] leading-[22px] text-[#767676] "
          >
            <div className="h-1 w-1 rounded-full bg-black"></div>
            <div className="text-[16px] font-[600] text-black">{title}:</div>
            {description}
          </li>
        ))}
      </div>
    </div>
  );
}
