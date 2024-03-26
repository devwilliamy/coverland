'use client';
import { TReviewData } from '@/lib/db';
// import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataTransformer,
} from '../app/(main)/utils';
import { TProductReviewSummary } from '@/lib/db/review';

type CarSelectionStore = ReturnType<typeof createCarSelectionStore>;

export type TQuery = {
  type: string;
  coverType: string;
  year: string;
  make: string;
  model: string;
  submodel: string;
  secondSubmodel: string;
  submodel1: string;
  submodel2: string;
  parent_generation: string;
};

interface ICarCoverProps {
  modelData: IProductData[];
  initialModelData: IProductData[];
  selectedProduct: IProductData;
  reviewData: TReviewData[];
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
}

interface ICarCoverSelectionState extends ICarCoverProps {
  setQuery: (newQuery: Partial<TQuery>) => void;
  setModelData: () => void;
  hasSubmodels: () => boolean;
  setSelectedProduct: (newProduct: IProductData) => void;
  setFeaturedImage: (newImage: string) => void;
  setSelectedColor: (color: string) => void;
  featuredImage: string;
  selectedColor: string;
  query: TQuery;
  setReviewData: (newReviewData: TReviewData[]) => void;
  setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => void;
  paramsYear: string;
  reviewImageTracker: Record<string, boolean>;
  setReviewImageTracker: (newImageTracker: Record<string, boolean>) => void;
  customerSelectedYear: string;
  setCustomerSelectedYear: (year: string) => void;
}

