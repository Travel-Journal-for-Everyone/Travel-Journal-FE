import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

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
