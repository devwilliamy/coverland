'use client';
import React from 'react';
import { getAllAcessories } from '@/lib/db/accessories';
import AccessoriesContent from '../seat-covers/components/AccessoriesContent';


export default function AccessoriesPage() {
  const accessories = async () => {
    const arr = await getAllAcessories();
    return arr;
  };
  accessories();

  return <AccessoriesContent />;
}
