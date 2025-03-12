"use client";

import { signIn } from "next-auth/react";

export default function SocialLogin() {
  const handleKakaoLogin = async () => {
    try {
      console.log("🟡 Kakao Login 버튼 클릭됨");
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("🔵 Google Login 버튼 클릭됨");
      await signIn("google");
    } catch (error) {
      console.error("Google 로그인 오류:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      console.log("⚫ Apple Login 버튼 클릭됨");
      await signIn("apple");
    } catch (error) {
      console.error("Apple 로그인 오류:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={handleKakaoLogin}
        className="bg-yellow-400 p-3 rounded w-full"
      >
        🟡 카카오 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white p-3 rounded w-full"
      >
        🔵 Google 로그인
      </button>
      <button
        onClick={handleAppleLogin}
        className="bg-black text-white p-3 rounded w-full"
      >
        ⚫ Apple 로그인
      </button>
    </div>
  );
}
