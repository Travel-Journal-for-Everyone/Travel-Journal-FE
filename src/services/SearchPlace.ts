export function searchPlace(
  keyword: string,
  callback: (lat: number, lng: number) => void
) {
  if (!window.kakao) return;
  const ps = new window.kakao.maps.services.Places();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ps.keywordSearch(keyword, (result: any[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const { y, x } = result[0];
      const lat = parseFloat(y);
      const lng = parseFloat(x);
      callback(lat, lng);
    } else {
      console.log("검색 결과 없음");
    }
  });
}
