"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/features/common/TopBar";
import Script from "next/script";
import KakaoMap from "@/features/test/KakaoMap";
import { KAKAO_MAP_API } from "@/app/constants/kakao";
import ImageUploaderModal from "@/features/jorunal/components/ImageUploader";

import Image from "next/image";

export default function WriteJournalPage() {
  const [showUploaderModal, setShowUploaderModal] = useState(false);
  const [imagesWithMeta, setImagesWithMeta] = useState<
    { file: File; lat?: number; lng?: number; keyword?: string }[]
  >([]);
  const [locationNames, setLocationNames] = useState<string[]>([]);

  useEffect(() => {
    // keyword를 locationNames로 동기화
    const updatedNames = imagesWithMeta.map((img) =>
      img.keyword && img.keyword !== "위치명 없음" ? img.keyword : "위치명 없음"
    );
    setLocationNames(updatedNames);
  }, [imagesWithMeta]);

  return (
    <div className="max-w-screen-sm mx-auto">
      <TopBar title="여행 일지 작성하기" center />

      <ImageUploaderModal
        isOpen={showUploaderModal}
        onClose={() => setShowUploaderModal(false)}
        onSave={(images) => setImagesWithMeta(images)}
      />

      <form className="space-y-6">
        {imagesWithMeta.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-2">
            {imagesWithMeta.map((img, index) => (
              <div
                key={index}
                className="aspect-square border rounded-lg overflow-hidden relative"
              >
                <Image
                  src={URL.createObjectURL(img.file)}
                  alt="uploaded"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-white/70 text-xs rounded p-1 space-y-0.5">
                  {img.keyword && <p>{img.keyword}</p>}
                  {img.lat && <p>위도: {img.lat.toFixed(5)}</p>}
                  {img.lng && <p>경도: {img.lng.toFixed(5)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowUploaderModal(true)}
          className="bg-purple-500 text-white px-3 py-2 rounded mb-4 w-full"
        >
          {imagesWithMeta.length === 0 ? "사진 업로드" : "사진 리스트 수정하기"}
        </button>

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
          <input
            type="text"
            placeholder="1일차의 내용을 적어주세요"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />

          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm overflow-hidden">
            <Script src={KAKAO_MAP_API} strategy="beforeInteractive" />

            <KakaoMap
              places={imagesWithMeta
                .filter((img) => img.lat && img.lng)
                .map((img, index) => ({
                  id: index.toString(),
                  lat: img.lat!,
                  lng: img.lng!,
                  name: img.keyword ?? `장소 ${index + 1}`,
                }))}
            />
          </div>
          <ul className="text-sm text-gray-700 pl-1 space-y-1">
            {locationNames.map((name, idx) => (
              <li key={idx}>
                {idx + 1}. {name}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
