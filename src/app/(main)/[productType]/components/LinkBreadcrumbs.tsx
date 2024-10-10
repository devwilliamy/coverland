'use client';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import { deslugify } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useStore } from 'zustand';

export default function LinkBreadcrumbs() {
  const params = Object(useParams());
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const { isSeatCover, isFloorMat } = useDetermineType();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');

  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const getUrlFromBreadcrumbs = (index: number): string => {
    let returnString = '';
    for (let i = 0; i < index + 1; i++) {
      if (paramValues[i] === 'leather') {
        returnString = returnString + '/' + 'seat-covers';
      }
      if (paramValues[i] === 'textured') {
        returnString = returnString + '/' + 'floor-mats';
      }
      returnString = returnString + '/' + paramValues[i];
    }
    return returnString;
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {isSeatCover && (
        <div className="flex gap-1">
          <p> </p>
          <a
            href={getUrlFromBreadcrumbs(0)}
            className={`capitalize hover:underline `}
          >
            Seat Covers
          </a>
          <p>/</p>
        </div>
      )}
      {isFloorMat && (
        <div className="flex gap-1">
          <p> </p>
          <a
            href={getUrlFromBreadcrumbs(0)}
            className={`capitalize hover:underline `}
          >
            Floor Mats
          </a>
          <p>/</p>
        </div>
      )}
      {params &&
        paramKeys.map((key, index) => {
          return (
            <div key={String(params[key])} className="flex gap-1">
              <p> </p>
              <a
                href={getUrlFromBreadcrumbs(index)}
                className={`hover:underline`}
              >
                {/* Replacing hyphens with spaces (except for year_generation) */}

                {key === 'productType' && selectedProduct.type}
                {key === 'coverType' &&
                  params[key] !== 'leather' &&
                  params[key] !== 'textured' &&
                  'Premium Plus'}
                {key === 'make' && selectedProduct.make}
                {key === 'model' && selectedProduct.model}
                {key === 'year' && params[key]}
                {params[key] === 'leather' && 'Leather'}
                {params[key] === 'textured' && 'Textured'}
              </a>
              {index != paramKeys.length - 1 && <p>/</p>}
            </div>
          );
        })}
    </div>
  );
}
