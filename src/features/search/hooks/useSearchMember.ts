// hooks/useMemberSearch.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface MemberSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

interface MemberItem {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  travelDiaryCount: number;
  placesCount: number;
}

interface MemberSearchResult {
  content: MemberItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const useMemberSearch = ({
  keyword,
  page = 0,
  size = 10,
}: MemberSearchParams) => {
  const debouncedKeyword = useDebounce(keyword);

  return useQuery({
    queryKey: ["searchMembers", debouncedKeyword, page, size],
    queryFn: async () => {
      const res = await axiosInstance.get<MemberSearchResult>(
        "/v1/search/members",
        {
          params: {
            keyword: debouncedKeyword,
            page,
            size,
          },
        }
      );
      return res.data;
    },
    enabled: !!debouncedKeyword, // 키워드 있을 때만 요청
    staleTime: 1000 * 30, // 30초 캐시
  });
};
