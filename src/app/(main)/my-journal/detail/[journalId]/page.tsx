"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart, MessageCircle, MapPin, CalendarDays } from "lucide-react";
import { TopBar } from "@/features/common/TopBar";
import { useJournalDetail } from "@/features/jorunal/hooks/useJournalDetail";

export default function MyJournalPage() {
  const params = useParams<{ journalId: string }>();
  const journalId = Number(params.journalId); // ✅ 정확함

  // 이하 생략
  const { data, isLoading, error } = useJournalDetail(journalId);

  if (isLoading) return <div className="p-4">불러오는 중...</div>;
  if (error || !data) return <div className="p-4">데이터를 불러올 수 없습니다.</div>;

  const { title, startDate, endDate, region, hashTag, description, journalDays, photoList } = data!;
  const coverImage = photoList.find((p) => p.dayNumber === 1)?.photoUrl;

  return (
    <div className="max-w-screen-md mx-auto pt-8 pb-20 px-4">
      <TopBar title="나의 여행 일지" backTo="/my-journal" center />

      {/* 해시태그 + 제목 + 장소 + 날짜 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {hashTag.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-xs bg-primary-light text-primary-main px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {region}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <CalendarDays className="w-4 h-4 mr-1" />
          {startDate} - {endDate}
        </div>
      </div>

      {/* 커버 이미지 */}
      {coverImage && (
        <div className="rounded overflow-hidden mb-4">
          <Image src={coverImage} alt="대표 이미지" width={800} height={600} className="rounded w-full object-cover" />
        </div>
      )}

      {/* 일지 본문 */}
      <div className="text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">{description}</div>

      {/* 일차별 로그 */}
      {journalDays.map((day) => {
        const dayPhotos = photoList.filter((p) => p.dayNumber === day.dayNumber);

        return (
          <div key={day.dayNumber} className="bg-gray-100 rounded mb-6">
            <div className="p-6">
              <h3 className="font-semibold">{day.dayNumber}일차</h3>
              <span className="text-gray-400 text-sm">{day.description}</span>
            </div>

            {dayPhotos.length > 0 && (
              <Swiper className="w-full aspect-square rounded overflow-hidden">
                {dayPhotos.map((photo) => (
                  <SwiperSlide key={photo.uploadId}>
                    <Image src={photo.photoUrl} alt={`Day ${day.dayNumber} 이미지`} fill className="object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <ul className="text-gray-500 flex flex-col gap-4 px-6 py-4">
              {day.journalDaySpots.map((spot) => (
                <li key={spot.spotOrder}>
                  {String.fromCharCode(65 + (spot.spotOrder - 1))}. {spot.spotName}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> <span>0</span>
        </div>
      </div>
    </div>
  );
}
