// components/ImageUploader.tsx
import Image from "next/image";
import { Plus } from "lucide-react";
import { searchPlace } from "@/services/SearchPlace";

interface Props {
  imagesWithMeta: {
    file: File;
    lat?: number;
    lng?: number;
    keyword?: string;
  }[];
  setImagesWithMeta: React.Dispatch<
    React.SetStateAction<
      { file: File; lat?: number; lng?: number; keyword?: string }[]
    >
  >;
  setLocationNames: React.Dispatch<React.SetStateAction<string[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({
  imagesWithMeta,
  setImagesWithMeta,
  setLocationNames,
  handleImageChange,
}: Props) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        여행 사진 추가
      </label>
      <div className="grid grid-cols-5 gap-2">
        {imagesWithMeta.length < 10 && (
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

        {imagesWithMeta.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-300"
          >
            <Image
              src={URL.createObjectURL(img.file)}
              alt={`uploaded-${index}`}
              fill
              className="object-cover"
            />

            {/* 위도/경도 없으면: 위치 키워드 입력 */}
            {!img.lat && (
              <input
                type="text"
                placeholder="위치 키워드 입력"
                className="absolute bottom-1 left-1 w-[calc(100%-0.5rem)] bg-white/70 text-xs rounded p-1"
                onBlur={(e) => {
                  const keyword = e.target.value;
                  if (!keyword) return;

                  searchPlace(keyword, (lat, lng) => {
                    // ✅ 이미지 메타데이터 갱신
                    setImagesWithMeta((prev) =>
                      prev.map((image, i) =>
                        i === index ? { ...image, lat, lng, keyword } : image
                      )
                    );

                    // ✅ 위치명 리스트 갱신
                    setLocationNames((prev) => {
                      const newNames = [...prev];
                      newNames[index] = keyword;
                      return newNames;
                    });
                  });
                }}
              />
            )}

            {img.lat && img.lng && (
              <div className="absolute bottom-1 left-1 bg-white/70 text-xs rounded p-1">
                <p>위도: {img.lat.toFixed(5)}</p>
                <p>경도: {img.lng.toFixed(5)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <span className="block mt-2 text-sm text-gray-600">
        {imagesWithMeta.length}장 / 10장
      </span>
    </div>
  );
}
