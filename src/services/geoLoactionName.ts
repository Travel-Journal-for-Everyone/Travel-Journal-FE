export function getLocationName(
  lat: number,
  lng: number,
  callback: (address: string) => void
) {
  if (!window.kakao) return;

  const geocoder = new window.kakao.maps.services.Geocoder();

  const coord = new window.kakao.maps.LatLng(lat, lng);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callbackFn = function (result: any, status: string) {
    if (status === window.kakao.maps.services.Status.OK) {
      const roadAddress = result[0].road_address?.address_name;
      const address = result[0].address?.address_name;
      callback(roadAddress || address || "위치명 없음");
    } else {
      callback("위치명 없음");
    }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callbackFn);
}
