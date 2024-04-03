import { Rating } from '@mui/material';

type ReviewRatingStarProps = {
  rating?: number;
  size?: 'small' | 'medium' | 'large';
};
export default function ReviewRatingStar({
  rating = 5,
  size = 'large',
}: ReviewRatingStarProps) {
  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.1}
      size={size}
      sx={{
        gap: '2px',
        '& .MuiRating-iconFilled': {
          color: '#FFD80E',
          stroke: '#FF9F47',
          strokeWidth: 1,
        },
        '& .MuiRating-iconEmpty': {
          color: '#FF9F47',
          strokeWidth: 0,
        },
      }}
    />
  );
}
