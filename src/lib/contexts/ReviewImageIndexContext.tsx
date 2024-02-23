import { createContext } from 'react';

export const ReviewImageIndexContext = createContext<{
  currentReviewImage: number;
  setCurrentReviewImage: React.Dispatch<React.SetStateAction<number>>;
  scrollTo: (e: number) => void;
} | null>(null);
