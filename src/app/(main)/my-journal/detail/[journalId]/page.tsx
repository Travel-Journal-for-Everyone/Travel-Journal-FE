"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart, MessageCircle, MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { TopBar } from "@/features/common/TopBar";
import { useJournalDetail } from "@/features/jorunal/hooks/useJournalDetail";
import { useEffect, useRef, useState } from "react";
import KakaoMap from "@/features/test/KakaoMap";
import { NavigationOptions } from "swiper/types";

export default function MyJournalPage() {
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const params = useParams<{ journalId: string }>();
  const journalId = Number(params.journalId);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const { data, isLoading, error } = useJournalDetail(journalId);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao?.maps) {
      setIsKakaoReady(true);
    }
  }, []);

  if (isLoading) return <div className="p-4">불러오는 중...</div>;
  if (error || !data) return <div className="p-4">데이터를 불러올 수 없습니다.</div>;

  const { title, startDate, endDate, region, hashTag, journalDays, photoList } = data;

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

      {/* 일차별 로그 */}
      {photoList.length > 0 && (
        <div className="relative my-4">
          <button
            ref={prevRef}
            className="absolute z-10 top-1/2 left-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            ref={nextRef}
            className="absolute z-10 top-1/2 right-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation as NavigationOptions | undefined;
              if (nav) {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            className="w-full aspect-video rounded overflow-hidden"
          >
            {photoList
              .sort((a, b) => {
                if (a.dayNumber === b.dayNumber) {
                  return a.photoOrder - b.photoOrder;
                }
                return a.dayNumber - b.dayNumber;
              })
              .map((photo) => {
                const day = journalDays.find((d) => d.dayNumber === photo.dayNumber);
                const matchedSpot = day?.journalDaySpots.find((spot) => spot.spotOrder === photo.daySpotOrder);

                return (
                  <SwiperSlide key={photo.uploadId}>
                    <Image
                      src={photo.photoUrl}
                      alt={matchedSpot?.spotName || "여행 사진"}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
      <Swiper
        modules={[Navigation, Pagination]}
        allowTouchMove={false}
        navigation
        pagination={{ clickable: true }}
        className="mb-8"
      >
        {journalDays.map((day) => {
          const dayPlaces = day.journalDaySpots.map((spot) => ({
            id: `${day.dayNumber}-${spot.spotOrder}`,
            name: spot.spotName,
            lat: spot.latitude,
            lng: spot.longitude,
          }));

          return (
            <SwiperSlide key={day.dayNumber}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-semibold">{day.dayNumber}일차</h3>
                <span className="text-gray-400 text-sm">{day.description}</span>

                {/* 지도 */}
                {dayPlaces.length > 0 && (
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                    {isKakaoReady ? (
                      <KakaoMap places={dayPlaces} visible={true} />
                    ) : (
                      <p className="text-center py-4 text-sm text-gray-500">지도를 불러오는 중...</p>
                    )}
                  </div>
                )}

                {/* 방문 장소 리스트 */}
                <ul className="text-sm text-gray-700 pl-1 space-y-1">
                  {day.journalDaySpots.map((spot) => (
                    <li key={spot.spotOrder} className="mb-1">
                      {String.fromCharCode(65 + (spot.spotOrder - 1))}. {spot.spotName}
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 좋아요/댓글 */}
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
