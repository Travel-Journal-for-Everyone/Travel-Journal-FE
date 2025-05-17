import axiosInstance from "@/lib/axiosInstance";
import { useCallback } from "react";

export function useMarkJournalsSeen() {
  const markAsSeen = useCallback(async (journalIds: number[]) => {
    if (!journalIds.length) return;

    try {
      await axiosInstance.post("/v1/explore/journals/seen", {
        journalIds,
      });
    } catch (error) {
      console.error("마크 요청 실패:", error);
    }
  }, []);

  return { markAsSeen };
}
