import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import ProtectionSection from '@/components/PDP/components/ProtectionSection';
import ProvenSection from '@/components/PDP/components/ProvenSection';
import RealTestSection from '@/components/PDP/components/RealTestSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import useDetermineType from '@/hooks/useDetermineType';

export default function VehicleCoverDetails() {
  const { isDefaultCoverType } = useDetermineType();

  return (
    <>
      <FeaturesSection />
      <section>
        <span className="max-w-[100vw] bg-white">
          <div className="flex w-full flex-col justify-center px-4 ">
            <ProtectionSection />
            {isDefaultCoverType && <RealTestSection />}
            {isDefaultCoverType && <ProvenSection />}
            <WarrantySection />
          </div>
          {/* <SuggestedProducts /> */}
        </span>
      </section>
    </>
  );
}
