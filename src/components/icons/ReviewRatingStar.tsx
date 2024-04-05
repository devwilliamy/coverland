import { Rating } from '@mui/material';

type ReviewRatingStarProps = {
  rating?: number;
  // size?: 'small' | 'medium' | 'large';
  size?: number;
};
export default function ReviewRatingStar({
  rating = 5,
  size = 20,
}: ReviewRatingStarProps) {
  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.1}
      size={'large'}
      sx={{
        gap: '2px',
        fontSize: `${size}px`,
        // strokeLinejoin: 'bevel',
        '& .MuiRating-iconFilled': {
          color: '#FFD80E',
          // stroke: '#FF9F47',
        },
        '& .MuiRating-iconEmpty': {
          // color: 'transparent',
          color: '#FFD80E',
        },
      }}
    />
  );
}
