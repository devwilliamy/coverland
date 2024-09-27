import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useDetermineType from '@/hooks/useDetermineType';
import { useContext } from 'react';
import { useStore } from 'zustand';

const ProductTitle = () => {
  const productType = 'Car Cover';
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const { model, make } = useDetermineType();

  return (
    <h1 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
      {/* TODO: Remember to check Rivian when it's available */}
      {/* {!make && !model ? (
        <>Waterproof Outdoor Custom-Fit {`${productType} `}</>
      ) : (
        <>
          {make === 'rivian' && 'Car Cover for '}
          {make && (selectedProduct.make as string)}{' '}
          {model && (selectedProduct.model as string)}{' '}
          {make === 'rivian' ? '' : `${productType} `}
          {' - '}
          <br />
          <>Waterproof, Outdoor, Custom-Fit</>
        </>
      )} */}
      {selectedProduct.title}
    </h1>
  );
};
export default ProductTitle;
