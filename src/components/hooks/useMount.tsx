import { useEffect, useState } from 'react';

export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState<boolean>(false);
  // effects run only client-side
  // so we can detect when the component is hydrated/mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
