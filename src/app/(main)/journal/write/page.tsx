"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { TopBar } from "@/features/common/TopBar";

export default function WriteJournalPage() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 10 - images.length);
    setImages((prev) => [...prev, ...fileArray]);
  };

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <TopBar title="여행 일지 작성하기" center />

      <form className="space-y-6">
        {/* 이미지 업로더 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            여행 사진 추가
          </label>
          <div className="grid grid-cols-5 gap-2">
            {images.length < 10 && (
              <label
                htmlFor="image-upload"
                className="aspect-square flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200"
              >
                <Plus className="w-6 h-6 text-gray-500" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {images.map((file, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`uploaded-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="block mt-2 text-sm text-gray-600">
            {images.length}장 / 10장
          </span>
        </div>

        {/* 장소 & 날짜 */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 font-medium">장소</p>
          <input
            type="text"
            placeholder="예) 제주특별시"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm text-gray-500 font-medium ">일시</p>
          <input
            type="text"
            placeholder="예) 2025.02.08 ~ 2025.02.12"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* 제목/컨셉/내용 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="일지 제목을 입력하세요"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="나만의 해시태그를 입력하세요"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <textarea
            rows={4}
            placeholder="여행에서 느꼈던 나만의 색다른 경험을 작성해 보세요!"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold">1일차</h3>
          <p className="text-sm text-gray-500">
            1일차에 관련된 설명을 추가할 수 있습니다.
          </p>

          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
            (지도 컴포넌트 들어갈)
          </div>

          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>A. 하도해수욕장</li>
            <li>B. 김녕해변</li>
            <li>C. 제주 나도돌 테마파크</li>
            <li>D. 제주 워터돔</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
