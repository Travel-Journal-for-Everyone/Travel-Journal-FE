export const formatDateToDot = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // 유효하지 않은 날짜

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd}`;
};

export const normalizeTakenDateTime = (value: string) => {
  // EXIF 스타일: "2020.09.06 15.01.15"
  if (/^\d{4}\.\d{2}\.\d{2} \d{2}\.\d{2}\.\d{2}$/.test(value)) {
    const [date, time] = value.split(" ");
    const [hh, mm] = time.split(".");
    return `${date} ${hh}:${mm}`;
  }

  // ISO 스타일: "2020-09-06 15:01:15" → "2020.09.06 15:01"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
    const [date, time] = value.split(" ");
    const [yyyy, mm, dd] = date.split("-");
    const [hh, min] = time.split(":");
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  }

  // "2020.09.06 15:01:15" → "2020.09.06 15:01"
  if (/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
    return value.slice(0, 16);
  }

  // 이미 정제된 경우
  if (/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/.test(value)) {
    return value;
  }

  return value;
};
