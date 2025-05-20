"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { socialLoginCallbackRequest } from "@/services/socialLoginCallbackRequest";

export default function LoginCallbackClient({
  provider,
}: {
  provider: "google" | "kakao" | "apple";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    socialLoginCallbackRequest({ code, provider })
      .then((res) => {
        router.push(res.isFirstLogin ? "/profile/setup" : "/");
      })
      .catch((err) => {
        console.error("소셜 로그인 실패:", err);
        router.push("/login?error=social");
      });
  }, [searchParams]);

  return <div className="p-4">로그인 중입니다...</div>;
}
