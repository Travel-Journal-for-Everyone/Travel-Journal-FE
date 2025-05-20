import { Suspense } from "react";
import LoginCallbackClient from "@/features/auth/components/LoginCallbackCleint";

export default async function LoginCallbackPage({
  params,
}: {
  params: Promise<{ provider: "google" | "kakao" | "apple" }>;
}) {
  const { provider } = await params;

  return (
    <Suspense fallback={<div>로그인 처리 중입니다...</div>}>
      <LoginCallbackClient provider={provider} />
    </Suspense>
  );
}
