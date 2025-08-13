"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/features/common/TopBar";
import ImageUploaderModal from "@/features/jorunal/components/ImageUploader";
import Image from "next/image";
import { useJournalSubmit } from "@/features/jorunal/hooks/useCreateJournal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { JournalDaySlide } from "@/features/jorunal/components/JournalDaySlide";
import type { ImageMeta } from "@/types/journal";

export default function WriteJournalPage() {
  const [showUploaderModal, setShowUploaderModal] = useState(false);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [imagesWithMeta, setImagesWithMeta] = useState<ImageMeta[]>([]);
  const [groupedImages, setGroupedImages] = useState<Record<number, typeof imagesWithMeta>>({});
  const [dayDescriptions, setDayDescriptions] = useState<Record<number, string>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!startDate || imagesWithMeta.length === 0) return;

    const start = new Date(startDate);
    const grouped: Record<number, typeof imagesWithMeta> = {};

    imagesWithMeta.forEach((img) => {
      if (!img.takenDateTime) return;

      const [datePart] = img.takenDateTime.split(" ");
      const takenDate = new Date(datePart.replace(/\./g, "-"));
      const day = Math.floor((+takenDate - +start) / (1000 * 60 * 60 * 24)) + 1;

      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(img);
    });

    setGroupedImages(grouped);
  }, [imagesWithMeta]);

  // 📌 form 상태
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [hashTagInput, setHashTagInput] = useState(""); // 쉼표로 분리
  const [description, setDescription] = useState("");

  const { submitJournal } = useJournalSubmit();

  const handleSave = async () => {
    try {
      // 1. 일차별 구조화

      const result = await submitJournal(groupedImages, dayDescriptions, {
        startDate,
        endDate,
        region,
        title,
        hashTag: hashTagInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        description,
      });
      alert(`✅ 여행일지 저장 완료! (ID: ${result.journal_id})`);
      window.location.href = "/my-journal";
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto pb-20">
      <TopBar title="여행 일지 작성하기" center />
      <ImageUploaderModal
        isOpen={showUploaderModal}
        onClose={() => setShowUploaderModal(false)}
        onSave={(images) => {
          setImagesWithMeta(images.filter((img): img is ImageMeta => img.file !== null));

          // 1. 날짜 설정
          const validDates = images
            .map((img) => img.takenDateTime?.split(" ")[0])
            .filter((date): date is string => Boolean(date));

          if (validDates.length > 0) {
            const sorted = validDates.sort(); // 문자열 기반이지만 yyyy.mm.dd 형식이면 정렬 OK
            const formattedStart = sorted[0].replace(/\./g, "-"); // 2025.07.01 → 2025-07-01
            const formattedEnd = sorted[sorted.length - 1].replace(/\./g, "-");
            setStartDate(formattedStart);
            setEndDate(formattedEnd);
          }

          // 2. 장소 자동 추출
          const validAddresses = images.map((img) => img.address).filter((addr): addr is string => Boolean(addr));
          if (validAddresses.length) {
            const first = validAddresses[0];
            const regionMatch = first.match(
              /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)/
            );
            if (regionMatch) {
              setRegion(regionMatch[0]);
            }
          }

          // 3. 제목 추천 (선택)
          const suggestedTitle = `나의 ${region} 여행`;
          setTitle(suggestedTitle);
        }}
      />
      <form className="space-y-6">
        {/* 이미지 미리보기 */}
        {imagesWithMeta.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-2">
            {imagesWithMeta.map((img, index) => (
              <div key={index} className="aspect-square border rounded-lg overflow-hidden relative">
                <Image src={URL.createObjectURL(img.file)} alt="uploaded" fill className="object-cover" />
                <div className="absolute bottom-1 left-1 bg-white/70 text-xs rounded p-1 space-y-0.5">
                  {img.keyword && <p>{img.keyword}</p>}
                  {img.lat && <p>위도: {img.lat.toFixed(5)}</p>}
                  {img.lng && <p>경도: {img.lng.toFixed(5)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 사진 업로드 버튼 */}
        <button
          type="button"
          onClick={() => setShowUploaderModal(true)}
          className="bg-purple-500 text-white px-3 py-2 rounded mb-4 w-full"
        >
          {imagesWithMeta.length === 0 ? "사진 업로드" : "사진 리스트 수정하기"}
        </button>

        {/* 기본 정보 입력 */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 font-medium">장소</p>
          <input
            type="text"
            placeholder="예) 제주특별시"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 font-medium mb-1">시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 font-medium mb-1">종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
        {/* 제목, 해시태그, 경험 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="일지 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="나만의 해시태그를 입력하세요 (쉼표로 구분)"
            value={hashTagInput}
            onChange={(e) => setHashTagInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <textarea
            rows={4}
            placeholder="여행에서 느꼈던 나만의 색다른 경험을 작성해 보세요!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* 지도 및 주소/촬영일시 리스트 */}

        <Swiper
          modules={[Navigation, Pagination]}
          allowTouchMove={false}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {Object.entries(groupedImages).map(([dayStr, images], idx) => {
            const day = Number(dayStr);

            return (
              <SwiperSlide key={day}>
                <JournalDaySlide
                  key={day}
                  dayNumber={day}
                  dayDescription={dayDescriptions[day] || ""}
                  setDayDescription={(desc) => setDayDescriptions((prev) => ({ ...prev, [day]: desc }))}
                  imagesWithMeta={images}
                  isKakaoReady={isKakaoReady}
                  setIsKakaoReady={setIsKakaoReady}
                  isVisible={activeIndex === idx}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </form>
      <button type="button" onClick={handleSave} className="bg-purple-600 text-white w-full py-2 rounded mt-4">
        여행일지 저장하기
      </button>
    </div>
  );
}
