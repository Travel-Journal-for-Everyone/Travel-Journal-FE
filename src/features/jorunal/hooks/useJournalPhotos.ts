import { useQuery, type UseQueryOptions, type QueryKey, keepPreviousData } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface JournalPhoto {
  uploadId: string;
  photoUrl: string;
  takenDateTime: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  dayNumber: number;
  daySpotOrder: number;
  description?: string;
}
type Photos = JournalPhoto[];

export const useJournalPhotos = (
  journalId: number,
  options?: Omit<UseQueryOptions<Photos, Error, Photos, QueryKey>, "queryKey" | "queryFn">
) => {
  return useQuery<Photos, Error>({
    queryKey: ["journalPhotos", journalId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/members/journals/${journalId}/photos`);
      return res.data as Photos;
    },
    enabled: !!journalId && (options?.enabled ?? true),

    placeholderData: options?.placeholderData ?? keepPreviousData,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,

    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: options?.refetchOnReconnect ?? false,
    refetchOnMount: options?.refetchOnMount ?? false,

    ...options,
  });
};
