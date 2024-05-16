'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import {
  editVehicleGetAllModelsByTypeIdMakeID,
  getAllUniqueModelsByYearMake,
  getDistinctModelsByTypeMake,
  getDistinctModelsByTypeMakeSlug,
  // getUniqueModelsByTypeMake,
} from '@/lib/db';
import { SubmodelDropdown } from './SubmodelDropdown';
import MainDropdown from './MainDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import { deslugify, slugify } from '@/lib/utils';

export type ModelDropdown = {
  model: string | null;
  model_slug: string | null;
  parent_generation: string | null;
  submodel1: string | null;
  submodel2: string | null;
  submodel3: string | null;
};
export function ModelSearch({
  queryObj,
  isBreadCrumb = false,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  isBreadCrumb?: boolean;
}) {
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);
  const [modelDataStrings, setModelDataStrings] = useState<string[]>([]);
  const [submodelData, setSubmodelData] = useState<ModelDropdown[]>([]);
  const [submodel2Data, setSubmodel2Data] = useState<ModelDropdown[]>([]);

  const { isMakePage, isModelPage, isYearPage } = useDetermineType();

  const [submodelDataStrings, setSubmodelDataStrings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    query: {
      type,
      year,
      make,
      model,
      modelId,
      makeId,
      yearId,
      typeId,
      submodel1,
      submodel2,
    },
    setQuery,
  } = queryObj;

  useEffect(() => {
    if (model) {
      const parent_generation =
        modelData.find((car) => car.model === model)?.parent_generation || '';
      setQuery((p) => ({
        ...p,
        parent_generation,
      }));
      // fetchData();
    }
  }, [model, modelData, setQuery, modelId]);

  // Get Unique Models By Type / Year / Make
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus'; // TODO: - Extract cover from query obj or something
        const response = await getAllUniqueModelsByYearMake({
          type,
          cover,
          year,
          make,
          makeId,
          yearId,
          typeId,
        });
        const uniqueModel = response.uniqueCars.filter(
          (car, index, self) =>
            index === self.findIndex((t) => t.model_slug === car.model_slug)
        );
        if (!isYearPage) {
          setModelData(response.uniqueCars);
          setModelDataStrings(response.uniqueModels);
        }

        // console.log({ response });
      } catch (error) {
        console.error('[Model Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year && make && typeId && yearId && makeId) {
      fetchData();
    }
  }, [type, year, make, typeId, yearId, makeId]);

  useEffect(() => {
    if (!isBreadCrumb && (isModelPage || isYearPage) && typeId && makeId) {
      const getModels = async () => {
        // console.log({ typeId, makeId });

        const res = await getDistinctModelsByTypeMake(
          Number(typeId),
          Number(makeId)
        );

        const fetchedCars = res.uniqueCars;
        const fetchedModels = res.uniqueModels;

        setModelDataStrings(fetchedModels);
        setModelData(fetchedCars as ModelDropdown[]);
        // console.log({ fetchedCars, fetchedModels });
      };

      getModels();
    }
  }, [typeId, makeId]);

  useEffect(() => {
    // Check for submodel
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === model && vehicle.submodel1
    );

    if (!isYearPage) {
      setSubmodelData(submodel);
    }
  }, [model]);

  useEffect(() => {
    if ((isMakePage || isYearPage) && model && modelData.length > 0) {
      const submodels = modelData
        .filter((product) => {
          const productModel = slugify(String(product.model));

          if (productModel.toLowerCase() === model.toLowerCase()) {
            // console.log({ productModel, model });

            return product;
          }

          return;
        })
        .filter((product, index, self) => {
          return self.indexOf(product) === index;
        })
        .map((product) => {
          if (product.submodel1) {
            return product.submodel1;
          }
        })
        .filter((submodel, index, self) => {
          return self.indexOf(submodel) === index;
        })
        .filter((submodel) => {
          if (submodel !== null && submodel !== undefined) {
            return submodel;
          }
        });

      setSubmodelData(submodels as ModelDropdown[]);
      console.log({ submodels, modelData, queryObj });
    }
  }, [queryObj.query, modelData, model]);

  useEffect(() => {
    if ((isMakePage || isYearPage) && submodel1 && modelData.length > 0) {
      const submodels2 = modelData
        .filter((product) => {
          const productModel = String(product.model);
          const productSubmodel = String(product.submodel1).toLowerCase();
          const lowercaseSubParam = submodel1.toLowerCase();
          // console.log({ productSubmodel, lowercaseSubParam, submodel1 });

          if (
            slugify(productModel).toLowerCase() === model.toLowerCase() &&
            productSubmodel &&
            productSubmodel === lowercaseSubParam
          ) {
            return product;
          }

          return;
        })
        .filter((product, index, self) => {
          return self.indexOf(product) === index;
        })
        .map((product) => {
          return product.submodel2;
        })
        .filter((submodel2, index, self) => {
          return self.indexOf(submodel2) === index;
        });
      console.log({ submodels2, modelData });

      setSubmodel2Data(submodels2 as ModelDropdown[]);
    }
  }, [queryObj.query, modelData]);

  const determineDisabled = () => {
    switch (true) {
      case isMakePage:
        return Boolean(!type || !make || !year);
      case isModelPage:
        return Boolean(!type || !make);
      case isYearPage:
        return Boolean(!type || !make);
      default:
        return Boolean(!type || !year || !make);
    }
  };

  const isDisabled = determineDisabled();

  // const determinePrevSelected = () => {
  //   switch (true) {
  //     case isMakePage:
  //       return !type ?? !make;
  //     case isModelPage:
  //       return !type ?? !make;
  //     default:
  //       return type ?? make ?? year;
  //   }
  // };
  const determinePrevSelected = () => {
    switch (true) {
      case isMakePage:
        return Boolean(type && year && make && !model);
      case isModelPage:
        return Boolean(type && make && !model);
      case isYearPage:
        return Boolean(type && make && !model);
      default:
        return Boolean(type && year && make && !model);
    }
  };

  const prevSelected = determinePrevSelected();

  const showSubmodelDropdown = submodelData.length > 0;
  const showSubmodel2Dropdown = submodel2Data.length > 0;

  const determinePlace = () => {
    switch (true) {
      case isMakePage:
        return 3;
      case isModelPage:
        return 2;
      case isYearPage:
        return 2;
      default:
        return 3;
    }
  };
  const submodelPrevSelected = Boolean(
    type && make && model && year && !submodel1
  );
  const submodel2PrevSelected = Boolean(
    type && make && model && year && submodel1 && !submodel2
  );

  return (
    <>
      <MainDropdown
        place={determinePlace()}
        title={'model'}
        queryObj={queryObj}
        isDisabled={isDisabled}
        value={model}
        prevSelected={prevSelected}
        items={modelDataStrings}
        isLoading={isLoading}
      />

      {!isMakePage && !isModelPage && !isYearPage && showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
      )}

      {isMakePage && model && showSubmodelDropdown && (
        <MainDropdown
          place={4}
          title={'submodel1'}
          displayTitle={'submodel'}
          queryObj={queryObj}
          isDisabled={isDisabled}
          value={submodel1}
          prevSelected={submodelPrevSelected}
          items={submodelData}
          isLoading={isLoading}
        />
      )}

      {isMakePage && submodel1 && showSubmodel2Dropdown && (
        <MainDropdown
          place={5}
          title="submodel2"
          displayTitle="submodel"
          queryObj={queryObj}
          isDisabled={isDisabled}
          value={submodel2}
          prevSelected={submodel2PrevSelected}
          items={submodel2Data}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
