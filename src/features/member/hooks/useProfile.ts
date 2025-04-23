import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface ProfileResponse {
  nickname: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  profileImageUrl: string;
  followerCount: number;
  followingCount: number;
  travelDiaryCount: number;
  placesCount: number;
}

export function useProfile() {
  const setProfileInfo = useAuthStore((state) => state.setProfileInfo);

  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/v1/member/profile");

      setProfileInfo({
        nickname: data.nickname,
        accountScope: data.accountScope,
        profileImageUrl: data.profileImageUrl,
      });

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
