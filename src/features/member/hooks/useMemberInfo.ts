import { useQuery } from "@tanstack/react-query";
import { apiEndpoint } from "@/app/shared/config/constants";
import { useAuthStore } from "@/store/useAuthStore";

export function useMemberInfo() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["memberInfo", user?.memberId],
    queryFn: async () => {
      const res = await fetch(`${apiEndpoint}/v1/members/${user!.memberId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("회원 정보 조회 실패");
      }

      return res.json();
    },
    enabled: !!user?.memberId && !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}
