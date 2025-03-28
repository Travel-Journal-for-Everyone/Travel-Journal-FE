"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

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
        className="flex items-center justify-center bg-yellow-400 p-3 rounded w-full"
      >
        <Image
          src="/sns/kakao.png"
          alt="카카오 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        카카오 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center bg-blue-500 text-white p-3 rounded w-full"
      >
        <Image
          src="/sns/google.png"
          alt="Google 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        Google 로그인
      </button>
      <button
        onClick={handleAppleLogin}
        className="flex items-center justify-center bg-black text-white p-3 rounded w-full"
      >
        <Image
          src="/sns/apple.png"
          alt="Apple 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        Apple 로그인
      </button>
    </div>
  );
}
