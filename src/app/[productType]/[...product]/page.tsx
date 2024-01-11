import {
  TProductData,
  TReviewData,
  fetchPDPData,
  fetchPDPDataWithQuery,
  fetchReviewData,
  getAllDefaultGenerations,
} from '@/lib/db';
import Image from 'next/image';
import CarSelector from '@/components/PDP/CarSelector';

import { redirect } from 'next/navigation';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';

export type TPDPPathParams = { productType: string; product: string[] };

export type TPDPQueryParams = {
  submodel: string | undefined;
  second_submodel: string | undefined;
};

export default async function ProductPDP({
  params: pathParams,
  searchParams,
}: {
  params: TPDPPathParams;
  searchParams: TPDPQueryParams;
}) {
  const submodelParam = searchParams.submodel;
  const make = pathParams?.product[0];
  const model = pathParams?.product[1];
  const year = pathParams?.product[2];
  if (
    pathParams.productType !== 'car-covers' &&
    pathParams.productType !== 'suv-covers' &&
    pathParams.productType !== 'truck-covers' &&
    pathParams.productType !== 'van-covers'
  ) {
    redirect('/404');
  }
  let productData = [];

  productData = submodelParam
    ? (await fetchPDPDataWithQuery(searchParams, pathParams)) ?? []
    : (await fetchPDPData(pathParams)) ?? [];

  if (!productData) return null;

  const reviewData: TReviewData[] | null = await fetchReviewData(
    searchParams,
    pathParams
  );
  console.log(reviewData);

  console.log(productData);

  const submodels = Array.from(
    new Set(
      productData
        ?.map((row) => row.submodel1)
        .filter((row): row is string => Boolean(row))
    )
  );

  const secondSubmodels = Array.from(
    new Set(
      productData
        ?.map((row) => row.submodel2)
        .filter((row): row is string => Boolean(row))
    )
  );

  console.log(secondSubmodels);
  console.log(submodels);
  const modelData = productData?.filter((item) => item.msrp);

  if (modelData.length === 0) {
    redirect('/');
  }

  return (
    <>
      <CarSelector
        modelData={modelData}
        pathParams={pathParams}
        searchParams={searchParams}
        submodels={submodels}
        secondSubmodels={secondSubmodels}
        reviewData={reviewData}
      />
      <div
        id="product-details"
        className="w-full h-auto"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}

function BreadCrumbsTitle() {
  return (
    <div className="w-full mt-8">
      <h6 className="text-[#343434] text-sm font-normal">Home / Car Covers</h6>
    </div>
  );
}

const ProductSwatch = () => {
  //   const searchParams = useSearchParams();
  //   const colorParam = searchParams.get('color');

  //   const {
  //     colorName,
  //     setColorName,
  //     products,
  //     selectedProduct,
  //     setSelectedProduct,
  //   } = useContext(Shop);

  //   const handleProductClick = (product) => {
  //     setSelectedProduct(product);
  //   };

  //   useEffect(() => {
  //     if (selectedProduct) {
  //       const newColorName = selectedProduct.display_color;
  //       setColorName(newColorName);
  //     }
  //   }, [selectedProduct]);

  //   function NextArrow(props) {
  //     const { className, style, onClick } = props;
  //     return (
  //       <div
  //         className={className}
  //         style={{
  //           ...style,
  //           display: 'block',
  //           background: 'white',
  //           color: 'black',
  //         }}
  //         onClick={onClick}
  //       />
  //     );
  //   }

  //   function PrevArrow(props) {
  //     const { className, style, onClick } = props;
  //     return (
  //       <div
  //         className={className}
  //         style={{
  //           ...style,
  //           display: 'block',
  //           background: 'white',
  //           color: 'black',
  //         }}
  //         onClick={onClick}
  //       />
  //     );
  //   }

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: `=>`,
    prevArrow: `<-`,
  };

  return (
    <div id="productSwatch">
      <div className="flex flex-start ">
        <p className="font-bold text-sm text-dark mr-2">Color Option</p>
        <p className="font-normal text-gray text-sm">Color</p>
      </div>
      {/* <Slider {...settings} className="product-swatch-item">
        {products.map((product, index) => (
          <div
            key={index}
            className="!flex flex-col justify-center items-center  hover:cursor-pointer relative"
          >
            <Image
              src={product.feature_image}
              alt="a car cover on top of a car"
              onClick={() => handleProductClick(product)}
              width={100}
              height={100}
            />
          </div>
        ))}
      </Slider> */}
    </div>
  );
};
