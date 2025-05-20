import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInfiniteScroll(callback: () => void, deps: any[] = []) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, deps);

  return ref;
}
