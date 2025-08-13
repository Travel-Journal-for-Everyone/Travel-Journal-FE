// ✅ 하이픈/닷 섞여 들어와도 처리, Asia/Seoul 기준 자정 고정
const toUTCDate = (s: string) => {
  const [y, m, d] = s.replaceAll(".", "-").split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
};

export const toDotDate = (s: string) => (s.includes("-") ? s.replaceAll("-", ".") : s);
export const toHyphenDate = (s: string) => (s.includes(".") ? s.replaceAll(".", "-") : s);

// "YYYY[.-]MM[.-]DD[ HH:mm[:ss]]" → "YYYY.MM.DD HH:mm" (초 제거)
export const normalizeTakenDateTime = (v?: string) => {
  if (!v) return undefined;
  const m = v.match(/^(\d{4}[.-]\d{2}[.-]\d{2})(?:\s(\d{2}):(\d{2})(?::\d{2})?)?$/);
  if (!m) return v.replaceAll("-", ".");
  const date = m[1].replaceAll("-", ".");
  if (!m[2]) return date;
  return `${date} ${m[2]}:${m[3]}`;
};

// 날짜 차이 → nights/days
export const calcNightsDays = (start: string, end: string) => {
  const s = toUTCDate(start);
  const e = toUTCDate(end);
  const diff = Math.max(0, Math.round((e.getTime() - s.getTime()) / 86400000));
  return { nights: diff, days: diff + 1 };
};

// EXIF/메타에서 start/end 추론 (없으면 undefined)
export const inferStartEndFromImages = (takenDatesDot: string[]) => {
  const onlyDates = takenDatesDot.map((t) => t?.split(" ")[0]).filter((d): d is string => !!d);

  if (onlyDates.length === 0) return { start: undefined, end: undefined };

  const sorted = [...onlyDates].sort(); // "YYYY.MM.DD"는 문자열 정렬 OK
  return { start: sorted[0], end: sorted[sorted.length - 1] };
};

// 시작일 기준으로 일차 그룹핑 (1일부터 시작)
export function groupImagesByDay<T extends { takenDateTime?: string }>(
  images: T[],
  startDateDot: string
): Record<number, T[]> {
  const start = toUTCDate(toHyphenDate(startDateDot));
  const grouped: Record<number, T[]> = {};
  images.forEach((img) => {
    const datePart = img.takenDateTime?.split(" ")[0];
    if (!datePart) return;
    const taken = toUTCDate(toHyphenDate(datePart));
    const day = Math.floor((+taken - +start) / 86400000) + 1;
    if (day < 1) return; // 시작일 이전은 제외(원하면 1로 클램핑)
    (grouped[day] ??= []).push(img);
  });
  return grouped;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reconcileDays<T extends { dayNumber: number; description: string; journalDaySpots: any[] }>(
  list: T[],
  days: number
): T[] {
  const sorted = [...list].sort((a, b) => a.dayNumber - b.dayNumber).slice(0, days);
  while (sorted.length < days) {
    const n = sorted.length + 1;
    sorted.push({ dayNumber: n, description: "", journalDaySpots: [] } as unknown as T);
  }
  // dayNumber 재정렬 보정
  return sorted.map((d, i) => ({ ...d, dayNumber: i + 1 }));
}
