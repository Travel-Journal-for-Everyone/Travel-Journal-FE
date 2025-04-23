import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

// ✅ 내 정보 조회 훅
export function useMyInfo() {
  const memberId = useAuthStore((state) => state.user?.memberId);

  return useQuery({
    queryKey: ["myInfo", memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${memberId}`);
      return data;
    },
    enabled: !!memberId,
    staleTime: 1000 * 60 * 5,
  });
}

// ✅ 특정 사용자 조회 훅
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
