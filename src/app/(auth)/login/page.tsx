// src/app/(auth)/page.tsx
import LoginForm from "@/app/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
