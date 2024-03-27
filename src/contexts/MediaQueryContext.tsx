'use client';
import { useMediaQuery } from '@mantine/hooks';

export default function MediaQueryContext({ children }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <>{isMobile ? null : children}</>;
}
