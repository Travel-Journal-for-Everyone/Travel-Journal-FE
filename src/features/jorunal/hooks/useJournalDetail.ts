import { useQuery, type UseQueryOptions, type QueryKey, keepPreviousData } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface JournalDetail {
  title: string;
  startDate: string;
  endDate: string;
  nights: number;
  days: number;
  region: string;
  hashTag: string[];
  description: string;
  blockRelationType: string;
  thumbnailUploadId: string;
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
    uploadFilename: string;
    uploadId: string;
    dayNumber: number;
    daySpotOrder: number;
    photoOrder: number;
    photoUrl: string;
  }[];
}

export function useJournalDetail(
  journalId?: number,
  options?: Omit<UseQueryOptions<JournalDetail, Error, JournalDetail, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery<JournalDetail, Error>({
    queryKey: ["journalDetail", journalId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/journals/${journalId}`);
      return data as JournalDetail;
    },
    // ✅ 페이지에서 넘기는 enabled가 우선
    enabled: !!journalId && (options?.enabled ?? true),

    // ✅ v5에서는 keepPreviousData 대신 이걸 씀
    placeholderData: options?.placeholderData ?? keepPreviousData,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,

    // ✅ 포커스/재연결/마운트 리패치 기본 끔
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: options?.refetchOnReconnect ?? false,
    refetchOnMount: options?.refetchOnMount ?? false,

    ...options,
  });
}
