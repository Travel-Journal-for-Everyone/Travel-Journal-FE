import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface JournalItem {
  journalId: number;
  title: string;
  startDate: string;
  endDate: string;
  region: string;
  hashTag: string[];
  thumbnailUrl: string;
}

interface JournalListResponse {
  content: JournalItem[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export function useJournalList(page = 0, size = 10) {
  const user = useAuthStore((state) => state.user);

  return useQuery<JournalListResponse>({
    queryKey: ["journalList", user?.memberId, page, size],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${user!.memberId}/journals`, {
        params: { page, size },
      });
      return data;
    },
    enabled: !!user?.memberId,
    staleTime: 1000 * 60 * 5,
  });
}
