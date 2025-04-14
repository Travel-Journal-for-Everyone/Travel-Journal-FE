import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export function useMemberInfo() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["memberInfo", user?.memberId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/v1/members/${user!.memberId}`);
      return data;
    },
    enabled: !!user?.memberId,
    staleTime: 1000 * 60 * 5,
  });
}
