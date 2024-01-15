import {
  TProductData,
  fetchPDPData,
  fetchPDPDataWithQuery,
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

  // console.log(productData);

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

  // console.log(secondSubmodels);
  // console.log(submodels);
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
      />
      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails />
      </div>
    </>
  );
}

function BreadCrumbsTitle() {
  return (
    <div className="mt-8 w-full">
      <h6 className="text-sm font-normal text-[#343434]">Home / Car Covers</h6>
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
      <div className="flex-start flex ">
        <p className="text-dark mr-2 text-sm font-bold">Color Option</p>
        <p className="text-gray text-sm font-normal">Color</p>
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
