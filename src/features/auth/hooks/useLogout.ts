import { deleteCookie } from "@/lib/cookieUtils";
import { apiEndpoint } from "@/app/shared/config/constants";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";

export async function logOut(deviceId: string) {
  const res = await axiosInstance.post(
    `${apiEndpoint}/v1/auth/logout?deviceId=${encodeURIComponent(deviceId)}`,
    FormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("deviceId");
  deleteCookie("memberId");

  return res.data as string;
}

export function useLogOut(): UseMutationResult<
  string, // ✅ 서버 응답 타입 (res.data)
  Error,
  string, // ✅ 변수(deviceId)
  unknown
> {
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      useAuthStore.getState().resetAuth();
    },
    onError: (err) => {
      console.error("❌ 로그아웃 실패:", err);
    },
  });
}
