import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCT_PRICING_DATA } from '@/lib/constants';
import { useMediaQuery } from '@mantine/hooks';

export default function SuggestedProducts() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams<{
    productType: 'car-covers' | 'suv-covers' | 'truck-covers';
    coverType?: 'premium' | 'premium-plus' | 'standard' | 'standard-pro';
  }>();

  if (!params) {
    return null;
  }
  const productType = params.productType;
  const coverType = params?.coverType;

  const products = PRODUCT_PRICING_DATA[productType].filter(
    (models) => models.type.slug !== coverType
  );

  return (
    <section
      id="you-may-also-like-section"
      className="mt-[60px] px-4 pb-[20px] lg:mt-[110px] lg:px-[40px]"
    >
      <h3 className="pb-3 text-[16px] font-[900] uppercase leading-[18px] lg:pb-8 lg:text-[32px] lg:font-[900]">
        you may also like
      </h3>
      <span className=" no-scrollbar flex gap-2 overflow-x-auto pb-[30px]">
        {products.map((model) => (
          <div key={model.type.slug} className="flex shrink-0 flex-col">
            <a href={`/${productType}/${model.type.slug}`}>
              <Image
                alt="suggested-product"
                width={isMobile ? 200 : 316}
                height={isMobile ? 200 : 316}
                src={model.image}
              />
              <p className="pt-3 text-[16px] font-[600] leading-[16px]">
                {model.type.display}
              </p>
              <p className="pt-0.5 text-[14px] leading-[16px]">
                {model.type.slug !== 'standard-pro' &&
                model.type.slug !== 'standard'
                  ? 'Custom Car Cover'
                  : 'Semi-Custom Car Cover'}
              </p>
              <div className="flex gap-[5px]">
                <p className="pt-[14px] text-[16px] font-[600] leading-[16px]">
                  ${model.msrp}
                </p>

                {model.type.slug !== 'standard-pro' &&
                  model.type.slug !== 'standard' && (
                    <p className="pt-[14px] text-[14px] leading-[16px] text-[#767676] line-through">
                      ${model.price}
                    </p>
                  )}
              </div>
            </a>
          </div>
        ))}
      </span>
    </section>
  );
}
