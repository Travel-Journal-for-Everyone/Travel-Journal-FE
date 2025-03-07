"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-96">
      <div>
        <h1 className="text-2xl font-bold tex">
          <span className="text-black">{user?.nickname || "여행이"}님</span>{" "}
          가입 완료!
        </h1>
        <p className="text-2xl text-gray-600 mt-2">
          모두의 여행일지와 추억을 만들어 보아요!
        </p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-8 bg-purple-500 text-white px-6 py-3 rounded-lg"
      >
        여행 일지 작성하러 가기
      </button>
    </div>
  );
}
