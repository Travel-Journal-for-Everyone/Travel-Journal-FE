// src/features/auth/services/auth.ts
import { apiEndpoint } from "@/app/shared/constants";

export async function kakaoLoginRequest(code: string) {
  const res = await fetch(
    `${apiEndpoint}/v1/auth/kakao/callback?code=${code}`,
    {
      method: "GET", // ✅ `GET` 요청으로 변경
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("카카오 로그인 실패");
  }

  return res.json();
}
