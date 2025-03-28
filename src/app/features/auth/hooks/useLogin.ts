"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { kakaoLoginRequest } from "@/services/auth";

export function useLogin() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: kakaoLoginRequest, // ✅ 로그인 API 요청
    onSuccess: (data) => {
      if (data.isFirstLogin) {
        router.push("/profile/setup");
      } else {
        router.push("/"); // ✅ 일반 로그인: 홈으로 이동
      }
    },
    onError: (error) => {
      console.error("❌ 로그인 실패:", error);
    },
  });

  const login = async (code: string) => {
    loginMutation.mutate(code);
  };

  return { login, isLoading: loginMutation.isPending };
}
