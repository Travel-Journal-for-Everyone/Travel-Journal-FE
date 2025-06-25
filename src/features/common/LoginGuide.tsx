import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginGuide() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-6">
      <LogIn size={48} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">로그인이 필요해요</h2>
      <p className="text-gray-500 mb-6">
        지역 기반 여행일지를 확인하려면 먼저 로그인 해주세요.
      </p>
      <Link
        href="/login"
        className="px-6 py-2 rounded-full bg-primary-main text-white hover:brightness-110 transition"
      >
        로그인하러 가기
      </Link>
    </div>
  );
}
