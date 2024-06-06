'use client';
import { Rating } from '@mui/material';
import React from 'react';

export const RedRating = () => (
  <Rating
    name="read-only"
    value={4.5}
    precision={0.1}
    readOnly
    sx={{
      gap: '2px',
      '& .MuiRating-iconFilled': {
        color: '#BE1B1B',
      },
      '& .MuiRating-iconEmpty': {
        color: '#BE1B1B',
      },
    }} />
);
