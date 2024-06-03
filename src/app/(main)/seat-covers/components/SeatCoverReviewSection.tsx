'use client';
import { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import { track } from '@vercel/analytics';

import { CarSelectionContext } from '@/contexts/CarSelectionContext';
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
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import ReviewCard from '@/components/PDP/components/ReviewCard';
import ReviewHeaderGallery from '@/components/PDP/components/ReviewHeaderGallery';
import ReviewPercentCircle from '@/components/PDP/components/ReviewPercentCircle';
import { determineShortReviewCount } from '@/lib/utils';
import useDetermineType from '@/hooks/useDetermineType';

const SeatCoverReviewSection = ({ showHeader }: { showHeader?: boolean }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const store = useContext(SeatCoverSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  const setReviewData = useStore(store, (s) => s.setReviewData);
  const reviewImageTracker = useStore(store, (s) => s.reviewImageTracker);

  const { total_reviews, average_score } = useStore(
    store,
    (s) => s.reviewDataSummary
  );
  const { isModelPage, isYearPage } = useDetermineType();
  const { type, make, model } = useStore(store, (s) => s.query);
  const year = useStore(store, (s) => s.paramsYear);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Starting at 1 because we're already starting at 0
  const limit = 8;
  const [sort, setSort] = useState<{ field: string; order: 'desc' | 'asc' }>({
    field: 'helpful',
    order: 'desc',
  });
  const [filters, setFilters] = useState<FilterParams[]>([]);
  // const [searchReview, setSearchReview] = useState<string>('');

  const areThereMoreReviews = reviewData.length < total_reviews;
  const typeString = 'Seat Covers';

  /**
   * Sets reviewImage back to <string, false>
   * Used for filterByImage quick fix, can get rid later
   */

  const handleViewMore = async () => {
    try {
      setLoading(true);
      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
          year,
          make,
          model,
        },
        {
          pagination: {
            page,
            limit,
          },
          sort,
          filters,
          // search: searchReview,
        },
        reviewImageTracker
      );

      setReviewData([...reviewData, ...newReviewData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSortSelectionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let field;
    let order = 'asc' as 'asc' | 'desc';
    switch (e.target.value) {
      case 'newest':
        field = 'reviewed_at';
        order = 'desc';
        break;
      case 'helpful':
        field = 'helpful';
        order = 'desc';
        break;
      case 'oldest':
        field = 'reviewed_at'; // Assuming you'll sort in ascending order elsewhere
        break;
      // Add more cases as needed
      default:
        field = 'helpful'; // Default case if needed
        order = 'desc';
    }

    try {
      setLoading(true);

      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
          year,
          make,
          model,
        },
        {
          pagination: {
            page: 0, // Reset to the beginning
            limit,
          },
          sort: {
            field,
            order,
          },
        }
      );
      setSort({ field, order });
      setReviewData([...newReviewData]); // Only show the first 8 when a sort has been picked
      setPage(1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  // Special state. Will get rid of later once image duplicates aren't a problem
  // This was for the filterByImage quickfix. Can be removed later.
  const [filterImageOn, setFilterImageOn] = useState(false);

  const handleFilterSelectionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let field;
    let operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte';
    let value;

    switch (e.target.value) {
      // case 'none':

      //   break;
      case 'images':
        field = 'review_image';
        operator = 'neq';
        value = '';
        break;
      // case 'verified':
      //   field = '';
      //   operator = 'neq';
      //   value = ''
      //   break;
      case 'positive':
        field = 'rating_stars';
        operator = 'gt';
        value = '3';
        break;
      case 'critical':
        field = 'rating_stars';
        operator = 'lt';
        value = '3';
        break;

      default:
        field = 'review_image';
        operator = 'neq';
        value = '';
        break;
    }

    try {
      setLoading(true);
      // If set to none, do the default sort
      let newReviewData;
      if (e.target.value === 'none') {
        newReviewData = await getProductReviewsByPage(
          {
            productType: typeString,
            year,
            make,
            model,
          },
          {
            pagination: {
              page: 0, // Reset to the beginning
              limit,
            },
            sort: {
              field: 'helpful',
              order: 'desc',
            },
          }
        );
        // This was for the filterByImage quickfix. Can be removed later.
        setFilterImageOn(false);
      } else if (e.target.value === 'images') {
        // This else if is used for filterByImage quick fix, can get rid later
        newReviewData = await getProductReviewsByImage(
          {
            productType: typeString,
            year,
            make,
            model,
          },
          {
            filters: [
              {
                field,
                operator,
                value,
              },
            ],
            sort: {
              field: 'helpful',
              order: 'desc',
            },
          }
        );
        // This was for the filterByImage quickfix. Can be removed later.
        setFilterImageOn(true);
      } else {
        newReviewData = await getProductReviewsByPage(
          {
            productType: typeString,
            year,
            make,
            model,
          },
          {
            pagination: {
              page: 0, // Reset to the beginning
              limit,
            },
            filters: [
              {
                field,
                operator,
                value,
              },
            ],
            sort: {
              field: 'helpful',
              order: 'desc',
            },
          }
        );
        // This was for the filterByImage quickfix. Can be removed later.
        setFilterImageOn(false);
      }

      const newFilters = [{ field, operator, value }];
      setFilters([...newFilters]);

      setReviewData([...newReviewData]); // Only show the first 8 when a sort has been picked

      setPage(1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

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
      {isMobile ? null : (
        <>
          {showHeader && (
            <p
              className="mb-5 hidden text-center text-xl font-black uppercase text-black md:text-3xl lg:mb-20 lg:block lg:text-[42px]"
              id="reviews"
            >
              Car Cover Reviews
            </p>
          )}
        </>
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
                {average_score?.toFixed(1) || '4.9'}
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
                  {isYearPage || isModelPage
                    ? determineShortReviewCount(total_reviews)
                    : total_reviews
                      ? total_reviews
                      : '2'}{' '}
                  Reviews
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
              <option value="helpful">Sort By Most Helpful</option>
              <option value="newest">Sort By Most Recent</option>
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
              <option value="images">Filter By Images Only</option>
              {/* <option value="verified">Filter By Verified Purchases Only</option> */}
              <option value="positive">Filter By Positive Reviews</option>
              <option value="critical">Filter By Critical Reviews</option>
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

export default SeatCoverReviewSection;
