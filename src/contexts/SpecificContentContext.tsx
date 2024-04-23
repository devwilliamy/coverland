'use client';
import useDetermineContent from '@/hooks/useDetermineContent';
import { createContext } from 'react';

const getInitialData = () => {
  const { featured360, carouselVideoThumbnail } = useDetermineContent();
  return { featured360, carouselVideoThumbnail };
};
const { featured360, carouselVideoThumbnail } = getInitialData();
export const SpecificContentContext = createContext({
  featured360,
  carouselVideoThumbnail,
});
