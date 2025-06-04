"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/features/common/TopBar";
import { extractLatLng } from "@/lib/extractLatLng";
import { getLocationName } from "@/services/geoLoactionName";
import ImageUploader from "@/features/jorunal/components/ImageUploader";
import Script from "next/script";
import KakaoMapstest from "@/features/test/kakaoMapstest";
export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`;

export default function WriteJournalPage() {
  const [imagesWithMeta, setImagesWithMeta] = useState<
    { file: File; lat?: number; lng?: number; keyword?: string }[]
  >([]);
  const [locationNames, setLocationNames] = useState<string[]>([]);

  useEffect(() => {
    imagesWithMeta.forEach((img, idx) => {
      if (img.lat && img.lng) {
        getLocationName(img.lat, img.lng, (name) => {
          setLocationNames((prev) => {
            const newNames = [...prev];
            newNames[idx] = name;
            return newNames;
          });
        });
      }
    });
  }, [imagesWithMeta]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 10 - imagesWithMeta.length);

    const updatedImages = await Promise.all(
      fileArray.map(async (file) => {
        const { lat, lng } = await extractLatLng(file);
        return { file, lat, lng };
      })
    );

    setImagesWithMeta((prev) => [...prev, ...updatedImages]);
  };

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <TopBar title="여행 일지 작성하기" center />

      <form className="space-y-6">
        <ImageUploader
          imagesWithMeta={imagesWithMeta}
          setImagesWithMeta={setImagesWithMeta}
          setLocationNames={setLocationNames} // ✅ 전달!
          handleImageChange={handleImageChange}
        />

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
            <Script src={API} strategy="beforeInteractive" />

            <KakaoMapstest
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
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {locationNames.map((name, idx) => (
              <li key={idx}>
                {String.fromCharCode(65 + idx)}. {name}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
