import axiosInstance from "@/lib/axiosInstance";
import { uploadPhotos } from "@/services/photo";
import { generateJournalDaySpots } from "@/lib/generateJournalDaySpots";
import { normalizeTakenDateTime } from "@/lib/formatDateToDot";
import { differenceInDays, parseISO } from "date-fns";

export interface ImageMeta {
  file: File;
  lat?: number;
  lng?: number;
  keyword?: string;
  address?: string;
  takenDateTime?: string;
}

interface FormValues {
  startDate: string;
  endDate: string;
  region: string;
  title: string;
  hashTag: string[];
  description: string;
}

export function useJournalSubmit() {
  const submitJournal = async (
    groupedImages: Record<number, ImageMeta[]>,
    dayDescriptions: Record<number, string>,
    formValues: FormValues
  ) => {
    const allImages = Object.values(groupedImages).flat();

    if (allImages.length === 0) {
      alert("사진을 업로드해주세요.");
      return;
    }

    const hasEmptyKeyword = allImages.some((img) => !img.keyword || img.keyword === "위치명 없음");
    if (hasEmptyKeyword) {
      alert("위치명이 없는 사진이 있습니다.");
      return;
    }

    try {
      // 1. 이미지 업로드
      const files = allImages.map((img) => img.file);
      const uploadResults = await uploadPhotos(files);

      // 2. 날짜 계산
      const start = parseISO(formValues.startDate);
      const end = parseISO(formValues.endDate);
      const days = differenceInDays(end, start) + 1;
      const nights = days - 1;

      // 1. 전역 photoMetadataList 만들기
      const photoMetadataList = Object.entries(groupedImages).flatMap(([dayStr, images]) => {
        const dayNumber = Number(dayStr);

        return images.map((img) => {
          const matched = uploadResults.find((res) => res.uploadFilename === img.file.name);
          if (!matched) throw new Error(`업로드 결과 누락: ${img.file.name}`);

          return {
            uploadId: matched.uploadId,
            uploadFilename: matched.uploadFilename,
            latitude: img.lat,
            longitude: img.lng,
            address: img.address,
            takenDateTime: img.takenDateTime ? normalizeTakenDateTime(img.takenDateTime) : undefined,
            description: `${img.keyword}에서 찍은 사진`,
            dayNumber, // ✅ 전역에서 구분
          };
        });
      });

      // 2. journalDays 생성
      const journalDays = Object.entries(groupedImages).map(([dayStr, images]) => {
        const dayNumber = Number(dayStr);
        const journalDaySpots = generateJournalDaySpots(images);

        return {
          dayNumber,
          description: dayDescriptions[dayNumber] || `${dayNumber}일차`,
          journalDaySpots,
        };
      });

      // 3. 최종 body
      const body = {
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        nights,
        days,
        region: formValues.region,
        title: formValues.title,
        hashTag: formValues.hashTag,
        description: formValues.description,
        journalDays,
        photoMetadataList,
        thumbnailUploadId: uploadResults[0]?.uploadId,
      };

      const response = await axiosInstance.post("/v1/members/journal/create", body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { submitJournal };
}
