import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export function useIsFollowing(memberId: number) {
  return useQuery({
    queryKey: ["isFollowing", memberId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/v1/follow/${memberId}/is-following`
      );
      console.log("서버 응답 원본:", res);
      return res.data;
    },
    staleTime: 1000 * 30,
  });
}

export function useFollowers(memberId: number) {
  return useQuery({
    queryKey: ["followers", memberId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/follow/${memberId}/followers`);
      return res.data.content ?? [];
    },
  });
}

export function useFollowings(memberId: number) {
  return useQuery({
    queryKey: ["followings", memberId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/follow/${memberId}/followings`);
      return res.data.content ?? [];
    },
  });
}

export function useFollowCount(memberId: number) {
  return useQuery({
    queryKey: ["followCount", memberId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/follow/${memberId}/count`);
      return res.data;
    },
    staleTime: 1000 * 30,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

// 내 팔로워 목록
export function useMyFollowers() {
  const memberId = useAuthStore((state) => state.user?.memberId);
  return useFollowers(memberId!);
}

// 내 팔로잉 목록
export function useMyFollowings() {
  const memberId = useAuthStore((state) => state.user?.memberId);
  return useFollowings(memberId!);
}

// 내 팔로우 수
export function useMyFollowCount() {
  const memberId = useAuthStore((state) => state.user?.memberId);
  return useFollowCount(memberId!);
}
