import { useEffect } from 'react';

interface UseIntersectionObserverProps {
  target: string;
  onIntersect: () => void;
  enabled?: boolean;
  threshold: number | number[];
}

const useIntersectionObserver = ({
  target,
  onIntersect,
  enabled = true,
  threshold,
}: UseIntersectionObserverProps): void => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onIntersect();
        }
      },
      { threshold }
    );

    const element = document.querySelector(target);

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, onIntersect, enabled, threshold]);
};

export default useIntersectionObserver;
