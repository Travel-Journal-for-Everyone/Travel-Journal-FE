import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface JournalRegionItem {
  journalId: number;
  title: string;
  hashTag: string[];
  nights: number;
  days: number;
  startDate: string;
  endDate: string;
}

interface JournalRegionData {
  content: JournalRegionItem[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}
export function useJournalRegion(regionName: string) {
  const user = useAuthStore((state) => state.user);

  return useQuery<JournalRegionData>({
    queryKey: ["journalRegion", regionName, user?.memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v1/members/${user!.memberId}/journals/region/${regionName}`
      );
      return data;
    },
    enabled: !!user?.memberId && !!regionName,
    staleTime: 1000 * 60 * 5,
  });
}
