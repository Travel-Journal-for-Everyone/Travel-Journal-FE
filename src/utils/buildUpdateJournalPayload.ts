import { toDotDate } from "./journalFormatters";
import type { JournalUpdateRequest, PhotoMetadata, JournalDay } from "@/types/journal";
import { calcNightsDays, reconcileDays } from "@/utils/tripSpan";

type ReconcileMode = "fromDates" | "fromDays";

export function buildUpdateJournalPayloadEdit(args: {
  startDate: string; // input은 보통 YYYY-MM-DD
  endDate: string;
  region: string;
  title: string;
  hashTagInput: string; // "서울, 여행"
  description: string;
  journalDays: JournalDay[];
  imagesWithMeta: {
    uploadId?: string;
    dayNumber?: number;
    takenDateTime?: string;
    address?: string;
    lat?: number;
    lng?: number;
    keyword?: string;
    uploadFilename?: string;
  }[];
  thumbnailUploadId?: string | null;
  reconcileMode?: ReconcileMode; // 기본 fromDates
}): JournalUpdateRequest {
  const startDot = toDotDate(args.startDate);
  const endDot = toDotDate(args.endDate);

  // 1) 날짜로 nights/days 재계산
  let { nights, days } = calcNightsDays(startDot, endDot);

  // 2) 필요한 경우 일차 기준으로 nights/days 보정
  if (args.reconcileMode === "fromDays") {
    const inferredDays = Math.max(1, args.journalDays.length);
    days = inferredDays;
    nights = inferredDays - 1;
  } else {
    // 기본: 날짜 기준 → 일차 배열을 days에 맞춰 보정
    if (args.journalDays.length !== days) {
      // 보수적으로 에러로 막으려면 throw
      // throw new Error(`일차 정보 개수(${args.journalDays.length})가 여행 일수(${days})와 일치하지 않습니다.`);
      // UX 부드럽게: 자동 보정
      args.journalDays = reconcileDays(args.journalDays, days);
    }
  }

  // 3) 사진 메타 구성(업로드된 것만)
  const photoMetadataList: PhotoMetadata[] = (args.imagesWithMeta ?? [])
    .filter((p) => !!p.uploadId)
    .map((p) => ({
      uploadId: p.uploadId!,
      dayNumber: p.dayNumber ?? 1,
      description: p.keyword ?? p.address ?? "",
      uploadFilename: p.uploadFilename ?? "",
      takenDateTime: p.takenDateTime ?? "",
      address: p.address ?? "",
      latitude: typeof p.lat === "number" ? p.lat : 0,
      longitude: typeof p.lng === "number" ? p.lng : 0,
    }));

  const thumbnailUploadId = args.thumbnailUploadId ?? photoMetadataList[0]?.uploadId ?? "";

  return {
    startDate: startDot,
    endDate: endDot,
    nights,
    days,
    region: args.region,
    title: args.title,
    hashTag: args.hashTagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    description: args.description,
    journalDays: args.journalDays,
    photoMetadataList,
    thumbnailUploadId,
  };
}
