'use client';
import { useState } from 'react';
import { track } from '@vercel/analytics';

import { useStore } from 'zustand';
import {
  FilterParams,
  // filterReviewImages,
  getProductReviewsByImage,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { useMediaQuery } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewCard from './ReviewCard';
import ReviewHeaderGallery from './ReviewHeaderGallery';
import ReviewPercentCircle from './ReviewPercentCircle';
import { generateNumberFromCarBuild } from '@/lib/utils';
import ReviewTotalCount from './ReviewTotalCount';
import useFilterHandler from '@/hooks/review/useFilterHandler';
import useViewMoreHandler from '@/hooks/review/useViewMoreHandler';
import useSortHandler from '@/hooks/review/useSortHandler';
import useDetermineType from '@/hooks/useDetermineType';
import { SortParams } from '@/lib/types/review';

const ReviewSection = ({ showHeader }: { showHeader?: boolean }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  const setReviewData = useStore(store, (s) => s.setReviewData);
  const reviewImageTracker = useStore(store, (s) => s.reviewImageTracker);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const { total_reviews, average_score } = useStore(
    store,
    (s) => s.reviewDataSummary
  );
  const { type, make, model } = useStore(store, (s) => s.query);
  const year = useStore(store, (s) => s.paramsYear);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Starting at 1 because we're already starting at 0
  const limit = 8;
  const [sort, setSort] = useState<SortParams[]>({
    field: 'helpful',
    order: 'desc',
  });
  const [filters, setFilters] = useState<FilterParams[]>([]);
  const { productType } = useDetermineType();
  // const [searchReview, setSearchReview] = useState<string>('');

  const areThereMoreReviews = reviewData.length < total_reviews;

  const typeString = productType;
  const generatedReviewScore =
    selectedProduct &&
    generateNumberFromCarBuild(
      selectedProduct.type,
      selectedProduct.display_id,
      selectedProduct.make,
      selectedProduct.model,
      selectedProduct.year_generation
    ).toFixed(1);
  /**
   * Sets reviewImage back to <string, false>
   * Used for filterByImage quick fix, can get rid later
   */

  const { handleViewMore } = useViewMoreHandler({
    typeString,
    year,
    make,
    model,
    limit,
    page,
    sort,
    filters,
    reviewImageTracker,
    setLoading,
    setReviewData,
    setPage,
  });

  const { handleSortSelectionChange } = useSortHandler({
    typeString,
    year,
    make,
    model,
    limit,
    setLoading,
    setReviewData,
    setPage,
    setSort,
  });
  // Special state. Will get rid of later once image duplicates aren't a problem
  // This was for the filterByImage quickfix. Can be removed later.
  const [filterImageOn, setFilterImageOn] = useState(false);

  const { handleFilterSelectionChange } = useFilterHandler({
    typeString,
    year,
    make,
    model,
    limit,
    setLoading,
    setReviewData,
    setPage,
    setFilters,
    setFilterImageOn,
  });

  /* Text search - was told to leave it out for now */
  // const handleSearchEnter = async (e: React.ChangeEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     // If set to none, do the default sort
  //     const newReviewData = await getProductReviewsByPage(
  //       {
  //         productType: typeString,
  //         year,
  //         make,
  //         model,
  //       },
  //       {
  //         pagination: {
  //           page: 0, // Reset to the beginning
  //           limit,
  //         },
  //         search: searchReview,
  //         sort: {
  //           field: 'helpful',
  //           order: 'desc',
  //         },
  //       }
  //     );

  //     setReviewData([...newReviewData]); // Only show the first 8 when a sort has been picked
  //     setPage(1);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };
  return (
    <div className="relative mb-[56px] flex w-full flex-col items-center px-[22px] lg:mb-0 lg:px-[59px] lg:py-2">
      {showHeader && (
        <p
          className="flex items-center justify-center pt-[30px] text-center text-[30px]  font-black uppercase text-black md:text-3xl lg:block lg:pt-[80px] lg:text-[42px]"
          id="reviews"
        >
          Reviews
        </p>
      )}
      {reviewData?.length === 0 ? (
        <div className="flex items-center justify-center py-4">
          No Reviews Found
        </div>
      ) : (
        <>
          <header className="flex w-full flex-col items-center pb-[30px] lg:max-w-[1080px]  lg:flex-row lg:pb-[80px] lg:pt-[80px]">
            <div className="flex w-full min-w-[188px] items-center lg:justify-center ">
              <p className="pl-0.5 text-[40px] font-black lg:pl-0 lg:text-[60px]">
                {generatedReviewScore || '4.9'}
              </p>
              <div className="flex flex-col items-stretch  gap-1 pl-4 text-yellow-300 ">
                <div className="pt-[30px] lg:pt-[35px]">
                  <ReviewRatingStar
                    // rating={Number(average_score?.toFixed(1))}
                    rating={4.5}
                    size={isMobile ? 26 : 54}
                  />
                </div>
                <p className="pl-4 text-sm font-normal text-[#767676] lg:text-lg">
                  <ReviewTotalCount />
                </p>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 lg:justify-center lg:gap-5">
              <ReviewPercentCircle percent="95" />
              <div className="flex flex-col">
                <p className="whitespace-nowrap text-[18px] font-bold lg:text-[28px]">
                  95% would recommend
                </p>
              </div>
            </div>
          </header>
          <ReviewHeaderGallery />
          <div className="flex w-full items-center justify-end gap-1 pt-7 *:rounded-lg  lg:gap-4">
            <select
              className=" h-12 rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A] max-lg:max-w-[100px]"
              onChange={handleSortSelectionChange}
              defaultValue={'sort'}
            >
              <option disabled className="hidden" value="sort">
                Sort
              </option>
              <option value="helpful">Most Helpful</option>
              <option value="newest">Most Recent</option>
              {/* <option value="oldest">Sort By Oldest</option> */}
            </select>

            <select
              className=" h-12 rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A] max-lg:max-w-[100px] "
              onChange={handleFilterSelectionChange}
              defaultValue={'filter'}
            >
              <option disabled className="hidden" value="filter">
                Filter
              </option>
              <option value="images">Images Only</option>
              {/* <option value="verified">Verified Purchases Only</option> */}
              <option value="positive">Positive Reviews</option>
              <option value="critical">Critical Reviews</option>
            </select>
            {/* Text search - was told to leave it out for now */}
            {/* <input
        className="mt-3 h-12 w-full rounded border border-[#C8C7C7] pl-4 text-lg font-normal text-[#1A1A1A] lg:h-[45px] lg:w-[427px]"
        placeholder="Search Reviews"
        value={searchReview}
        onChange={(e) => setSearchReview(e.target.value)}
      />
      <button onClick={handleSearchEnter}>Search</button> */}
          </div>
        </>
      )}
      {!!reviewData?.length && (
        <div className="mt-4 flex flex-col items-center gap-6 lg:mt-[10px]">
          {reviewData?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}

          {areThereMoreReviews && !filterImageOn ? (
            // Can remove filterImageOn later, just used for filterImageBy quickfix
            <button
              className="my-4 max-w-[160px] items-stretch justify-center whitespace-nowrap rounded-full border border-solid border-black bg-white px-8 py-3.5 font-black leading-4 tracking-wide text-black transition-colors duration-150 hover:bg-black hover:text-white"
              aria-label="View more"
              role="button"
              onClick={() => {
                handleViewMore();
                track('Viewing 4 More Reviews');
              }}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                `View ${limit} More`
              )}
            </button>
          ) : (
            <div className="py-3"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
