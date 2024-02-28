import { useState, useEffect, useRef } from 'react';

const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const component = ref.current;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    });

    if (component) {
      observer.observe(component);
    }

    return () => {
      if (component) {
        observer.unobserve(component);
      }
    };
  }, [ref]);

  return [isVisible, ref];
};

export default useIsVisible;
