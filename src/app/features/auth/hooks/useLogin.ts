// src/features/auth/hooks/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { kakaoLoginRequest } from "../services/auth";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: kakaoLoginRequest, // ✅ 로그인 API 요청
    onSuccess: (data) => {
      setUser(data.user); // ✅ 로그인 성공 후 유저 상태 저장
      if (data.isFirstLogin) {
        router.push("/profile/setup"); // ✅ 첫 로그인이라면 프로필 작성 페이지로 이동
      } else {
        router.push("/"); // ✅ 첫 로그인이 아니면 홈으로 이동
      }
    },
    onError: (error) => {
      console.error("❌ 로그인 실패:", error);
    },
  });

  const login = async (code: string) => {
    loginMutation.mutate(code); // ✅ REST API로 로그인 요청
  };

  return { login, isLoading: loginMutation.isPending };
}
