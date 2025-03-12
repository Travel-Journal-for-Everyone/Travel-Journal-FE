// src/app/oauth/callback/kakao/page.tsx
"use client";

import { Suspense } from "react";
import KakaoCallbackHandler from "./kakaoCallbackHandler";

export default function KakaoCallback() {
  return (
    <Suspense fallback={<p>로그인 중...</p>}>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
