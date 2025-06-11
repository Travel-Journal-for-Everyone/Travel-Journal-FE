"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { extractLatLng } from "@/lib/extractLatLng";
import { getLocationNameAsync, searchPlace } from "@/services/geoLoactionName";

interface ImageMeta {
  file: File;
  lat?: number;
  lng?: number;
  keyword?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (images: ImageMeta[]) => void;
}

export default function ImageUploaderModal({ isOpen, onClose, onSave }: Props) {
  const [imagesWithMeta, setImagesWithMeta] = useState<ImageMeta[]>([]);
  const [tempKeywords, setTempKeywords] = useState<{ [key: number]: string }>(
    {}
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const updatedImages = await Promise.all(
      fileArray.map(async (file) => {
        const { lat, lng } = await extractLatLng(file);

        let locationName = "";
        if (lat && lng) {
          locationName = await getLocationNameAsync(lat, lng);
        }

        return { file, lat, lng, keyword: locationName };
      })
    );

    setImagesWithMeta((prev) => [...prev, ...updatedImages]);
  };

  const handleSave = () => {
    const hasEmptyKeyword = imagesWithMeta.some(
      (img) => !img.keyword || img.keyword === "위치명 없음"
    );

    if (hasEmptyKeyword) {
      alert(
        "위치명이 없는 사진이 있습니다. 모든 사진에 위치명을 입력해주세요."
      );
      return;
    }

    onSave(imagesWithMeta);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-[600px] w-full min-h-screen flex flex-col">
        <h3 className="font-semibold text-lg text-center pb-4">
          여행 사진 업로드
        </h3>

        <div className="grid grid-cols-4 gap-2">
          {/* 이미지 추가 버튼 */}
          <label className="aspect-square border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200">
            <Plus className="w-6 h-6 text-gray-500" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* 이미지 미리보기 */}
          {imagesWithMeta.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square border rounded-lg overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(img.file)}
                alt="uploaded"
                fill
                className="object-cover"
              />

              {/* 좌측 상단 번호 */}
              <div className="absolute top-1 left-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {index + 1}
              </div>

              {/* 삭제 버튼 */}
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/60 text-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => {
                  setImagesWithMeta((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* 사진 없을 때 안내문구 */}
        {imagesWithMeta.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            사진을 추가해주세요.
          </div>
        )}

        {/* 위치명 입력 및 지정 완료 */}
        {imagesWithMeta.length > 0 && (
          <ul className="mt-12 text-gray-700 pl-2 space-y-2">
            {imagesWithMeta.map((img, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span>{idx + 1}.</span>
                {img.keyword && img.keyword !== "위치명 없음" ? (
                  <span>{img.keyword}</span>
                ) : (
                  <>
                    <div className="relative flex items-center flex-1 border rounded border-gray-200 focus-within:border-purple-500">
                      <span className="text-red-500">❗</span>
                      <input
                        type="text"
                        placeholder="위치명을 입력해주세요"
                        className="bg-transparent focus:outline-none py-0.5 flex-1"
                        value={tempKeywords[idx] || ""}
                        onChange={(e) => {
                          const keyword = e.target.value;
                          setTempKeywords((prev) => ({
                            ...prev,
                            [idx]: keyword,
                          }));
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      className="bg-purple-500 text-white px-1 py-0.5 rounded"
                      onClick={() => {
                        const keyword = tempKeywords[idx];
                        if (!keyword) return;

                        searchPlace(keyword, (lat, lng) => {
                          setImagesWithMeta((prev) =>
                            prev.map((image, i) =>
                              i === idx
                                ? { ...image, keyword, lat, lng }
                                : image
                            )
                          );
                        });

                        setTempKeywords((prev) => {
                          const newTemp = { ...prev };
                          delete newTemp[idx];
                          return newTemp;
                        });
                      }}
                    >
                      위치 저장
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 하단 버튼 */}
        <div className="flex mt-auto gap-2">
          <button
            onClick={onClose}
            className="text-gray-500 text-sm flex-1 rounded bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-500 text-white text-sm px-3 py-2 rounded flex-1"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
