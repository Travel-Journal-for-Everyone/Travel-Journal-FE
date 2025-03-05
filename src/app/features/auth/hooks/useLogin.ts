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
    mutationFn: kakaoLoginRequest,
    onSuccess: (data) => {
      setUser(data.user);
      router.push("/");
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
