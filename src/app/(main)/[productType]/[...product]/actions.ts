'use server';

import { revalidatePath } from 'next/cache';

export const refreshRoute = (url: string) => {
  revalidatePath(url);
};
