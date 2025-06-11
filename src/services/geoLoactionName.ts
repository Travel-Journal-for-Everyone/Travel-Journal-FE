export function getLocationName(
  lat: number,
  lng: number,
  callback: (address: string) => void
) {
  if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
    console.warn("Kakao Maps 스크립트가 아직 로드되지 않았습니다.");
    callback("위치명 없음");
    return;
  }

  const geocoder = new window.kakao.maps.services.Geocoder();
  const coord = new window.kakao.maps.LatLng(lat, lng);

  geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const roadAddress = result[0].road_address?.address_name;
      const address = result[0].address?.address_name;

      callback(roadAddress || address || "위치명 없음");
    } else {
      callback("위치명 없음");
    }
  });
}

export function getLocationNameAsync(
  lat: number,
  lng: number
): Promise<string> {
  return new Promise((resolve) => {
    getLocationName(lat, lng, (address) => resolve(address));
  });
}

export function searchPlace(
  keyword: string,
  callback: (lat: number, lng: number) => void
) {
  if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
    console.warn("Kakao Maps 스크립트가 아직 로드되지 않았습니다.");
    return;
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const firstResult = data[0];
      callback(parseFloat(firstResult.y), parseFloat(firstResult.x));
    } else {
      console.warn("위치 검색 실패:", status);
    }
  });
}
