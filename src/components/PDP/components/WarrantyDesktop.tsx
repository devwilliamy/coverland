'use client';

export function WarrantyDesktop() {
  return (
    <div className="px-[60px]">
      <div className=" flex w-full items-center gap-[92px] border border-gray-200 px-[40px] py-[93px] text-center">
        {/* min-w-[449px] below to limit 10-year warranty length */}
        <div className="w-6/12  text-[42px] font-black">10-YEARS WARRANTY</div>
        <div className="w-6/12 text-left text-[20px]">
          {
            "Safeguard your valuable investment with the peace of mind that comes from our industry-leading 10-years car cover warranty. Your car deserves the best protection, and we're here to deliver it."
          }
        </div>
      </div>
    </div>
  );
}
