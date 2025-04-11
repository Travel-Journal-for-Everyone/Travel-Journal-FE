"use client";

import SocialLogin from "../components/SocialLogin";

export default function LoginForm() {
  return (
    <div className="w-full max-w-lg p-6 flex flex-col items-center gap-y-36">
      <h2 className="text-2xl mb-6 w-full font-medium">
        <span className="bg-purple-300 p-0.5 font-bold">모두의 여행 일지</span>
        와 함께
        <br /> 나만의 여행 일지를 만들어 보세요!
      </h2>
      <div className="w-full text-center">
        <p className="text-gray-500 text-sm mb-4">로그인/회원가입</p>
        <SocialLogin />
      </div>
    </div>
  );
}
