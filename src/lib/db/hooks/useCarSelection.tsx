'use client';

import { useState, useEffect } from 'react';
import carData from '@/data/transformed_car_data.json';
import { TInitialProductDataDB } from '..';

export type TCarData = {
  make: string;
  model: string;
  years: string[];
  skus: string[];
};

const useCarSelector = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [subModelOptions, setSubModelOptions] = useState<
    TInitialProductDataDB[]
  >([]);
  const [secondSubmodelOptions, setSecondSubmodelOptions] = useState<
    string | null
  >(null);
  const [filteredMakes, setFilteredMakes] = useState<string[]>([]);
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [selectedSubmodel, setSelectedSubmodel] = useState<string | null>(null);
  const [selectedSecondSubmodel, setSelectedSecondSubmodel] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedMake(null);
    setSelectedModel(null);

    if (selectedYear) {
      const makes = new Set<string>();
      carData.forEach((car) => {
        if (car.years.includes(selectedYear)) {
          makes.add(car.make);
        }
      });
      setFilteredMakes(Array.from(makes));
    } else {
      setFilteredMakes([]);
    }
  }, [selectedYear, setFilteredMakes]);

  useEffect(() => {
    setSelectedModel(null);

    if (selectedMake && selectedYear) {
      const models = carData
        .filter(
          (car) => car.make === selectedMake && car.years.includes(selectedYear)
        )
        .map((car) => car.model);
      setFilteredModels(models);
    } else {
      setFilteredModels([]);
    }
  }, [selectedMake, selectedYear]);

  return {
    selectedYear,
    setSelectedYear,
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    filteredMakes,
    filteredModels,
    subModelOptions,
    setSubModelOptions,
    secondSubmodelOptions,
    setSecondSubmodelOptions,
    selectedSubmodel,
    setSelectedSubmodel,
    selectedSecondSubmodel,
    setSelectedSecondSubmodel,
  };
};

export default useCarSelector;
