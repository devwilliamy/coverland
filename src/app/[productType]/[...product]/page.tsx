import {
  ProductJson,
  TProductData,
  TReviewData,
  fetchPDPData,
  fetchPDPDataWithQuery,
  fetchReviewData,
} from '@/lib/db';
import Image from 'next/image';
import CarSelector from '@/components/PDP/CarSelector';
import skuDisplayData from '@/data/skuDisplayData.json';
import { redirect } from 'next/navigation';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { colorOrder } from '@/lib/constants';
import { deslugify, slugify } from '@/lib/utils';
import { refreshRoute } from './actions';

export type TPDPPathParams = { productType: string; product: string[] };

export type TPDPQueryParams = {
  submodel: string | undefined;
  second_submodel: string | undefined;
};

export type TSkuJson = typeof skuDisplayData;

export default async function ProductPDP({
  params: pathParams,
  searchParams,
}: {
  params: TPDPPathParams;
  searchParams: TPDPQueryParams;
}) {
  const submodelParam = searchParams.submodel;
  const secondSubmodelParam = searchParams.second_submodel;
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
  // refreshRoute('/');
  const initialProductData = await fetchPDPData(pathParams);

  const reviewData: TReviewData[] | null =
    (await fetchReviewData(searchParams, pathParams)) ?? [];

  console.log(reviewData);

  if (!initialProductData) {
    redirect('/');
  }

  console.log(initialProductData);

  const parentGeneration = skuDisplayData.find(
    (row) =>
      row.year_generation === year &&
      slugify(row.make) === make &&
      slugify(row.model) === model
  );

  console.log(parentGeneration);

  const jsonForSku = (fk: number) => {
    return skuDisplayData.find((row) => row.fk === fk);
  };

  const generationDefaultChildren = parentGeneration?.generation_default
    ? initialProductData.filter((product) => {
        return (
          jsonForSku(product.fk as number)?.generation_default ===
          parentGeneration?.generation_default
        );
      })
    : initialProductData.filter(
        (product) => product.fk === parentGeneration?.fk
      );

  console.log(generationDefaultChildren, 'gen');

  const productsWithSubmodels = generationDefaultChildren.filter(
    (product) =>
      product.submodel1 &&
      generationDefaultChildren.map((p) => p.fk).includes(product.fk)
  );
  console.log(productsWithSubmodels);
  const submodels = Array.from(
    new Set(productsWithSubmodels.map((product) => product.submodel1))
  ).filter(Boolean) as string[];

  const secondSubmodels = Array.from(
    new Set(productsWithSubmodels.map((product) => product.submodel2))
  ).filter(Boolean) as string[];

  let modelData = submodelParam
    ? productsWithSubmodels
    : generationDefaultChildren;

  console.log(modelData);
  modelData.map((product) => console.log(product.submodel1, product.submodel2));
  modelData = modelData
    .filter((product) => product.msrp && product.price)
    .sort((a, b) => {
      let colorIndexA = colorOrder.indexOf(a?.display_color as string);
      let colorIndexB = colorOrder.indexOf(b?.display_color as string);

      if (colorIndexA === -1) colorIndexA = Infinity;
      if (colorIndexB === -1) colorIndexB = Infinity;

      return colorIndexA - colorIndexB;
    });
  console.log(modelData);

  if (secondSubmodelParam) {
    modelData = modelData.filter(
      (product) => product.submodel2?.toLowerCase() === secondSubmodelParam
    );
  }
  console.log(modelData);

  console.log(secondSubmodelParam);

  // console.log(productData);

  // if (!productData) return null;

  // const modelJson = productJson as ProductJson[];

  // const jsonForData = modelJson.filter(
  //   (row) =>
  //     row.year_generation === year &&
  //     deslugify(make).toLowerCase() === row.make.toLowerCase()
  // )?.[0];

  // console.log(jsonForData);

  // const yearFk = modelJson.filter((row) => row.year_generation === year)?.[0]
  //   ?.fk;

  // // console.log(reviewData);

  // // console.log(productData);
  // // console.log(
  // //   productData.filter((product) => product.submodel1_slug === submodelParam)
  // // );
  // // console.log(submodelParam);
  // // console.log(deslugify(submodelParam));

  // const filteredModelData = productData.filter(
  //   (product) =>
  //     jsonForData.generation_default ==
  //     modelJson.find((row) => String(row.fk) == product.sku.slice(-6))
  //       ?.generation_default
  // );
  // console.log(filteredModelData);

  // let submodels: string[] = [];

  // const modelData =
  //   (() => {
  //     if (!submodelParam) {
  //       console.log('running with no submodel');
  //       return productData
  //         ?.filter((item) => item.msrp && item.year_generation === year)
  //         .sort((a, b) => {
  //           let colorIndexA = colorOrder.indexOf(a?.display_color as string);
  //           let colorIndexB = colorOrder.indexOf(b?.display_color as string);

  //           if (colorIndexA === -1) colorIndexA = Infinity;
  //           if (colorIndexB === -1) colorIndexB = Infinity;

  //           return colorIndexA - colorIndexB;
  //         });
  //     }
  //     if (submodelParam) {
  //       console.log('running with a submodel', submodelParam);
  //       // console.log(initModelData);

  //       return filteredModelData.sort((a, b) => {
  //         let colorIndexA = colorOrder.indexOf(a?.display_color as string);
  //         let colorIndexB = colorOrder.indexOf(b?.display_color as string);

  //         if (colorIndexA === -1) colorIndexA = Infinity;
  //         if (colorIndexB === -1) colorIndexB = Infinity;

  //         return colorIndexA - colorIndexB;
  //       });
  //     }
  //   })()?.filter((model) => model.msrp && model.price) ?? [];

  // // console.log(modelData);

  if (modelData?.length === 0) {
    redirect('/');
  }

  // if (!submodelParam && jsonForData) {
  //   const submodelsOfGeneration = modelJson
  //     .filter((model) => model.generation_default === yearFk)
  //     .map((model) => model.submodel1);
  //   submodels = Array.from(
  //     new Set(
  //       submodelsOfGeneration.filter((row): row is string => Boolean(row))
  //     )
  //   );
  // }

  // submodels = Array.from(
  //   new Set(
  //     modelData
  //       ?.map((row) => row.submodel1)
  //       .filter((row): row is string => Boolean(row))
  //   )
  // );

  // console.log(submodels);
  // console.log(modelData.map((row) => row.submodel1));

  // const secondSubmodels = Array.from(
  //   new Set(
  //     productData
  //       ?.map((row) => row.submodel2)
  //       .filter((row): row is string => Boolean(row))
  //   )
  // );

  // // if (submodels?.length === 1) {
  // //   const query = new URLSearchParams(window.location.search);
  // //   query.set('submodel', submodels[0]);
  // //   const newUrl = `${window.location.pathname}?${query.toString()}`;
  // //   redirect(newUrl);
  // // }

  // console.log(secondSubmodels, submodels);
  // console.log(modelData);

  return (
    <>
      <CarSelector
        modelData={modelData as TProductData[]}
        pathParams={pathParams}
        searchParams={searchParams}
        submodels={submodels}
        secondSubmodels={secondSubmodels}
        reviewData={reviewData}
        parentGeneration={parentGeneration}
        key={submodelParam ?? ''}
      />
      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
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
