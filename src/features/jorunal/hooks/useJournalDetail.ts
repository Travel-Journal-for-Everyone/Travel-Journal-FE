import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface JournalDetail {
  title: string;
  startDate: string;
  endDate: string;
  region: string;
  hashTag: string[];
  description: string;
  journalDays: {
    dayNumber: number;
    description: string;
    journalDaySpots: {
      spotOrder: number;
      spotName: string;
      latitude: number;
      longitude: number;
    }[];
  }[];
  photoList: {
    photoUrl: string;
    photoOrder: number;
    dayNumber: number;
    daySpotOrder: number;
    uploadId: string;
  }[];
  blockRelationType: string;
}

export function useJournalDetail(journalId?: number) {
  return useQuery<JournalDetail>({
    queryKey: ["journalDetail", journalId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v1/members/journals/${journalId}`
      );
      return data;
    },
    enabled: !!journalId,
    staleTime: 1000 * 60 * 5,
  });
}
