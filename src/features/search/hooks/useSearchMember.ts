import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface MemberSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

interface MemberSearchResult {
  content: Array<{
    memberId: number;
    nickname: string;
    profileImageUrl: string;
  }>;
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
  return useQuery({
    queryKey: ["searchMembers", keyword, page, size],
    queryFn: async () => {
      const res = await axiosInstance.get<MemberSearchResult>(
        "/v1/search/members",
        {
          params: {
            keyword,
            page,
            size,
          },
        }
      );
      return res.data;
    },
    enabled: !!keyword, // 키워드가 있어야만 요청
    staleTime: 1000 * 30, // 30초 캐시
  });
};
