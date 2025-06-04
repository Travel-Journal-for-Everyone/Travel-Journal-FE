"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/features/common/TopBar";
import { extractLatLng } from "@/lib/extractLatLng";
import { getLocationName } from "@/services/geoLoactionName";

import ImageUploader from "@/features/jorunal/components/ImageUploader";
import LocationMapSection from "@/features/jorunal/components/LoactionSection";

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

        <LocationMapSection
          imagesWithMeta={imagesWithMeta}
          locationNames={locationNames}
        />
      </form>
    </div>
  );
}
