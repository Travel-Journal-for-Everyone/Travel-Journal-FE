"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLogin } from "./useLogin";

export default function KakaoCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useLogin();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      login({ code }); // ✅ 이제 idToken 필요 없음
    } else {
      console.error("❌ 인가 코드 없음");
      router.push("/login");
    }
  }, [searchParams]);

  return null;
}
