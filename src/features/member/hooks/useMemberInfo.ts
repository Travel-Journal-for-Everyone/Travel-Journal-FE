import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import { getCookie } from "@/lib/cookieUtils";

export interface MemberInfo {
  memberId: number; // 선택사항: 있는 경우 사용
  profileInfo: {
    nickname: string;
    profileImageUrl: string;
    accountScope: "PUBLIC" | "PRIVATE"; // 문자열 리터럴 union
    followerCount: number;
    followingCount: number;
    travelDiaryCount: number;
    placesCount: number;
  };
  regions: {
    regionName: string;
    travelDiaryCount: number;
    placesCount: number;
  }[];
}

export function useMyInfo() {
  const raw = typeof window !== "undefined" ? getCookie("myInfo") : null;
  const cached = raw ? (JSON.parse(raw) as MemberInfo) : null;
  const memberId = cached?.memberId || getCookie("memberId");

  return useQuery<MemberInfo>({
    queryKey: ["myInfo", memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${memberId}`);
      return data;
    },
    enabled: !!memberId,
    initialData: cached ?? undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMemberInfo(memberId: number) {
  return useQuery({
    queryKey: ["memberInfo", memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${memberId}`);
      return data;
    },
    enabled: !!memberId,
    staleTime: 1000 * 60 * 5,
  });
}
