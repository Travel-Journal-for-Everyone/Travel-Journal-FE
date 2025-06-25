import axiosInstance from "@/lib/axiosInstance";
import { uploadPhotos } from "@/services/photo";
import { generateJournalDaySpots } from "@/lib/generateJournalDaySpots";
import { formatDateToDot, normalizeTakenDateTime } from "@/lib/formatDateToDot";

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
  dayDescription: string;
}

export function useJournalSubmit() {
  const submitJournal = async (
    imagesWithMeta: ImageMeta[],
    formValues: FormValues
  ) => {
    if (imagesWithMeta.length === 0) {
      alert("사진을 업로드해주세요.");
      return;
    }

    const hasEmptyKeyword = imagesWithMeta.some(
      (img) => !img.keyword || img.keyword === "위치명 없음"
    );
    if (hasEmptyKeyword) {
      alert("위치명이 없는 사진이 있습니다.");
      return;
    }

    try {
      // 1. 이미지 업로드
      const files = imagesWithMeta.map((img) => img.file);
      const uploadResults = await uploadPhotos(files);

      // 2. 메타데이터 정리
      const photoMetadataList = imagesWithMeta.map((img) => {
        const matched = uploadResults.find(
          (res) => res.uploadFilename === img.file.name
        );
        if (!matched) throw new Error(`업로드 결과 누락: ${img.file.name}`);

        return {
          uploadId: matched.uploadId,
          uploadFilename: matched.uploadFilename,
          latitude: img.lat,
          longitude: img.lng,
          address: img.address,
          takenDateTime: img.takenDateTime
            ? normalizeTakenDateTime(img.takenDateTime)
            : undefined,
          description: `${img.keyword}에서 찍은 사진`,
          dayNumber: 1,
        };
      });

      // 3. 자동 장소 생성
      const journalDaySpots = generateJournalDaySpots(imagesWithMeta);

      const journalDays = [
        {
          dayNumber: 1,
          description: formValues.dayDescription,
          journalDaySpots,
        },
      ];

      // 4. 기간 계산 (단순하게 계산 예시)
      const nights = 2; // 추후 자동 계산 로직 삽입 가능
      const days = 3;

      const body = {
        startDate: formatDateToDot(formValues.startDate),
        endDate: formatDateToDot(formValues.endDate),
        nights,
        days,
        region: formValues.region,
        title: formValues.title,
        hashTag: formValues.hashTag,
        description: formValues.description,
        journalDays,
        photoMetadataList,
      };

      const response = await axiosInstance.post(
        "/v1/members/journal/create",
        body
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
    }
  };

  return { submitJournal };
}
