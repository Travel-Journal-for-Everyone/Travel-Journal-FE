import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export function useMemberInfo(memberId?: number) {
  const fallbackUserId = useAuthStore((state) => state.user?.memberId);
  const targetId = memberId ?? fallbackUserId;

  return useQuery({
    queryKey: ["memberInfo", targetId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${targetId}`);
      return data;
    },
    enabled: !!targetId,
    staleTime: 1000 * 60 * 5,
  });
}
