import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCT_PRICING_DATA } from '@/lib/constants';
import Link from 'next/link';

export default function SuggestedProducts() {
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

  console.log(products);

  return (
    <section id="you-may-also-like-section" className="px-4 pb-[20px]">
      <h1 className="font-[700] uppercase lg:text-[32px] lg:font-[900]">
        you may also like{' '}
      </h1>
      <span className=" no-scrollbar flex gap-2 overflow-x-auto pb-[30px]">
        {products.map((model) => (
          <div key={model.type.slug} className="flex shrink-0 flex-col">
            <Link href={`/${productType}/${model.type.slug}`}>
              <Image
                alt="suggested-product"
                width={200}
                height={200}
                src={model.image}
              />
              <p className="pt-3 text-[16px] font-[600] leading-[16px]">
                {model.type.display}
              </p>
              <p className="pt-0.5 text-[14px] leading-[16px]">
                {'Semi-Custom Car Cover'}
              </p>
              <div className="flex gap-[5px]">
                <p className="pt-[14px] text-[16px] font-[600] leading-[16px]">
                  ${model.price}
                </p>
                <p className="pt-[14px] text-[14px] leading-[16px] text-[#767676] line-through">
                  ${model.msrp}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </span>
    </section>
  );
}
