"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { socialLoginCallbackRequest } from "@/services/socialLoginCallbackRequest";

export default function LoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams) return;

    const code = searchParams.get("code");
    // const provider = searchParams.get("provider") as "google";
    const provider = "google";

    if (code && provider) {
      socialLoginCallbackRequest({ code, provider })
        .then((res) => {
          if (res.isFirstLogin) {
            router.push("/profile/setup");
          } else {
            router.push("/");
          }
        })
        .catch((err) => {
          console.error("소셜 로그인 실패:", err);
          router.push("/login?error=social");
        });
    }
  }, [searchParams]);

  return <div className="p-4">로그인 중입니다...</div>;
}
