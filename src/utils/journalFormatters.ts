export const toDotDate = (v: string) => (v.includes("-") ? v.replaceAll("-", ".") : v);

export const normalizeTakenDateTime = (v?: string) => {
  if (!v) return "";
  const m = v.match(/^(\d{4}[.-]\d{2}[.-]\d{2})(?:\s(\d{2}):(\d{2})(?::\d{2})?)?$/);
  if (!m) return v;
  const date = m[1].replaceAll("-", ".");
  if (!m[2] || !m[3]) return date;
  return `${date} ${m[2]}:${m[3]}`;
};

export const splitHashTags = (raw: string) =>
  raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
