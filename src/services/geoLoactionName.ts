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
