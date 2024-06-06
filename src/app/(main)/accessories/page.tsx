import React from 'react';
import { getAllAcessories } from '@/lib/db/accessories';
import AccessoryPage from './components/AccessoryPage';
import { CartProvider } from '@/providers/CartProvider';
import AllAccessories from './components/AllAccessories';

export default function AllAccessoriesPageRoute() {
  return <AllAccessories />;
}
