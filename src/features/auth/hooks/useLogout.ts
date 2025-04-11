import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiEndpoint } from "@/app/shared/config/constants";
import { useAuthStore } from "@/store/useAuthStore";

export async function logOut(deviceId: string) {
  const accessToken = useAuthStore.getState().accessToken;

  const res = await fetch(
    `${apiEndpoint}/v1/auth/logout?deviceId=${encodeURIComponent(deviceId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = await res.text();
  if (!res.ok) {
    throw new Error("로그아웃 실패");
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLogOut(): UseMutationResult<any, Error, string, unknown> {
  return useMutation({
    mutationFn: (deviceId: string) => logOut(deviceId),
    onSuccess: () => {
      useAuthStore.getState().resetAuth(); // 상태 초기화
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
}
