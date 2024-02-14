'use client';
import ReviewCard from './ReviewCard';
import { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import ReviewPercentCircle from './ReviewPercentCircle';
import ReviewHeaderGallery from './ReviewHeaderGallery';

import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import {
  FilterParams,
  filterReviewData,
  getProductReviewsByImage,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { useMediaQuery } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ReviewSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  const setReviewData = useStore(store, (s) => s.setReviewData);
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const { total_reviews, average_score } = useStore(
    store,
    (s) => s.reviewDataSummary
  );
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

  const SuvOrTruckType = type === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString = type === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  /**
   * Sets reviewImage back to <string, false>
   * Used for filterByImage quick fix, can get rid later
   */
  const resetReviewDataImages = () => {
    const reviewImageKeys = Object.keys(reviewImages);
    for (const reviewImage of reviewImageKeys) {
      reviewImages[reviewImage] = false;
    }
  };

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
        }
      );
      // This if is used for filterByImage quick fix, can get rid later, will probably just need the else
      if (filters[0]?.field === 'review_image') {
        resetReviewDataImages();
        filterReviewData({ reviewData: newReviewData, reviewImages });
        const newReviewDataWithJustImages = newReviewData.filter(
          (reviewData) => !!reviewData.review_image
        );
        setReviewData([...reviewData, ...newReviewDataWithJustImages]);
      } else {
        filterReviewData({ reviewData: newReviewData, reviewImages });
        setReviewData([...reviewData, ...newReviewData]);
      }
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
      resetReviewDataImages();

      filterReviewData({ reviewData: newReviewData, reviewImages });

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

      resetReviewDataImages();
      filterReviewData({ reviewData: newReviewData, reviewImages });

      // This if is used for filterByImage quick fix, can get rid later, will probably just need the else
      if (e.target.value === 'images') {
        // Here, review data should have ALL images
        // So then it'll filter out to the ones that are unique
        const newReviewDataWithJustImages = newReviewData.filter(
          (reviewData) => !!reviewData.review_image
        );
        // Leaving this comment here if we need to check the images are properly coming in
        // newReviewDataWithJustImages.map((r, i) =>
        //   console.log('Filtered By Image: ', {
        //     index: i,
        //     image: r.review_image,
        //   })
        // );

        setReviewData([...newReviewDataWithJustImages]);
      } else {
        setReviewData([...newReviewData]); // Only show the first 8 when a sort has been picked
      }

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
    <div className="relative mb-[56px] lg:mb-0 lg:py-2">
      {isMobile ? null : (
        <p
          className="mb-5 hidden text-center text-xl font-black uppercase text-black md:text-3xl lg:mb-20 lg:block lg:text-[42px]"
          id="reviews"
        >
          Car Cover Reviews
        </p>
      )}
      <div className="flex flex-col gap-[20px] lg:flex-row  lg:gap-0">
        <div className="flex w-full min-w-[188px] flex-col lg:items-center">
          <div className="flex items-center gap-[14px] pt-8 lg:pt-0">
            <p className="pl-4 text-[40px] font-black lg:pl-0 lg:text-[80px]">
              {average_score?.toFixed(1) || '4.9'}
            </p>
            <p className="text-sm font-normal lg:mt-11 lg:text-lg">
              {total_reviews} reviews
            </p>
          </div>
          <div className="flex items-stretch gap-1 pl-4 text-yellow-300">
            <Rating
              name="read-only"
              value={5}
              readOnly
              size="large"
              style={{
                height: '25px',
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center  gap-2 pl-4">
          <ReviewPercentCircle percent="95" />
          <p className="text-[18px] font-bold lg:text-[28px]">
            95% would recommend
          </p>
        </div>
      </div>
      <ReviewHeaderGallery />
      <div className="pt-6"></div>
      <div className="my-5 flex flex-col gap-1 *:rounded-lg lg:flex-row lg:gap-4">
        <select
          className="mx-auto mt-9 h-12 w-full rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A]"
          onChange={handleSortSelectionChange}
        >
          <option value="helpful">Sort By Most Helpful</option>
          <option value="newest">Sort By Most Recent</option>
          {/* <option value="oldest">Sort By Oldest</option> */}
        </select>

        <select
          className="mx-auto mt-3 h-12 w-full rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A] lg:mt-9"
          onChange={handleFilterSelectionChange}
        >
          <option value="none">Filter By</option>
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
      {reviewData?.length === 0 ? (
        <div className="flex items-center justify-center py-4">
          No Reviews Found
        </div>
      ) : null}
      {!!reviewData?.length && (
        <div className="mt-7 flex flex-col items-center gap-6 lg:mt-[71px]">
          {reviewData?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}

          {areThereMoreReviews && !filterImageOn ? (
            // Can remove filterImageOn later, just used for filterImageBy quickfix
            <button
              className="my-4 max-w-[160px] items-stretch justify-center whitespace-nowrap rounded-full border border-solid border-black bg-white px-8 py-3.5 font-black leading-4 tracking-wide text-black transition-colors duration-150 hover:bg-black hover:text-white"
              aria-label="View more"
              role="button"
              onClick={() => handleViewMore()}
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
