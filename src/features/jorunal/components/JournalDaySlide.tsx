"use client";
import KakaoMap from "@/features/test/KakaoMap";
import { ImageMeta } from "../hooks/useCreateJournal";

interface DaySlideProps {
  dayNumber: number;
  dayDescription: string;
  setDayDescription: (value: string) => void;
  imagesWithMeta: ImageMeta[];
  isKakaoReady: boolean;
  setIsKakaoReady: (value: boolean) => void;
  isVisible: boolean;
}

export function JournalDaySlide({
  dayNumber,
  dayDescription,
  setDayDescription,
  imagesWithMeta,
  isKakaoReady,
}: DaySlideProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold">{dayNumber}일차</h3>
      <input
        type="text"
        placeholder={`${dayNumber}일차의 내용을 적어주세요`}
        value={dayDescription}
        onChange={(e) => setDayDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
      />

      {/* 지도 */}
      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm overflow-hidden">
        {isKakaoReady ? (
          <KakaoMap
            places={imagesWithMeta
              .filter((img) => img.lat && img.lng)
              .map((img, index) => ({
                id: `${dayNumber}-${index}`,
                lat: img.lat!,
                lng: img.lng!,
                name: img.keyword ?? `장소 ${index + 1}`,
              }))}
            visible={false}
          />
        ) : (
          <p className="text-center py-4 text-sm text-gray-500">지도를 불러오는 중...</p>
        )}
      </div>

      {/* 상세 리스트 */}
      <ul className="text-sm text-gray-700 pl-1 space-y-1">
        {imagesWithMeta.map((img, idx) => (
          <li key={idx} className="mb-1">
            {idx + 1}. {img.keyword}
            {img.address && <span className="block text-xs text-gray-500">주소: {img.address}</span>}
            {img.takenDateTime && <span className="block text-xs text-gray-500">촬영일시: {img.takenDateTime}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
