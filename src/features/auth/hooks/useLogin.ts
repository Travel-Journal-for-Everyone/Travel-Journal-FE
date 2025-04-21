"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { googleLoginRequest, kakaoLoginRequest } from "@/services/auth";

interface KakaoLoginParams {
  code: string;
}

export function useLogin() {
  const router = useRouter();

  const kakaoLoginMutation = useMutation({
    mutationFn: ({ code }: KakaoLoginParams) => kakaoLoginRequest(code),
    onSuccess: (data) => {
      if (data.isFirstLogin) {
        router.push("/profile/setup");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("❌ 카카오 로그인 실패:", error);
    },
  });

  const login = (params: KakaoLoginParams) => {
    kakaoLoginMutation.mutate(params);
  };

  return { login, isLoading: kakaoLoginMutation.isPending };
}

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: googleLoginRequest,
  });
};
