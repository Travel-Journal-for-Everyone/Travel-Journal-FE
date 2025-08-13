export interface ImageMeta {
  file: File;
  lat?: number;
  lng?: number;
  keyword?: string;
  address?: string;
  takenDateTime: string;
}

export interface JournalUpdateRequest {
  startDate: string; // "2025.03.15"
  endDate: string; // "2025.03.18"
  nights: number; // 2
  days: number; // 3
  region: string; // "서울특별시"
  title: string; // "서울 도심 속 힐링 명소 탐방기"
  hashTag: string[]; // ["서울", "여행", "도심"]
  description: string;
  journalDays: JournalDay[];
  photoMetadataList: PhotoMetadata[];
  thumbnailUploadId: string;
}

export interface JournalDay {
  dayNumber: number;
  description: string;
  journalDaySpots: JournalDaySpot[];
}

export interface JournalDaySpot {
  spotOrder: number;
  spotName: string;
  latitude: number;
  longitude: number;
}

export interface PhotoMetadata {
  uploadId: string;
  dayNumber: number;
  description?: string;
  uploadFilename?: string;
  takenDateTime?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}
