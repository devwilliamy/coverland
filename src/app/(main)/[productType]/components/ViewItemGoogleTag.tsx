'use client';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useItemViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useContext } from 'react';
import { useStore } from 'zustand';

export default function ViewItemGoogleTag() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  useItemViewedGoogleTag(selectedProduct);

  return <></>;
}
