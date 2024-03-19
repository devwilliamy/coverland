import EnhancedProtectionSection from '@/components/PDP/components/EnhancedProtectionSection';
import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import ProvenSection from '@/components/PDP/components/ProvenSection';
import RealTestSection from '@/components/PDP/components/RealTestSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import SeeAllSectionClientWrapper from './SeeAllSectionClientWrapper';

export default function FeaturesAndProductsSection() {
  return (
    <SeeAllSectionClientWrapper>
      <FeaturesSection />
      {/* <SeeAllChevronDown /> */}
      {/* <SuggestedProducts /> */}
    </SeeAllSectionClientWrapper>
  );
  //   return (
  //     <>
  //       <section
  //         className={`relative ${seeAllVisible ? 'max-h-[2170px] lg:max-h-[3100px]' : ''} w-full overflow-hidden`}
  //       >
  //         <FeaturesSection />
  //         <div
  //           className={`absolute ${seeAllVisible ? '' : 'hidden'} -bottom-[1px] z-[5] w-full bg-gradient-to-t from-white from-85%`}
  //         >
  //           <div className="flex  flex-col items-center justify-center pt-[10vh]">
  //             <div
  //               onClick={() => setSeeAllVisible(false)}
  //               className="flex cursor-pointer flex-col items-center"
  //             >
  //               <p className="  py-[10px] text-[16px] leading-[19px] lg:text-[20px] lg:leading-[24px]">
  //                 See All
  //               </p>
  //               <div className="flex max-h-[15px] max-w-[40px]">
  //                 <SeeAllChevronDown />
  //               </div>
  //             </div>
  //           </div>
  //           <SuggestedProducts />
  //         </div>
  //       </section>
  //       <section className={`${seeAllVisible ? 'hidden' : 'block'}`}>
  //         <span className="max-w-[100vw] bg-white">
  //           <div className="flex w-full flex-col justify-center px-4">
  //             <EnhancedProtectionSection />
  //             {isDefaultCoverType && <RealTestSection />}
  //             {isDefaultCoverType && <ProvenSection />}
  //             <WarrantySection />
  //           </div>
  //           <SuggestedProducts />
  //         </span>
  //       </section>
  //     </>
  //   );
}
