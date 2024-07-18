import { getProductReviewsByPage } from '@/lib/db/review';
import { TReviewData } from '@/lib/types/review';
import { SEAT_COVERS } from '@/lib/constants';

type ViewMoreHandlerProps = {
  typeString: string;
  year: number;
  make: string;
  model: string;
  limit: number;
  page: number;
  sort: any; // Adjust the type as needed
  filters: any; // Adjust the type as needed
  reviewImageTracker: Record<string, boolean>;
  setLoading: (loading: boolean) => void;
  addReviewData: (data: TReviewData[]) => void;
  setPage: (page: number) => void;
};

const useViewMoreHandler = ({
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
  addReviewData,
  setPage,
}: ViewMoreHandlerProps) => {
  const handleViewMore = async () => {
    try {
      setLoading(true);
      if (typeString === SEAT_COVERS) {
        year = '';
        make = '';
        model = '';
      }
      
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

      addReviewData(newReviewData);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleViewMore };
};

export default useViewMoreHandler;
