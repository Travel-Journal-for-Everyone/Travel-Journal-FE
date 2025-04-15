import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface RegionPlace {
  placeId: number;
  title: string;
  thumbnailUrl: string;
  region: string;
}

interface RegionPlaceData {
  content: RegionPlace[];
}

export function useJournalPlace(regionName: string) {
  const user = useAuthStore((state) => state.user);

  return useQuery<RegionPlaceData>({
    queryKey: ["regionPlaces", regionName, user?.memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v1/members/${user!.memberId}/places/region/${regionName}`
      );
      return data;
    },
    enabled: !!user?.memberId && !!regionName,
    staleTime: 1000 * 60 * 5,
  });
}
