"use client";

import Image from "next/image";
import { Heart, MessageCircle, MapPin, CalendarDays } from "lucide-react";

import { TopBar } from "@/features/common/TopBar";
const hashTag = ["부산", "테스트"];

export default function MyJournalPage() {
  return (
    <div className="max-w-screen-md mx-auto pt-8 pb-20">
      <span>테스트용 dummy 페이지 입니다.</span>
      <TopBar title="나의 여행 일지" backTo="/" center />

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {hashTag.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-primary-light text-primary-main px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold">
          바다만 주구장창 보았던 부산 여행 🌊
        </h2>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          부산광역시 남구 용호동 이기대공원길 105-20
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <CalendarDays className="w-4 h-4 mr-1" />
          2025.02.06 - 2025.02.09
        </div>
      </div>

      <div className="rounded overflow-hidden mb-4">
        <Image
          src="/testing/busan.png"
          alt="부산 바다 이미지"
          width={800}
          height={600}
          className="rounded w-full object-cover"
        />
      </div>

      <div className=" text-gray-800 leading-relaxed mb-6">
        3박 4일 동안 지루하지도 않게 진짜 제대로 놀다 왔다! 바다도 좋고, 먹을
        것도 좋고, 고마운 일정과 날씨 덕분에 하루하루 행복했다 🥹 아침 일찍
        일어나 부지런히 돌아다녔고, 결과물도 만족스러워서 기분 좋은 여행이었다!
      </div>

      <div className="bg-gray-100 rounded mb-6">
        <div className="p-6">
          <h3 className="font-semibold">1일차</h3>
          <span className="text-gray-400 text-sm">1일차 설명영역입니다.</span>
        </div>
        <div className="relative max-h-[300px] w-full aspect-square">
          <Image
            src="/testing/placeholder.png"
            alt="1일차 지도 경로"
            fill
            className="rounded"
          />
        </div>
        <ul className="text-gray-500 flex flex-col gap-4 px-6 py-4">
          <li>A. 해운대 해수욕장</li>
          <li>B. 이기대해안산책로 전망대</li>
          <li>C. 카페 & 베이커리</li>
          <li>D. 저녁 식당</li>
        </ul>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> <span>20</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> <span>8</span>
        </div>
      </div>
    </div>
  );
}
