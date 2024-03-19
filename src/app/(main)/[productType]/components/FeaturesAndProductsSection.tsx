import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import SeeAllSectionClientWrapper from './SeeAllSectionClientWrapper';

export default function FeaturesAndProductsSection() {
  return (
    <SeeAllSectionClientWrapper
      child1={<FeaturesSection />}
      child2={<SuggestedProducts />}
    ></SeeAllSectionClientWrapper>
  );
}
