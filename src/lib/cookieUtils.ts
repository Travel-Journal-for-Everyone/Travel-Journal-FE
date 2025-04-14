/** 클라이언트 사이드에서 쿠키 설정 */
export const setCookie = (
  key: string,
  value: string,
  maxAge = 60 * 60 * 24
) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAge}`;
};

/** 클라이언트 사이드에서 쿠키 가져오기 */
export const getCookie = (key: string): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  const found = cookies.find((cookie) => cookie.startsWith(`${key}=`));
  return found ? decodeURIComponent(found.split("=")[1]) : null;
};

/** 클라이언트 사이드에서 쿠키 삭제 */
export const deleteCookie = (key: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=; path=/; max-age=0`;
};
