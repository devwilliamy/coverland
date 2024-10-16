'use client';

import ReviewsTextTrigger from '@/app/(main)/[productType]/components/ReviewsTextTrigger';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import { Rating } from '@mui/material';
import { useStore } from 'zustand';

export default function ProductInfo() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { make, model } = useDetermineType();
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  // Refactor TODO:
  return (
    <>
      {/* Product Title */}
      <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
        {/* Refactor TODO: Change Floor Mats */}
        {make === 'rivian' && 'Floor Mats for '}
        {make && (selectedProduct.make as string)}{' '}
        {model && (selectedProduct.model as string)}{' '}
        {/* Refactor TODO: Change Floor Mats */}
        {make === 'rivian' ? '' : 'Floor Mats'}
        {' - '}
        {/* Refactor TODO: Change Custom Fit Tag Line */}
        <br className="max-lg:hidden" /> Custom-Fit, Durable Protection
      </h2>
      {/* Rating(s) */}
      <div className="-ml-0.5 mt-1 flex items-end gap-1 lg:mt-2">
        <div className="flex gap-1 ">
          <Rating
            name="read-only"
            value={4.5}
            precision={0.1}
            readOnly
            sx={{
              gap: '2px',
              '& .MuiRating-iconFilled': {
                color: '#BE1B1B',
              },
              '& .MuiRating-iconEmpty': {
                color: '#BE1B1B',
              },
            }}
          />
        </div>
        <ReviewsTextTrigger />
      </div>
    </>
  );
}
