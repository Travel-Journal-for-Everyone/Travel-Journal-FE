import { Suspense } from "react";
import LoginCallbackClient from "@/features/auth/components/LoginCallbackCleint";

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중입니다...</div>}>
      <LoginCallbackClient />
    </Suspense>
  );
}
