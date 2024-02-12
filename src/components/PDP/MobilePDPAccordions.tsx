import { Layers } from './Layers';
import { MoneyBackMobile } from './MoneyBackMobile';
import { OurCarCovers } from './OurCarCovers';
import { PDPAccordion } from './PDPAccordian';
import { ProductChecklist } from './ProductChecklist';
import AccordionDrawerItem from './components/AccordionDrawerItem';
import { ClimateCrisisMobile } from './components/ClimateCrisisMobile';
import { NoGarageMobile } from './components/NoGarageMobile';
import dynamicImport from 'next/dynamic';

const ProductHero = dynamicImport(() => import('./ProductHero'), {
  ssr: false,
});

export function MobilePDPAccordions() {
  return (
    <>
      <AccordionDrawerItem title="Product Details">
        <ProductHero />
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
        <div className=" md:mt-18 mb-[-10px]  lg:mt-28">
          <div className="flex flex-col gap-5  normal-case">
            <div className="flex text-[18px] font-black">Lifetime Warranty</div>
            <div className="mb-[-15px] text-[14px] font-[500]">
              Safeguard your valuable investment with the peace of mind that
              comes from our industry-leading
            </div>
            <div className="text-[14px] font-[500]">
              {
                "Lifetime car cover warranty. Your car deserves the best protection, and we're here to deliver it."
              }
            </div>
          </div>
        </div>
      </AccordionDrawerItem>
    </>
  );
}
