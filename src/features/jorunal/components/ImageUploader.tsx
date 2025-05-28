"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function ImageUploader() {
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 10 - images.length);
    setImages((prev) => [...prev, ...fileArray]);
  };

  return (
    <div className="w-full">
      {/* 이미지 업로드 영역 */}
      <div className="grid grid-cols-5 gap-2">
        {/* + 버튼 */}
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
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {/* 업로드된 이미지 */}
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

      {/* 업로드 수 카운트 */}
      <span className="block mt-2 text-sm text-gray-600">
        {images.length}장 / 10장
      </span>
    </div>
  );
}
