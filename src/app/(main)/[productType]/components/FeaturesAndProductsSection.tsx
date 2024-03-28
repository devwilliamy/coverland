import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import SeeAllSectionClientWrapper from './SeeAllSectionClientWrapper';

// Originally was going to have this as a server component that is using a client component wrapper
// in order to pass in other server components. Might not be able to because of the structure now
export default function FeaturesAndProductsSection() {
  return (
    <SeeAllSectionClientWrapper
      // child1={<FeaturesSection />}
      // child2={<SuggestedProducts />}
    ></SeeAllSectionClientWrapper>
  );
}
