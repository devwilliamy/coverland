import { FilterParams, SortParams } from '@/lib/types/review';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type ReviewContextState = {
  sort: SortParams[];
  setSort: Dispatch<SetStateAction<SortParams[]>>;
  filterImageOn: boolean;
  setFilterImageOn: Dispatch<SetStateAction<boolean>>;
  filters: FilterParams[];
  setFilters: Dispatch<SetStateAction<FilterParams[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  isReviewLoading: boolean;
  setIsReviewLoading: Dispatch<SetStateAction<boolean>>;
};

const ReviewContext = createContext<ReviewContextState | undefined>(undefined);

type ReviewProviderProps = {
  children: ReactNode;
};
export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [sort, setSort] = useState<SortParams[]>([
    {
      field: 'sku',
      order: 'asc',
    },
    {
      field: 'helpful',
      order: 'desc',
      nullsFirst: false,
    },
  ]);
  const [filters, setFilters] = useState<FilterParams[]>([]);
  // Special state. Will get rid of later once image duplicates aren't a problem
  // This was for the filterByImage quickfix. Can be removed later.
  const [filterImageOn, setFilterImageOn] = useState(false);
  const [page, setPage] = useState(1); // Starting at 1 because we're already starting at 0
  const limit = 8;
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  return (
    <ReviewContext.Provider
      value={{
        sort,
        setSort,
        filterImageOn,
        setFilterImageOn,
        page,
        setPage,
        limit,
        filters,
        setFilters,
        isReviewLoading,
        setIsReviewLoading,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within an ReviewProvider');
  }
  return context;
};
