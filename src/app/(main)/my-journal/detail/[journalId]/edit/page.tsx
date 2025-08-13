"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useJournalDetail } from "@/features/jorunal/hooks/useJournalDetail";
import { TopBar } from "@/features/common/TopBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import KakaoMap from "@/features/test/KakaoMap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageUploaderModal from "@/features/jorunal/components/ImageUploader";
import Image from "next/image";
import { useJournalPhotos } from "@/features/jorunal/hooks/useJournalPhotos";
import { buildUpdateJournalPayloadEdit } from "@/utils/buildUpdateJournalPayload";
import { useUpdateJournal } from "@/features/jorunal/hooks/useUpdateJournal";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function EditJournalPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { journalId } = useParams<{ journalId: string }>();
  const { mutateAsync, isPending } = useUpdateJournal(Number(journalId));
  const [isDirty, setIsDirty] = useState(false);
  const { data, isLoading } = useJournalDetail(Number(journalId), {
    enabled: !isDirty && !!journalId,
    // 필요 시 override 가능
    // placeholderData: keepPreviousData,
  });
  const { data: photoList } = useJournalPhotos(Number(journalId), {
    enabled: !isDirty && !!journalId,
  });
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [hashTagInput, setHashTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [showUploaderModal, setShowUploaderModal] = useState(false);
  const [imagesWithMeta, setImagesWithMeta] = useState<
    {
      file: File | null;
      lat?: number;
      lng?: number;
      keyword?: string;
      address?: string;
      takenDateTime: string;
      photoUrl?: string;
      uploadId?: string;
    }[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setGroupedImages] = useState<Record<number, any[]>>({});
  const [, setDayDescriptions] = useState<Record<number, string>>({});
  const [, setDayEditList] = useState<
    {
      dayNumber: number;
      description: string;
      images: {
        file: File | null;
        uploadId: string;
        takenDateTime?: string;
        lat?: number;
        lng?: number;
        address?: string;
        keyword?: string;
        dayNumber: number;
      }[];
      spots: {
        spotName: string;
        lat: number;
        lng: number;
        order: number;
      }[];
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao?.maps) {
      setIsKakaoReady(true);
    }
    if (!data || !photoList) return;
    if (isDirty) return;

    const normalizeDate = (dateStr: string) => dateStr.replace(/\./g, "-");
    const { title, startDate, endDate, region, hashTag, journalDays } = data;

    // ✅ 일차별 이미지 리스트 매핑
    const grouped: Record<number, typeof photoList> = {};
    photoList.forEach((img) => {
      if (!img.dayNumber) return;
      if (!grouped[img.dayNumber]) grouped[img.dayNumber] = [];
      grouped[img.dayNumber].push(img);
    });
    setGroupedImages(grouped);

    const merged = photoList.map((img) => ({
      file: null,
      uploadId: img.uploadId,
      photoUrl: img.photoUrl,
      takenDateTime: img.takenDateTime ?? "",
      lat: img.latitude,
      lng: img.longitude,
      address: img.address,
      keyword: img.description ?? img.address ?? "",
      dayNumber: img.dayNumber,
    }));

    setImagesWithMeta(merged);

    // ✅ 일차별 설명
    const descriptionMap: Record<number, string> = {};
    journalDays.forEach((d) => {
      descriptionMap[d.dayNumber] = d.description;
    });
    setDayDescriptions(descriptionMap);

    // ✅ 수정용 리스트 생성 (spot + image 조합)
    const dayEditList = journalDays.map((day) => {
      const spots = day.journalDaySpots.map((spot) => ({
        spotName: spot.spotName,
        lat: spot.latitude,
        lng: spot.longitude,
        order: spot.spotOrder,
      }));

      const images = (grouped[day.dayNumber] ?? []).map((img) => ({
        file: null,
        uploadId: img.uploadId,
        takenDateTime: img.takenDateTime,
        lat: img.latitude,
        lng: img.longitude,
        address: img.address,
        keyword: img.description ?? img.address ?? "",
        dayNumber: img.dayNumber,
        photoUrl: img.photoUrl,
      }));

      return {
        dayNumber: day.dayNumber,
        description: day.description,
        images,
        spots,
      };
    });

    setDayEditList(dayEditList);

    // ✅ 기타 정보 설정
    setRegion(region || "");
    setStartDate(normalizeDate(startDate));
    setEndDate(normalizeDate(endDate));
    setTitle(title || "");
    setHashTagInput((hashTag || []).join(", "));
    setDescription(data.description || "");
  }, [data, photoList, isDirty]);

  if (isLoading) return <p className="p-4">불러오는 중...</p>;
  if (!data) return <p className="p-4">데이터가 없습니다</p>;

  const handleSave = async () => {
    if (!data) return;

    const payload = buildUpdateJournalPayloadEdit({
      region,
      title,
      hashTagInput,
      description,
      startDate,
      endDate,
      journalDays: data.journalDays,
      imagesWithMeta,
      thumbnailUploadId: undefined,
    });

    try {
      await mutateAsync(payload);

      // 편집 종료 (서버 데이터로 다시 하이드레이션 허용)
      setIsDirty(false);

      // 상세/사진 캐시 무효화 (선택)
      await qc.invalidateQueries({ queryKey: ["journalDetail", Number(journalId)] });
      await qc.invalidateQueries({ queryKey: ["journalPhotos", Number(journalId)] });

      // 상세로 이동 + 새로고침
      router.replace(`/my-journal/detail/${journalId}`);
      router.refresh();

      alert("수정 완료");
    } catch (e) {
      console.error(e);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto pb-20">
      <TopBar title="여행 일지 수정하기" center />

      <form className="space-y-6">
        <ImageUploaderModal
          isOpen={showUploaderModal}
          onClose={() => setShowUploaderModal(false)}
          initialImages={imagesWithMeta}
          onSave={(images) => {
            setImagesWithMeta(images);
            setIsDirty(true);
            // ✅ 날짜 자동 계산
            const validDates = images
              .map((img) => img.takenDateTime?.split(" ")[0])
              .filter((date): date is string => Boolean(date));

            if (validDates.length > 0) {
              const sorted = validDates.sort();
              const formattedStart = sorted[0].replace(/\./g, "-");
              const formattedEnd = sorted[sorted.length - 1].replace(/\./g, "-");
              setStartDate(formattedStart);
              setEndDate(formattedEnd);
            }

            // ✅ 지역 추출
            const validAddresses = images.map((img) => img.address).filter((addr): addr is string => Boolean(addr));
            if (validAddresses.length) {
              const first = validAddresses[0];
              const regionMatch = first.match(
                /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)/
              );
              if (regionMatch) {
                setRegion(regionMatch[0]);
                setTitle(`나의 ${regionMatch[0]} 여행`);
              }
            }
          }}
        />

        {imagesWithMeta.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-2">
            {imagesWithMeta.map((img, index) => {
              const imageSrc = img.file instanceof File ? URL.createObjectURL(img.file) : img.photoUrl ?? "";

              if (!imageSrc) return null;

              return (
                <div key={index} className="aspect-square border rounded-lg overflow-hidden relative">
                  <Image src={imageSrc} alt="uploaded" fill className="object-cover" />
                  <div className="absolute bottom-1 left-1 bg-white/70 text-xs rounded p-1 space-y-0.5">
                    {img.keyword && <p>{img.keyword}</p>}
                    {img.lat && <p>위도: {img.lat.toFixed(5)}</p>}
                    {img.lng && <p>경도: {img.lng.toFixed(5)}</p>}
                  </div>
                </div>
              );
            })}
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
        <div className="space-y-4">
          <input
            type="text"
            placeholder="일지 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="해시태그 입력 (쉼표 구분)"
            value={hashTagInput}
            onChange={(e) => setHashTagInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <textarea
            rows={4}
            placeholder="경험을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          allowTouchMove={false}
          navigation
          pagination={{ clickable: true }}
          className="mb-8"
        >
          {data.journalDays.map((day) => {
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
      </form>

      <button
        disabled={isPending}
        type="button"
        onClick={handleSave}
        className="bg-purple-600 text-white w-full py-2 rounded mt-4"
      >
        여행일지 수정 완료
      </button>
    </div>
  );
}
