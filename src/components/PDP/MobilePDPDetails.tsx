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
import { Accordion } from '../ui/accordion';
import { TReviewData } from '@/lib/db';
import { DrawerTrigger } from '../ui/drawer';
import { FaChevronDown } from 'react-icons/fa';

export const MobilePDPDetails = ({
  reviewData,
}: {
  reviewData: TReviewData[];
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4 font-black uppercase text-[#1A1A1A] lg:hidden"
      defaultValue="item-6"
    >
      {/* <AccordionItem value="item-1">
          <AccordionTrigger
            className="disabled text-xl font-black uppercase text-[#1A1A1A] !no-underline"
            id="#reviews"
          >
            <Drawer>
              <DrawerTrigger className="disabled text-xl font-black uppercase text-[#1A1A1A] !no-underline">
                Car Cover Features
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle> Car Cover Features</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="pl-4">
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
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </AccordionTrigger>
        </AccordionItem> */}
      {/* <AccordionDrawerItem title="Car Cover Features" value="item-1">
        <div className="pl-4">
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
      </AccordionDrawerItem> */}
      <div id="CarCoverFeatures">
        <div className=" mb-4 flex w-full flex-row justify-between border-b-[1px] border-gray-200 py-4 text-left text-xl font-black uppercase text-[#1A1A1A] !no-underline">
          Car Cover Features
        </div>
        <div className="pl-4">
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

      <AccordionDrawerItem title="Product Details" value="item-2">
        <ProductHero />
        {/* <div className=" md:mt-18 lg:mt-28">
                <Video />
              </div> */}
        <div className="">
          <Layers />
        </div>
      </AccordionDrawerItem>
      <AccordionDrawerItem title="Benefits" value="item-3">
        <div className=" md:mt-18 lg:mt-28">
          <ClimateCrisisMobile />
          <NoGarageMobile />
          <OurCarCovers />
          <ProductChecklist />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem value="item-5" title="Q&A">
        <div className="md:mt-18 lg:mt-28">
          <PDPAccordion />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem value="item-6" title="Shipping & Returns">
        <div className=" md:mt-18 lg:mt-28">
          <div className="flex flex-col gap-5 px-2 py-[30px] normal-case">
            <div className="mb-[-15px] text-lg font-black">
              Shipping Details
            </div>
            <div className="font-thin">
              Enjoy free ground shipping! Please note that these shipping times
              are estimates, and actual delivery times may vary.
            </div>
            <ul className="flex flex-col gap-4">
              <li className="font-thin">
                - Free Ground Shipping: Delivered within 1-5 business days.
              </li>
              <li className="font-thin ">
                - Express Shipping: Delivered within 2 days with a flat rate of
                $19.99.
              </li>
            </ul>
            <div className="mb-[-15px] text-lg font-black">Return Details</div>
            <div className="font-thin">
              This item must be returned within 30 days of the date it was
              purchased. See the return policy for the complete information.
            </div>
          </div>
          <MoneyBackMobile />
        </div>
      </AccordionDrawerItem>

      <AccordionDrawerItem value="item-7" title="Warranty">
        <div className=" md:mt-18 mb-[-10px] lg:mt-28">
          <div className="flex flex-col gap-5 py-[30px] normal-case">
            <div className="mb-[-15px] text-lg font-black">
              7-Years Warranty
            </div>
            <div className="font-thin">
              Safeguard your valuable investment with the peace of mind that
              comes from our industry-leading
            </div>
            <div className="font-thin">
              {
                " 7-years car cover warranty. Your car deserves the best protection, and we're here to deliver it."
              }
            </div>
          </div>
        </div>
      </AccordionDrawerItem>

      {!!reviewData.length && (
        <AccordionDrawerItem value="item-9" title="Car Cover Reviews">
          <div className="md:mt-18 lg:mt-28">
            <PDPAccordion />
          </div>
        </AccordionDrawerItem>
      )}
    </Accordion>
  );
};
