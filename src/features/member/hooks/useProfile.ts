// features/member/hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface ProfileResponse {
  profileInfo: {
    nickname: string;
    accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
    profileImageUrl: string;
    followerCount: number;
    followingCount: number;
    travelDiaryCount: number;
    placesCount: number;
  };
}

export function useProfile() {
  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/v1/member/profile");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
