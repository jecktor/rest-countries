import { useEffect, useState } from 'react';

const useOnScreen = (ref, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const { current } = ref;

    if (current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(current);

    return () => {
      if (current == null) return;
      observer.unobserve(current);
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useOnScreen;
