"use client";

import { Suspense } from "react";
import KakaoCallbackHandler from "@/features/auth/hooks/kakaoCallbackHandler";

export default function KakaoCallback() {
  return (
    <Suspense fallback={<p>로그인 중...</p>}>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
