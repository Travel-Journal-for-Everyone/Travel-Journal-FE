"use client";

import Image from "next/image";
import { getOAuthUrl } from "@/utils/getOAuthUrl";

export default function SocialLogin() {
  const handleLogin = (provider: "kakao" | "google" | "apple") => {
    const url = getOAuthUrl(provider);
    window.location.href = url;
  };

  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => handleLogin("kakao")}
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
        onClick={() => handleLogin("google")}
        className="flex items-center justify-center bg-white text-black border p-3 rounded w-full"
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
      {/* 
      <button
        onClick={() => handleLogin("apple")}
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
      </button> */}
    </div>
  );
}
