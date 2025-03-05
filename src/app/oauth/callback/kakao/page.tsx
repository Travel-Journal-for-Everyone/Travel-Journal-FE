// src/app/oauth/callback/kakao/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLogin } from "@/app/features/auth/hooks/useLogin";

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useLogin(); // ✅ React Query를 활용한 로그인 훅

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("✅ Kakao Authorization Code:", code);
      login(code); // ✅ REST API 방식으로 로그인 처리
    } else {
      console.error("❌ 인가 코드 없음");
      router.push("/login");
    }
  }, [searchParams]);

  return <p>로그인 중...</p>;
}
