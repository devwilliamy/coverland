export function ProductSpecGrid() {
  //use placeholder data for now
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="hidden w-full pb-8 lg:block lg:pb-16">
          <p className="text-center text-2xl font-black uppercase tracking-[1.35px] text-[#1A1A1A] md:text-3xl lg:text-5xl">
            specification
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-0 gap-y-8 pt-4 md:grid-cols-2 lg:pt-0">
          <div className="flex flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl">
              Model:
            </p>
            <p className="pl-2 text-base font-normal text-[#1A1A1A] md:text-xl">
              CC-CN-07-J-GR
            </p>
          </div>
          <div className="flex flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl">
              Exterior:
            </p>
            <p className="pl-2 text-base font-normal capitalize text-[#1A1A1A] md:text-xl">
              Polyester
            </p>
          </div>
          <div className="flex flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl">
              Item Weight:
            </p>
            <p className="pl-2 text-base font-normal text-[#1A1A1A] md:text-xl">
              2.2 Pounds
            </p>
          </div>
          <div className="flex flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl">
              Interior:
            </p>
            <p className="pl-2 text-base font-normal capitalize text-[#1A1A1A] md:text-xl">
              Fleece
            </p>
          </div>
          <div className="flex flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl">
              Product Dimensions:
            </p>
            <p className="pl-2 text-base font-normal text-[#1A1A1A] md:text-xl">
              18 x 15 x 8 inch
            </p>
          </div>
          <div className="hidden flex-row border-b border-[#E6E6E6] border-opacity-30 pb-2 md:pb-4 lg:flex">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] md:text-xl"></p>
            <p className="pl-2 text-base font-normal text-[#1A1A1A] md:text-xl"></p>
          </div>
        </div>
      </div>
    </>
  );
}
