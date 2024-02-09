'use client';
import ReviewCard from './ReviewCard';
import { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import ReviewPercentCircle from './ReviewPercentCircle';
import ReviewHeaderGallery from './ReviewHeaderGallery';

import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import { getProductReviewsByPage } from '@/lib/db/review';
import { useMediaQuery } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ReviewSection = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const reviewData = useStore(store, (s) => s.reviewData);
  const setReviewData = useStore(store, (s) => s.setReviewData);
  const { total_reviews, average_score } = useStore(
    store,
    (s) => s.reviewDataSummary
  );
  const { year, type, make, model } = useStore(store, (s) => s.query);
  const parentGenerationYear = year ? year : selectedProduct.parent_generation;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Starting at 1 because we're already starting at 0
  const limit = 8;
  const areThereMoreReviews = reviewData.length < total_reviews;
  const typeString =
    type === 'car-covers'
      ? 'Car Covers'
      : type === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';

  const handleViewMore = async () => {
    try {
      setLoading(true);
      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
          year: parentGenerationYear as string,
          make,
          model,
        },
        {
          pagination: {
            page,
            limit,
          },
        }
      );
      setReviewData([...reviewData, ...newReviewData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectionChange = async (
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
          year: parentGenerationYear as string,
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
      setReviewData([...newReviewData]); // Only show the first 8 when a sort has been picked
      setPage(1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (!reviewData) return null;

  return (
    <div className="relative lg:py-2">
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
      <ReviewHeaderGallery reviewData={reviewData} />
      <div className="pt-6"></div>
      <div className="my-5 flex gap-4 *:rounded-lg">
        <select
          className="mx-auto mt-9 h-12 w-full rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A]"
          onChange={handleSelectionChange}
        >
          <option value="helpful">Sort By Most Helpful</option>
          <option value="newest">Sort By Most Recent</option>
          <option value="oldest">Sort By Oldest</option>
        </select>

        {/* <select className=" mx-auto mt-9 h-12 w-full rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] text-[#767676]">
          <option value="volvo">Newest</option>
          <option value="saab">Oldest</option>
          <option value="mercedes">Most Helpful</option>
        </select>
        <select className="mx-auto mt-9 h-12 w-full rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] text-[#767676]">
          <option value="volvo">Newest</option>
          <option value="saab">Oldest</option>
          <option value="mercedes">Most Helpful</option>
        </select> */}
      </div>
      {!!reviewData?.length && (
        <div className="mt-7 flex flex-col items-center gap-6 lg:mt-[71px]">
          {reviewData?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
          {areThereMoreReviews ? (
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
