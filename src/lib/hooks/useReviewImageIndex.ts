import { useState } from 'react';

export default function useReviewImageIndex() {
  const [currentReviewImage, setCurrentReviewImage] = useState(0);

  return { currentReviewImage, setCurrentReviewImage };
}
