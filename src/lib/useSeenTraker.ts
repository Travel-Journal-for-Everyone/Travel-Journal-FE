import { useRef, useCallback } from "react";

export function useSeenTracker(onSeen: (ids: number[]) => void) {
  const seenIds = useRef<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);

  const track = useCallback(
    (el: HTMLElement | null, journalId: number) => {
      if (!el) return;

      if (!observer.current) {
        observer.current = new IntersectionObserver(
          (entries) => {
            const seenBatch: number[] = [];
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              const id = Number(target.dataset.journalid);
              if (entry.isIntersecting && !seenIds.current.has(id)) {
                seenIds.current.add(id);
                seenBatch.push(id);
              }
            });
            if (seenBatch.length > 0) onSeen(seenBatch);
          },
          { threshold: 0.5 }
        );
      }

      el.dataset.journalid = String(journalId);
      observer.current.observe(el);
    },
    [onSeen]
  );

  return track;
}
