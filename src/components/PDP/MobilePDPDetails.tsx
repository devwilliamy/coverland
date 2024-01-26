import { GoDotFill } from 'react-icons/go';
import { Layers } from './Layers';
import { OurCarCovers } from './OurCarCovers';
import { PDPAccordion } from './PDPAccordian';
import { ProductChecklist } from './ProductChecklist';
import { ProductHero } from './ProductHero';
import AccordionDrawerItem from './components/AccordionDrawerItem';
import { ClimateCrisisMobile } from './components/ClimateCrisisMobile';
import { NoGarageMobile } from './components/NoGarageMobile';
import { MoneyBackMobile } from './MoneyBackMobile';
import { TReviewData } from '@/lib/db';
import ReviewSection from './components/ReviewSection';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import PolicyHeader from '../policy/PolicyHeader';
import PolicyTitle from '../policy/PolicyTitle';
import PolicyDetail from '../policy/PolicyDetail';
import PolicyFurtherAssistance from '../policy/PolicyFurtherAssistance';

export const MobilePDPDetails = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) => {
  return (
    <div className=" w-full px-4 font-black uppercase text-[#1A1A1A] lg:hidden">
      <div id="CarCoverFeatures">
        <div className="-mx-4 h-[41px] w-screen border-b-2 border-t-2 border-[#DBDBDB] bg-[#F1F1F1] lg:hidden"></div>
        <div className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          Car Cover Features
        </div>
        <div className="pl-4 pt-4">
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Tailored to your car model
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              all-season waterproof protection
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Scratchproof, durable & lightweight
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Soft Inner-lining
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              100% Waterproof - Zero Leaks Guaranteed
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              100% UV Protection
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Easy On/Off with elastic hems
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              effortless cleaning
            </p>
          </div>
        </div>
      </div>

      <AccordionDrawerItem title="Product Details">
        <ProductHero />
        {/* <div className=" md:mt-18 lg:mt-28">
                <Video />
              </div> */}
        <div className="">
          <Layers />
        </div>
      </AccordionDrawerItem>
      <AccordionDrawerItem title="Benefits">
        <div className=" md:mt-18 lg:mt-28">
          <ClimateCrisisMobile />
          <NoGarageMobile />
          <OurCarCovers />
          <ProductChecklist />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem title="Q&A">
        <div className="lg:mt-28">
          <PDPAccordion />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem title="Shipping & Returns">
        <div className=" md:mt-18 lg:mt-28">
          <div className="flex flex-col gap-5 px-2  normal-case">
            <div className="mb-[-15px] text-lg font-black">
              Shipping Details
            </div>
            <div className="font-normal text-[#767676]">
              Enjoy free ground shipping! Please note that these shipping times
              are estimates, and actual delivery times may vary.
            </div>
            <ul className="flex flex-col gap-4">
              <li className="font-normal text-[#767676]">
                - Free Ground Shipping: Delivered within 1-5 business days.
              </li>
              <li className="font-normal text-[#767676] ">
                - Express Shipping: Delivered within 2 days with a flat rate of
                $19.99.
              </li>
            </ul>
            <div className="mb-[-15px] text-lg font-black">Return Details</div>
            <div className="mb-4 font-normal text-[#767676]">
              This item must be returned within 30 days of the date it was
              purchased. See the{' '}
              <a className="underline " href="/policies/return-policy">
                return policy
              </a>{' '}
              for the complete information.
            </div>
          </div>
          <MoneyBackMobile />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem title="Warranty">
        <WarrantyPolicy hideHeader />
      </AccordionDrawerItem>

      {!!reviewData?.length && (
        <AccordionDrawerItem title="Car Cover Reviews">
          <div className="md:mt-18 lg:mt-28">
            <ReviewSection reviewData={reviewData} />
          </div>
        </AccordionDrawerItem>
      )}
    </div>
  );
};
