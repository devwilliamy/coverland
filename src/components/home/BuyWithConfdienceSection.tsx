'use client';
import FreeReturnPackageIcon from '../icons/FreeReturnPackageIcon';
import FreeShippingTruckIcon from '../icons/FreeShippingTruckIcon';
import MoneyBackIcon from '../icons/MoneyBackIcon';
import SecureShoppingShieldIcon from '../icons/SecureShoppingShieldIcon';
import BuyWithConfidenceIcon from './BuyWithConfidenceIcon';

export default function BuyWithConfidenceSection() {
  return (
    <div className=" flex h-auto  flex-col items-center bg-white px-[11.4vw]">
      <div className="flex flex-col items-start justify-center lg:flex-row ">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full pb-[60px] lg:pb-20">
            <h1 className="text-center text-2xl font-extrabold uppercase md:text-5xl  xl:text-center">
              Buy with confidence
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-32">
            <BuyWithConfidenceIcon
              icon={<FreeReturnPackageIcon />}
              title="30-Day Free Returns"
              content="Return Label Included"
            />
            <BuyWithConfidenceIcon
              icon={<MoneyBackIcon />}
              title="90-Day Full Money Back"
              content="No Restocking Fees"
            />
            <BuyWithConfidenceIcon
              icon={<FreeShippingTruckIcon />}
              title="Same-Day Free Shipping"
              content="All Orders Over $50"
            />
            <BuyWithConfidenceIcon
              icon={<SecureShoppingShieldIcon />}
              title="Secure Shopping"
              content="Protection Against Fraud"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