const createCarSelectionStore = ({
  initialModelData,
  params,
  queryParams,
  initialReviewData,
  initialReviewDataSummary,
  initialReviewImages,
}: {
  initialModelData: IProductData[];
  params: TPathParams;
  queryParams: TQueryParams;
  initialReviewData: TReviewData[];
  initialReviewDataSummary: TProductReviewSummary;
  initialReviewImages: TReviewData[];
}) => {
  // const hasNoSubmodels = initialModelData.every(
  //   (model) => !model.submodel1 && !model.submodel2
  // );

  // const initialDataWithSubmodels = queryParams?.submodel
  //   ? initialModelData.filter((model) =>
  //       compareRawStrings(model.submodel1, queryParams.submodel as string)
  //     )
  //   : initialModelData;

  // const initialDataWithSecondSubmodels = queryParams?.submodel2
  //   ? initialDataWithSubmodels.filter((model) =>
  //       compareRawStrings(model.submodel2, queryParams.submodel2 as string)
  //     )
  //   : initialDataWithSubmodels;

  const initialDataWithSecondSubmodels = [
    {
      sku: 'CL-CC-CN-07-F-GR-1TO-PS-102180',
      product_type: 'GR-1TO-PS',
      product_name: 'Yaris',
      type: 'Car Covers',
      make: 'Toyota',
      model: 'Yaris',
      year_generation: '2012-2020',
      parent_generation: '2012-2020',
      submodel1: 'Sedan',
      submodel2: null,
      submodel3: null,
      sku_suffix: '1TO-PS-102180',
      base_sku: 'CL-CC-CN-07-F-GR',
      feature:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      product:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp,http://www.coverland.com/pms/02-gr-1to-nm.webp,http://www.coverland.com/pms/03-gr-1to-nm.webp,http://www.coverland.com/pms/04-ps-gr-1to-nm.webp,http://www.coverland.com/pms/05-gr-1to-nm.webp,http://www.coverland.com/pms/06-warranty-5.webp,http://www.coverland.com/pms/07-gr-1to-nm.webp,http://www.coverland.com/pms/08-gr-1to-nm.webp,http://www.coverland.com/pms/09-gr-1to-nm.webp,http://www.coverland.com/pms/10-gr-1to.webp,http://www.coverland.com/pms/11-ww.webp,http://www.coverland.com/pms/12-gr-1to-nm.webp',
      display_color: 'Solid Gray',
      msrp: '119.95',
      price: '240',
      display_id: 'Premium',
      make_slug: 'toyota',
      model_slug: 'yaris',
      year_options: '2012,2013,2014,2015,2016,2017,2018,2019,2020',
      fullProductName: 'Car Covers',
      mainImage:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      productImages: [
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/02-gr-1to-nm.webp',
        'http://www.coverland.com/pms/03-gr-1to-nm.webp',
        'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/05-gr-1to-nm.webp',
        'http://www.coverland.com/pms/06-warranty-5.webp',
        'http://www.coverland.com/pms/07-gr-1to-nm.webp',
        'http://www.coverland.com/pms/08-gr-1to-nm.webp',
        'http://www.coverland.com/pms/09-gr-1to-nm.webp',
        'http://www.coverland.com/pms/10-gr-1to.webp',
        'http://www.coverland.com/pms/11-ww.webp',
        'http://www.coverland.com/pms/12-gr-1to-nm.webp',
      ],
    },
    {
      sku: 'CL-CC-CN-03-X-GR-1TO-SS-100528',
      product_type: 'GR-1TO-SS',
      product_name: 'El Camino',
      type: 'Car Covers',
      make: 'Chevrolet',
      model: 'El Camino',
      year_generation: '1964-1967',
      parent_generation: '1964-1967',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: '1TO-SS-100528',
      base_sku: 'CL-CC-CN-03-X-GR',
      feature: 'http://www.coverland.com/pms/01-s-car-nmr.webp',
      product:
        'http://www.coverland.com/category-images-new/standard-pro-gr-1to-nmr.webp,http://www.coverland.com/pms/01-s-car-nmr.webp,http://www.coverland.com/pms/02-s-car-nmr.webp,http://www.coverland.com/pms/03-s-car-nmr.webp,http://www.coverland.com/pms/04-s-car-nmr.webp,http://www.coverland.com/pms/05-s-car-nmr.webp,http://www.coverland.com/pms/06-s-car-nmr.webp,http://www.coverland.com/pms/07-s-car-nmr.webp,http://www.coverland.com/pms/08-s-car.webp,http://www.coverland.com/pms/09-s-car.webp,http://www.coverland.com/pms/10-s-car.webp,http://www.coverland.com/pms/11-s-car.webp',
      display_color: 'Solid Gray',
      msrp: '80',
      price: null,
      display_id: 'Standard',
      make_slug: 'chevrolet',
      model_slug: 'el-camino',
      year_options: '1964,1965,1966,1967',
      fullProductName: 'Car Covers',
      mainImage:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      productImages: [
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/02-gr-1to-nm.webp',
        'http://www.coverland.com/pms/03-gr-1to-nm.webp',
        'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/05-gr-1to-nm.webp',
        'http://www.coverland.com/pms/06-warranty-5.webp',
        'http://www.coverland.com/pms/07-gr-1to-nm.webp',
        'http://www.coverland.com/pms/08-gr-1to-nm.webp',
        'http://www.coverland.com/pms/09-gr-1to-nm.webp',
        'http://www.coverland.com/pms/10-gr-1to.webp',
        'http://www.coverland.com/pms/11-ww.webp',
        'http://www.coverland.com/pms/12-gr-1to-nm.webp',
      ],
    },
    {
      sku: 'CL-CC-CP-07-I-GR-1TO-SP-100977',
      product_type: 'GR-1TO-SP',
      product_name: 'Mustang',
      type: 'Car Covers',
      make: 'Ford',
      model: 'Mustang',
      year_generation: '1979-2004',
      parent_generation: '1979-2004',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: '1TO-SP-100977',
      base_sku: 'CL-CC-CP-07-I-GR',
      feature: 'http://www.coverland.com/pms/01-s-car-nmr.webp',
      product:
        'http://www.coverland.com/category-images-new/standard-pro-gr-1to-nmr.webp,http://www.coverland.com/pms/01-s-car-nmr.webp,http://www.coverland.com/pms/02-s-car-nmr.webp,http://www.coverland.com/pms/03-s-car-nmr.webp,http://www.coverland.com/pms/04-s-car-nmr.webp,http://www.coverland.com/pms/05-s-car-nmr.webp,http://www.coverland.com/pms/06-s-car-nmr.webp,http://www.coverland.com/pms/07-s-car-nmr.webp,http://www.coverland.com/pms/08-s-car.webp,http://www.coverland.com/pms/09-s-car.webp,http://www.coverland.com/pms/10-s-car.webp,http://www.coverland.com/pms/11-s-car.webp',
      display_color: 'Solid Gray',
      msrp: '100',
      price: null,
      display_id: 'Standard Pro',
      make_slug: 'ford',
      model_slug: 'mustang',
      year_options:
        '1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004',
      fullProductName: 'Car Covers',
      mainImage:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      productImages: [
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/02-gr-1to-nm.webp',
        'http://www.coverland.com/pms/03-gr-1to-nm.webp',
        'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/05-gr-1to-nm.webp',
        'http://www.coverland.com/pms/06-warranty-5.webp',
        'http://www.coverland.com/pms/07-gr-1to-nm.webp',
        'http://www.coverland.com/pms/08-gr-1to-nm.webp',
        'http://www.coverland.com/pms/09-gr-1to-nm.webp',
        'http://www.coverland.com/pms/10-gr-1to.webp',
        'http://www.coverland.com/pms/11-ww.webp',
        'http://www.coverland.com/pms/12-gr-1to-nm.webp',
      ],
    },
    {
      sku: 'CL-CC-CN-15-X-GRBK-TRI-PP-100530',
      product_type: 'GRBK-TRI-PP',
      product_name: 'El Camino',
      type: 'Car Covers',
      make: 'Chevrolet',
      model: 'El Camino',
      year_generation: '1978-1987',
      parent_generation: '1978-1987',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: 'TRI-PP-100530',
      base_sku: 'CL-CC-CN-15-X-GRBK',
      feature:
        'http://www.coverland.com/category-images-new/chevy-el-camino-1978-grbk-tri.webp',
      product:
        'http://www.coverland.com/category-images-new/chevy-el-camino-1978-grbk-tri.webp,http://www.coverland.com/pms/01-grbk-tri-nm.webp,http://www.coverland.com/pms/02-grbk-tri-nm.webp,http://www.coverland.com/pms/03-grbk-tri-nm.webp,http://www.coverland.com/pms/04-grbk-tri-nm.webp,http://www.coverland.com/pms/05-grbk-tri-nm.webp,http://www.coverland.com/pms/06-warranty-10.webp,http://www.coverland.com/pms/07-grbk-tri-nm.webp,http://www.coverland.com/pms/08-bb.webp,http://www.coverland.com/pms/09-grbk-tri-nm.webp,http://www.coverland.com/pms/10-grbk-tri-nm.webp,',
      display_color: 'Gray Black Tribe',
      msrp: '179.95',
      price: '360',
      display_id: 'Premium Plus',
      make_slug: 'chevrolet',
      model_slug: 'el-camino',
      year_options: '1978,1979,1980,1981,1982,1983,1984,1985,1986,1987',
      fullProductName: 'Car Covers',
      mainImage: 'http://www.coverland.com/pms/01-tri-grbk.webp',
      productImages: [
        'http://www.coverland.com/pms/01-tri-grbk.webp',
        'http://www.coverland.com/pms/02-grbk-tri-mr.webp',
        'http://www.coverland.com/pms/03-tri-grbk.webp',
        'http://www.coverland.com/pms/04-oxford-outer-black.webp',
        'http://www.coverland.com/pms/05-oxford-inner.webp',
        'http://www.coverland.com/pms/06-grbk-tri.webp',
        'http://www.coverland.com/pms/07-uv-protection.webp',
        'http://www.coverland.com/pms/08-simulation.webp',
        'http://www.coverland.com/pms/09-value.webp',
        'http://www.coverland.com/pms/10-tri-grbk.webp',
        'https://www.coverland.com/images/default-product-images/15.jpg',
      ],
    },
    {
      sku: 'CL-CC-CN-15-X-BKRD-2TO-PP-100528',
      product_type: 'BKRD-2TO-PP',
      product_name: 'El Camino',
      type: 'Car Covers',
      make: 'Chevrolet',
      model: 'El Camino',
      year_generation: '1964-1967',
      parent_generation: '1964-1967',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: '2TO-PP-100528',
      base_sku: 'CL-CC-CN-15-X-BKRD',
      feature:
        'http://www.coverland.com/category-images-new/chevy-el-camino-1968-bkrd-2to.webp',
      product:
        'http://www.coverland.com/category-images-new/chevy-el-camino-1968-bkrd-2to.webp,http://www.coverland.com/pms/01-bkrd-2to-nm.webp,http://www.coverland.com/pms/02-bkrd-2to-nm.webp,http://www.coverland.com/pms/03-bkrd-2to-nm.webp,http://www.coverland.com/pms/04-bkrd-2to-nm.webp,http://www.coverland.com/pms/05-bkrd-2to-nm.webp,http://www.coverland.com/pms/06-warranty-10.webp,http://www.coverland.com/pms/07-bkrd-2to-nm.webp,http://www.coverland.com/pms/08-bb.webp,http://www.coverland.com/pms/09-bkrd-2to-nm.webp,http://www.coverland.com/pms/10-bkrd-2to-nm.webp,http://www.coverland.com/pms/11-bkrd.webp',
      display_color: 'Black Red 2-Tone',
      msrp: '179.95',
      price: '360',
      display_id: 'Premium Plus',
      make_slug: 'chevrolet',
      model_slug: 'el-camino',
      year_options: '1964,1965,1966,1967',
      fullProductName: 'Car Covers',
      mainImage: 'http://www.coverland.com/pms/01-2to-bkrd.webp',
      productImages: [
        'http://www.coverland.com/pms/01-2to-bkrd.webp',
        'http://www.coverland.com/pms/02-bkrd-2to-mr.webp',
        'http://www.coverland.com/pms/03-2to-bkrd.webp',
        'http://www.coverland.com/pms/04-oxford-outer-black.webp',
        'http://www.coverland.com/pms/05-oxford-inner.webp',
        'http://www.coverland.com/pms/06-bkrd-2to.webp',
        'http://www.coverland.com/pms/07-uv-protection.webp',
        'http://www.coverland.com/pms/08-simulation.webp',
        'http://www.coverland.com/pms/09-value.webp',
        'http://www.coverland.com/pms/10-2to-bkrd.webp',
        'https://www.coverland.com/images/default-product-images/15.jpg',
      ],
    },
    {
      sku: 'CL-CC-CN-07-F-GR-1TO-PS-100476',
      product_type: 'GR-1TO-PS',
      product_name: 'Corvette',
      type: 'Car Covers',
      make: 'Chevrolet',
      model: 'Corvette',
      year_generation: '1953-1957',
      parent_generation: '1953-1957',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: '1TO-PS-100476',
      base_sku: 'CL-CC-CN-07-F-GR',
      feature:
        'http://www.coverland.com/category-images-new/chevy-corvette-c1-1953-gr-1to.webp',
      product:
        'http://www.coverland.com/category-images-new/chevy-corvette-c1-1953-gr-1to.webp,http://www.coverland.com/pms/01-main-ps-gr-1to-nm.webp,http://www.coverland.com/pms/02-gr-1to-nm.webp,http://www.coverland.com/pms/03-gr-1to-nm.webp,http://www.coverland.com/pms/04-ps-gr-1to-nm.webp,http://www.coverland.com/pms/05-gr-1to-nm.webp,http://www.coverland.com/pms/06-warranty-5.webp,http://www.coverland.com/pms/07-gr-1to-nm.webp,http://www.coverland.com/pms/08-gr-1to-nm.webp,http://www.coverland.com/pms/09-gr-1to-nm.webp,http://www.coverland.com/pms/10-gr-1to.webp,http://www.coverland.com/pms/11-ww.webp,http://www.coverland.com/pms/12-gr-1to-nm.webp',
      display_color: 'Solid Gray',
      msrp: '119.95',
      price: '240',
      display_id: 'Premium',
      make_slug: 'chevrolet',
      model_slug: 'corvette',
      year_options: '1953,1954,1955,1956,1957',
      fullProductName: 'Car Covers',
      mainImage:
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      productImages: [
        'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/02-gr-1to-nm.webp',
        'http://www.coverland.com/pms/03-gr-1to-nm.webp',
        'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
        'http://www.coverland.com/pms/05-gr-1to-nm.webp',
        'http://www.coverland.com/pms/06-warranty-5.webp',
        'http://www.coverland.com/pms/07-gr-1to-nm.webp',
        'http://www.coverland.com/pms/08-gr-1to-nm.webp',
        'http://www.coverland.com/pms/09-gr-1to-nm.webp',
        'http://www.coverland.com/pms/10-gr-1to.webp',
        'http://www.coverland.com/pms/11-ww.webp',
        'http://www.coverland.com/pms/12-gr-1to-nm.webp',
      ],
    },
    {
      sku: 'CL-CC-CP-15-L-BKGR-STR-PP-100245',
      product_type: 'BKGR-STR-PP',
      product_name: '5-Series',
      type: 'Car Covers',
      make: 'BMW',
      model: '5-Series',
      year_generation: '2010-2018',
      parent_generation: '2004-2017',
      submodel1: 'GT',
      submodel2: null,
      submodel3: null,
      sku_suffix: 'STR-PP-100245',
      base_sku: 'CL-CC-CP-15-L-BKGR',
      feature:
        'http://www.coverland.com/category-images-new/bmw-5-series-2011-bkgr-str.webp',
      product:
        'http://www.coverland.com/category-images-new/bmw-5-series-2011-bkgr-str.webp,http://www.coverland.com/pms/01-bkgr-str-m.webp,http://www.coverland.com/pms/02-bkgr-str-m.webp,http://www.coverland.com/pms/03-bkgr-str-m.webp,http://www.coverland.com/pms/04-bkgr-str-m.webp,http://www.coverland.com/pms/05-bkgr-str-m.webp,http://www.coverland.com/pms/06-bkgr-str-m.webp,http://www.coverland.com/pms/07-bkgr-str-m.webp,http://www.coverland.com/pms/08-bkgr-str-m.webp,http://www.coverland.com/pms/09-bkgr-str-m.webp,http://www.coverland.com/pms/10-bkgr-str-m.webp,http://www.coverland.com/pms/11-bkgr-str-m.webp,http://www.coverland.com/pms/12-bkgr-str-m.webp,http://www.coverland.com/pms/13-bkgr-str-m.webp,http://www.coverland.com/pms/14-bkgr-str-m.webp,http://www.coverland.com/pms/15.webp',
      display_color: 'Black Gray Stripe',
      msrp: '164.95',
      price: '330',
      display_id: 'Premium Plus',
      make_slug: 'bmw',
      model_slug: '5-series',
      year_options: '2010,2011,2012,2013,2014,2015,2016,2017,2018',
      fullProductName: 'Car Covers',
      mainImage:
        'https://www.coverland.com/images/default-product-images/01-bkgr-str-m.jpg',
      productImages: [
        'https://www.coverland.com/images/default-product-images/01-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/02-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/03-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/04-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/05-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/06-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/07-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/08-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/09-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/10-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/11-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/12-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/13-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/14-bkgr-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/15.jpg',
      ],
    },
  ];

  const reviewImageTracker: Record<string, boolean> = {};

  initialReviewData.forEach((reviewData) => {
    !!reviewData.review_image &&
      reviewData.review_image.split(',').map((imageUrl) => {
        if (!reviewImageTracker[imageUrl]) {
          reviewImageTracker[imageUrl] = true;
        }
      });
  });

  const customerSelectedYear =
    typeof window !== 'undefined'
      ? localStorage?.getItem('heroDropdownYear')
      : '';

  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: initialDataWithSecondSubmodels,
    initialModelData: initialDataWithSecondSubmodels,
    query: {
      year: (params?.year && customerSelectedYear) || '',
      type: params?.productType ?? '',
      coverType: params?.coverType ?? 'premium-plus',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: queryParams?.submodel ?? '',
      secondSubmodel: queryParams?.submodel2 ?? '',
      submodel1: queryParams?.submodel ?? '',
      submodel2: queryParams?.submodel2 ?? '',
      parent_generation:
        (params?.year && hasNoSubmodels) || queryParams?.submodel
          ? (params?.year as string)
          : '',
    },
    selectedProduct: initialDataWithSecondSubmodels[0],
    featuredImage: initialDataWithSecondSubmodels[0]?.mainImage,
    selectedColor: initialDataWithSecondSubmodels[0]?.display_color ?? '',
    reviewImages: initialReviewImages,
    reviewImageTracker,
    setReviewImageTracker: (newImageTracker: Record<string, boolean>) => {
      set(() => ({
        reviewImageTracker: newImageTracker,
      }));
    },
    setSelectedProduct: (newProduct: IProductData) => {
      set(() => ({
        selectedProduct: newProduct,
        featuredImage: newProduct.product?.split(',')[0] ?? '',
      }));
    },
    setSelectedColor: (newColor: string) =>
      set(() => ({ selectedColor: newColor })),
    setFeaturedImage: (newImage: string) =>
      set(() => ({ featuredImage: newImage })),
    hasSubmodels: () => {
      const { modelData } = get();
      return modelData.some((model) => !!model.submodel1 || !!model.submodel2);
    },
    setQuery: (newQuery: Partial<TQuery>) => {
      set((state) => ({
        ...state,
        query: {
          ...state.query,
          ...newQuery,
        },
      }));

      const { setModelData } = get();
      setModelData();
      const newModelData = get().modelData;
      if (newModelData.length > 0 && Object.values(newQuery).some((v) => !!v)) {
        set({
          selectedProduct: newModelData[0],
        });
      }
    },
    setModelData: () => {
      const { initialModelData, query: newQuery } = get();
      let filteredData = initialModelData;
      if (newQuery.type) {
        filteredData = filteredData.filter((sku) => {
          return compareRawStrings(sku.type, newQuery.type);
        });
      }
      if (newQuery.make) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.make, newQuery.make as string)
        );
      }
      if (newQuery.model) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.model, newQuery.model as string)
        );
      }
      if (newQuery.year) {
        filteredData = filteredData.filter((sku) =>
          sku.year_options?.includes(newQuery.year as string)
        );
      }
      if (newQuery.submodel) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel1, newQuery.submodel as string)
        );
      }
      if (newQuery.secondSubmodel) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel2, newQuery.secondSubmodel as string)
        );
      }
      set({ modelData: filteredData });
    },
    reviewData: initialReviewData,
    setReviewData: (newReviewData: TReviewData[]) => {
      set(() => ({ reviewData: newReviewData }));
    },
    reviewDataSummary: initialReviewDataSummary,
    setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => {
      set(() => ({ reviewDataSummary: newReviewDataSummary }));
    },
    setReviewsWithImages: (newReviewImages: TReviewData[]) => {
      set(() => ({ reviewImages: newReviewImages }));
    },
    paramsYear: params.year || '',
    customerSelectedYear: customerSelectedYear || '',
    setCustomerSelectedYear: (year: string) => {
      localStorage.setItem('heroDropdownYear', year);
      set(() => ({ customerSelectedYear: year }));
    },
  }));
};

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

