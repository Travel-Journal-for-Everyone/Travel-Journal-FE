// src/app/oauth/callback/kakao/KakaoCallbackHandler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLogin } from "@/app/features/auth/hooks/useLogin";

export default function KakaoCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useLogin();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("✅ Kakao Authorization Code:", code);
      login(code);
    } else {
      console.error("❌ 인가 코드 없음");
      router.push("/login");
    }
  }, [searchParams]);

  return null;
}
