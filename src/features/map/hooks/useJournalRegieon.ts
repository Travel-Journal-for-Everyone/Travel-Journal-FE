import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface JournalRegionData {
  diaries: { title: string; image: string; location: string }[];
  places: { title: string; image: string; location: string }[];
}

export function useJournalRegieon(regionName: string) {
  const user = useAuthStore((state) => state.user);

  return useQuery<JournalRegionData>({
    queryKey: ["journalRegion", regionName, user?.memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v1/members/${user!.memberId}/journals/regieon/${regionName}`
      );
      return data;
    },
    enabled: !!user?.memberId && !!regionName,
    staleTime: 1000 * 60 * 5,
  });
}