const testModelData = [
  {
    sku: 'CL-CC-CN-07-F-GR-1TO-PS-102180',
    product_type: 'GR-1TO-PS',
    product_name: 'Yaris',
    type: 'Car Covers',
    make: 'Toyota',
    model: 'Yaris',
    year_generation: '2012-2020',
    parent_generation: '2012-2020',
    submodel1: 'Sedan',
    submodel2: null,
    submodel3: null,
    sku_suffix: '1TO-PS-102180',
    base_sku: 'CL-CC-CN-07-F-GR',
    feature:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
    product:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp,http://www.coverland.com/pms/02-gr-1to-nm.webp,http://www.coverland.com/pms/03-gr-1to-nm.webp,http://www.coverland.com/pms/04-ps-gr-1to-nm.webp,http://www.coverland.com/pms/05-gr-1to-nm.webp,http://www.coverland.com/pms/06-warranty-5.webp,http://www.coverland.com/pms/07-gr-1to-nm.webp,http://www.coverland.com/pms/08-gr-1to-nm.webp,http://www.coverland.com/pms/09-gr-1to-nm.webp,http://www.coverland.com/pms/10-gr-1to.webp,http://www.coverland.com/pms/11-ww.webp,http://www.coverland.com/pms/12-gr-1to-nm.webp',
    display_color: 'Solid Gray',
    msrp: '119.95',
    price: '240',
    display_id: 'Premium',
    make_slug: 'toyota',
    model_slug: 'yaris',
    year_options: '2012,2013,2014,2015,2016,2017,2018,2019,2020',
    fullProductName: 'Car Covers',
    mainImage:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
    productImages: [
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/02-gr-1to-nm.webp',
      'http://www.coverland.com/pms/03-gr-1to-nm.webp',
      'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/05-gr-1to-nm.webp',
      'http://www.coverland.com/pms/06-warranty-5.webp',
      'http://www.coverland.com/pms/07-gr-1to-nm.webp',
      'http://www.coverland.com/pms/08-gr-1to-nm.webp',
      'http://www.coverland.com/pms/09-gr-1to-nm.webp',
      'http://www.coverland.com/pms/10-gr-1to.webp',
      'http://www.coverland.com/pms/11-ww.webp',
      'http://www.coverland.com/pms/12-gr-1to-nm.webp',
    ],
  },
  {
    sku: 'CL-CC-CN-03-X-GR-1TO-SS-100528',
    product_type: 'GR-1TO-SS',
    product_name: 'El Camino',
    type: 'Car Covers',
    make: 'Chevrolet',
    model: 'El Camino',
    year_generation: '1964-1967',
    parent_generation: '1964-1967',
    submodel1: null,
    submodel2: null,
    submodel3: null,
    sku_suffix: '1TO-SS-100528',
    base_sku: 'CL-CC-CN-03-X-GR',
    feature: 'http://www.coverland.com/pms/01-s-car-nmr.webp',
    product:
      'http://www.coverland.com/category-images-new/standard-pro-gr-1to-nmr.webp,http://www.coverland.com/pms/01-s-car-nmr.webp,http://www.coverland.com/pms/02-s-car-nmr.webp,http://www.coverland.com/pms/03-s-car-nmr.webp,http://www.coverland.com/pms/04-s-car-nmr.webp,http://www.coverland.com/pms/05-s-car-nmr.webp,http://www.coverland.com/pms/06-s-car-nmr.webp,http://www.coverland.com/pms/07-s-car-nmr.webp,http://www.coverland.com/pms/08-s-car.webp,http://www.coverland.com/pms/09-s-car.webp,http://www.coverland.com/pms/10-s-car.webp,http://www.coverland.com/pms/11-s-car.webp',
    display_color: 'Solid Gray',
    msrp: '80',
    price: null,
    display_id: 'Standard',
    make_slug: 'chevrolet',
    model_slug: 'el-camino',
    year_options: '1964,1965,1966,1967',
    fullProductName: 'Car Covers',
    mainImage:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
    productImages: [
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/02-gr-1to-nm.webp',
      'http://www.coverland.com/pms/03-gr-1to-nm.webp',
      'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/05-gr-1to-nm.webp',
      'http://www.coverland.com/pms/06-warranty-5.webp',
      'http://www.coverland.com/pms/07-gr-1to-nm.webp',
      'http://www.coverland.com/pms/08-gr-1to-nm.webp',
      'http://www.coverland.com/pms/09-gr-1to-nm.webp',
      'http://www.coverland.com/pms/10-gr-1to.webp',
      'http://www.coverland.com/pms/11-ww.webp',
      'http://www.coverland.com/pms/12-gr-1to-nm.webp',
    ],
  },
  {
    sku: 'CL-CC-CP-07-I-GR-1TO-SP-100977',
    product_type: 'GR-1TO-SP',
    product_name: 'Mustang',
    type: 'Car Covers',
    make: 'Ford',
    model: 'Mustang',
    year_generation: '1979-2004',
    parent_generation: '1979-2004',
    submodel1: null,
    submodel2: null,
    submodel3: null,
    sku_suffix: '1TO-SP-100977',
    base_sku: 'CL-CC-CP-07-I-GR',
    feature: 'http://www.coverland.com/pms/01-s-car-nmr.webp',
    product:
      'http://www.coverland.com/category-images-new/standard-pro-gr-1to-nmr.webp,http://www.coverland.com/pms/01-s-car-nmr.webp,http://www.coverland.com/pms/02-s-car-nmr.webp,http://www.coverland.com/pms/03-s-car-nmr.webp,http://www.coverland.com/pms/04-s-car-nmr.webp,http://www.coverland.com/pms/05-s-car-nmr.webp,http://www.coverland.com/pms/06-s-car-nmr.webp,http://www.coverland.com/pms/07-s-car-nmr.webp,http://www.coverland.com/pms/08-s-car.webp,http://www.coverland.com/pms/09-s-car.webp,http://www.coverland.com/pms/10-s-car.webp,http://www.coverland.com/pms/11-s-car.webp',
    display_color: 'Solid Gray',
    msrp: '100',
    price: null,
    display_id: 'Standard Pro',
    make_slug: 'ford',
    model_slug: 'mustang',
    year_options:
      '1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004',
    fullProductName: 'Car Covers',
    mainImage:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
    productImages: [
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/02-gr-1to-nm.webp',
      'http://www.coverland.com/pms/03-gr-1to-nm.webp',
      'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/05-gr-1to-nm.webp',
      'http://www.coverland.com/pms/06-warranty-5.webp',
      'http://www.coverland.com/pms/07-gr-1to-nm.webp',
      'http://www.coverland.com/pms/08-gr-1to-nm.webp',
      'http://www.coverland.com/pms/09-gr-1to-nm.webp',
      'http://www.coverland.com/pms/10-gr-1to.webp',
      'http://www.coverland.com/pms/11-ww.webp',
      'http://www.coverland.com/pms/12-gr-1to-nm.webp',
    ],
  },
  {
    sku: 'CL-CC-CN-15-X-GRBK-TRI-PP-100530',
    product_type: 'GRBK-TRI-PP',
    product_name: 'El Camino',
    type: 'Car Covers',
    make: 'Chevrolet',
    model: 'El Camino',
    year_generation: '1978-1987',
    parent_generation: '1978-1987',
    submodel1: null,
    submodel2: null,
    submodel3: null,
    sku_suffix: 'TRI-PP-100530',
    base_sku: 'CL-CC-CN-15-X-GRBK',
    feature:
      'http://www.coverland.com/category-images-new/chevy-el-camino-1978-grbk-tri.webp',
    product:
      'http://www.coverland.com/category-images-new/chevy-el-camino-1978-grbk-tri.webp,http://www.coverland.com/pms/01-grbk-tri-nm.webp,http://www.coverland.com/pms/02-grbk-tri-nm.webp,http://www.coverland.com/pms/03-grbk-tri-nm.webp,http://www.coverland.com/pms/04-grbk-tri-nm.webp,http://www.coverland.com/pms/05-grbk-tri-nm.webp,http://www.coverland.com/pms/06-warranty-10.webp,http://www.coverland.com/pms/07-grbk-tri-nm.webp,http://www.coverland.com/pms/08-bb.webp,http://www.coverland.com/pms/09-grbk-tri-nm.webp,http://www.coverland.com/pms/10-grbk-tri-nm.webp,',
    display_color: 'Gray Black Tribe',
    msrp: '179.95',
    price: '360',
    display_id: 'Premium Plus',
    make_slug: 'chevrolet',
    model_slug: 'el-camino',
    year_options: '1978,1979,1980,1981,1982,1983,1984,1985,1986,1987',
    fullProductName: 'Car Covers',
    mainImage: 'http://www.coverland.com/pms/01-tri-grbk.webp',
    productImages: [
      'http://www.coverland.com/pms/01-tri-grbk.webp',
      'http://www.coverland.com/pms/02-grbk-tri-mr.webp',
      'http://www.coverland.com/pms/03-tri-grbk.webp',
      'http://www.coverland.com/pms/04-oxford-outer-black.webp',
      'http://www.coverland.com/pms/05-oxford-inner.webp',
      'http://www.coverland.com/pms/06-grbk-tri.webp',
      'http://www.coverland.com/pms/07-uv-protection.webp',
      'http://www.coverland.com/pms/08-simulation.webp',
      'http://www.coverland.com/pms/09-value.webp',
      'http://www.coverland.com/pms/10-tri-grbk.webp',
      'https://www.coverland.com/images/default-product-images/15.jpg',
    ],
  },
  {
    sku: 'CL-CC-CN-15-X-BKRD-2TO-PP-100528',
    product_type: 'BKRD-2TO-PP',
    product_name: 'El Camino',
    type: 'Car Covers',
    make: 'Chevrolet',
    model: 'El Camino',
    year_generation: '1964-1967',
    parent_generation: '1964-1967',
    submodel1: null,
    submodel2: null,
    submodel3: null,
    sku_suffix: '2TO-PP-100528',
    base_sku: 'CL-CC-CN-15-X-BKRD',
    feature:
      'http://www.coverland.com/category-images-new/chevy-el-camino-1968-bkrd-2to.webp',
    product:
      'http://www.coverland.com/category-images-new/chevy-el-camino-1968-bkrd-2to.webp,http://www.coverland.com/pms/01-bkrd-2to-nm.webp,http://www.coverland.com/pms/02-bkrd-2to-nm.webp,http://www.coverland.com/pms/03-bkrd-2to-nm.webp,http://www.coverland.com/pms/04-bkrd-2to-nm.webp,http://www.coverland.com/pms/05-bkrd-2to-nm.webp,http://www.coverland.com/pms/06-warranty-10.webp,http://www.coverland.com/pms/07-bkrd-2to-nm.webp,http://www.coverland.com/pms/08-bb.webp,http://www.coverland.com/pms/09-bkrd-2to-nm.webp,http://www.coverland.com/pms/10-bkrd-2to-nm.webp,http://www.coverland.com/pms/11-bkrd.webp',
    display_color: 'Black Red 2-Tone',
    msrp: '179.95',
    price: '360',
    display_id: 'Premium Plus',
    make_slug: 'chevrolet',
    model_slug: 'el-camino',
    year_options: '1964,1965,1966,1967',
    fullProductName: 'Car Covers',
    mainImage: 'http://www.coverland.com/pms/01-2to-bkrd.webp',
    productImages: [
      'http://www.coverland.com/pms/01-2to-bkrd.webp',
      'http://www.coverland.com/pms/02-bkrd-2to-mr.webp',
      'http://www.coverland.com/pms/03-2to-bkrd.webp',
      'http://www.coverland.com/pms/04-oxford-outer-black.webp',
      'http://www.coverland.com/pms/05-oxford-inner.webp',
      'http://www.coverland.com/pms/06-bkrd-2to.webp',
      'http://www.coverland.com/pms/07-uv-protection.webp',
      'http://www.coverland.com/pms/08-simulation.webp',
      'http://www.coverland.com/pms/09-value.webp',
      'http://www.coverland.com/pms/10-2to-bkrd.webp',
      'https://www.coverland.com/images/default-product-images/15.jpg',
    ],
  },
  {
    sku: 'CL-CC-CN-07-F-GR-1TO-PS-100476',
    product_type: 'GR-1TO-PS',
    product_name: 'Corvette',
    type: 'Car Covers',
    make: 'Chevrolet',
    model: 'Corvette',
    year_generation: '1953-1957',
    parent_generation: '1953-1957',
    submodel1: null,
    submodel2: null,
    submodel3: null,
    sku_suffix: '1TO-PS-100476',
    base_sku: 'CL-CC-CN-07-F-GR',
    feature:
      'http://www.coverland.com/category-images-new/chevy-corvette-c1-1953-gr-1to.webp',
    product:
      'http://www.coverland.com/category-images-new/chevy-corvette-c1-1953-gr-1to.webp,http://www.coverland.com/pms/01-main-ps-gr-1to-nm.webp,http://www.coverland.com/pms/02-gr-1to-nm.webp,http://www.coverland.com/pms/03-gr-1to-nm.webp,http://www.coverland.com/pms/04-ps-gr-1to-nm.webp,http://www.coverland.com/pms/05-gr-1to-nm.webp,http://www.coverland.com/pms/06-warranty-5.webp,http://www.coverland.com/pms/07-gr-1to-nm.webp,http://www.coverland.com/pms/08-gr-1to-nm.webp,http://www.coverland.com/pms/09-gr-1to-nm.webp,http://www.coverland.com/pms/10-gr-1to.webp,http://www.coverland.com/pms/11-ww.webp,http://www.coverland.com/pms/12-gr-1to-nm.webp',
    display_color: 'Solid Gray',
    msrp: '119.95',
    price: '240',
    display_id: 'Premium',
    make_slug: 'chevrolet',
    model_slug: 'corvette',
    year_options: '1953,1954,1955,1956,1957',
    fullProductName: 'Car Covers',
    mainImage:
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
    productImages: [
      'http://www.coverland.com/category-images-new/01-main-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/02-gr-1to-nm.webp',
      'http://www.coverland.com/pms/03-gr-1to-nm.webp',
      'http://www.coverland.com/pms/04-ps-gr-1to-nm.webp',
      'http://www.coverland.com/pms/05-gr-1to-nm.webp',
      'http://www.coverland.com/pms/06-warranty-5.webp',
      'http://www.coverland.com/pms/07-gr-1to-nm.webp',
      'http://www.coverland.com/pms/08-gr-1to-nm.webp',
      'http://www.coverland.com/pms/09-gr-1to-nm.webp',
      'http://www.coverland.com/pms/10-gr-1to.webp',
      'http://www.coverland.com/pms/11-ww.webp',
      'http://www.coverland.com/pms/12-gr-1to-nm.webp',
    ],
  },
  {
    sku: 'CL-CC-CP-15-L-BKGR-STR-PP-100245',
    product_type: 'BKGR-STR-PP',
    product_name: '5-Series',
    type: 'Car Covers',
    make: 'BMW',
    model: '5-Series',
    year_generation: '2010-2018',
    parent_generation: '2004-2017',
    submodel1: 'GT',
    submodel2: null,
    submodel3: null,
    sku_suffix: 'STR-PP-100245',
    base_sku: 'CL-CC-CP-15-L-BKGR',
    feature:
      'http://www.coverland.com/category-images-new/bmw-5-series-2011-bkgr-str.webp',
    product:
      'http://www.coverland.com/category-images-new/bmw-5-series-2011-bkgr-str.webp,http://www.coverland.com/pms/01-bkgr-str-m.webp,http://www.coverland.com/pms/02-bkgr-str-m.webp,http://www.coverland.com/pms/03-bkgr-str-m.webp,http://www.coverland.com/pms/04-bkgr-str-m.webp,http://www.coverland.com/pms/05-bkgr-str-m.webp,http://www.coverland.com/pms/06-bkgr-str-m.webp,http://www.coverland.com/pms/07-bkgr-str-m.webp,http://www.coverland.com/pms/08-bkgr-str-m.webp,http://www.coverland.com/pms/09-bkgr-str-m.webp,http://www.coverland.com/pms/10-bkgr-str-m.webp,http://www.coverland.com/pms/11-bkgr-str-m.webp,http://www.coverland.com/pms/12-bkgr-str-m.webp,http://www.coverland.com/pms/13-bkgr-str-m.webp,http://www.coverland.com/pms/14-bkgr-str-m.webp,http://www.coverland.com/pms/15.webp',
    display_color: 'Black Gray Stripe',
    msrp: '164.95',
    price: '330',
    display_id: 'Premium Plus',
    make_slug: 'bmw',
    model_slug: '5-series',
    year_options: '2010,2011,2012,2013,2014,2015,2016,2017,2018',
    fullProductName: 'Car Covers',
    mainImage:
      'https://www.coverland.com/images/default-product-images/01-bkgr-str-m.jpg',
    productImages: [
      'https://www.coverland.com/images/default-product-images/01-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/02-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/03-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/04-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/05-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/06-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/07-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/08-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/09-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/10-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/11-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/12-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/13-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/14-bkgr-str-m.jpg',
      'https://www.coverland.com/images/default-product-images/15.jpg',
    ],
  },
];
const CarSelectionProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
}) => {
  const {
    modelData: modelDataProps,
    reviewData,
    reviewDataSummary,
    reviewImages,
    searchParams,
  } = initialState;
  const router = useRouter();
  const pathParams = useParams<TPathParams>();
  const submodelParams = searchParams?.submodel ?? '';
  const secondSubmodelParams = searchParams?.submodel2 ?? '';
  if (modelDataProps.length === 0) {
    router.push('/404');
  }

  const queryParams = {
    submodel: submodelParams,
    secondSubmodel: secondSubmodelParams,
    submodel2: secondSubmodelParams,
  };

  // const modelData = modelDataTransformer({
  //   data: modelDataProps,
  //   params: pathParams ?? ({} as TPathParams),
  //   queryParams,
  // });
  const modelData = testModelData;
  // console.log('ModelData:', modelData);

  const store = useRef(
    createCarSelectionStore({
      params: pathParams ?? ({} as TPathParams),
      queryParams,
      initialModelData: modelData,
      initialReviewData: reviewData as TReviewData[],
      initialReviewDataSummary: reviewDataSummary,
      initialReviewImages: reviewImages,
    })
  ).current;
  return (
    <CarSelectionContext.Provider value={store}>
      {children}
    </CarSelectionContext.Provider>
  );
};

export default CarSelectionProvider;
