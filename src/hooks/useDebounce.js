import { useEffect } from 'react';

export const useDebounce = (callback, delay = 500, dependencies = []) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, dependencies);
};
