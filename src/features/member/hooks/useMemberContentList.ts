import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}

export function useMemberContentList<T>(
  memberId: number,
  type: "journals" | "places"
) {
  return useQuery<PaginatedResponse<T>>({
    queryKey: [type, memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/v1/members/1/${type}`
        // ${memberId} 일단 1로 대체
      );
      return data;
    },
    enabled: !!memberId,
    staleTime: 1000 * 60 * 5,
  });
}
