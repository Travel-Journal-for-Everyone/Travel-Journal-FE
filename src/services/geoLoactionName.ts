// ✅ Kakao Maps가 로드될 때까지 기다리는 유틸
export async function waitForKakaoMaps(retries = 20, interval = 200): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();

    if (window.kakao?.maps) return resolve();

    const check = setInterval(() => {
      if (window.kakao?.maps) {
        clearInterval(check);
        resolve();
      }
    }, interval);

    setTimeout(() => {
      clearInterval(check);
      resolve();
    }, retries * interval);
  });
}

// ✅ 기존 콜백 방식 - 내부적으로 스크립트 준비 여부를 검사하도록 개선
export function getLocationName(lat: number, lng: number, callback: (address: string) => void) {
  waitForKakaoMaps().then(() => {
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
  });
}

// ✅ Promise 버전 (await 사용 가능)
export function getLocationNameAsync(lat: number, lng: number): Promise<string> {
  return new Promise((resolve) => {
    getLocationName(lat, lng, (address) => resolve(address));
  });
}

// ✅ 장소 검색도 동일하게 스크립트 준비 확인 추가
export function searchPlace(keyword: string, callback: (lat?: number, lng?: number, address?: string) => void) {
  waitForKakaoMaps().then(() => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.warn("Kakao Maps 스크립트가 아직 로드되지 않았습니다.");
      callback();
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const firstResult = data[0];
        callback(parseFloat(firstResult.y), parseFloat(firstResult.x), firstResult.address_name);
      } else {
        callback();
      }
    });
  });
}

// ✅ Promise 기반 장소 검색
export function searchPlaceAsync(keyword: string): Promise<{ lat: number; lng: number; address: string } | null> {
  return new Promise((resolve) => {
    searchPlace(keyword, (lat, lng, address) => {
      if (lat && lng && address) {
        resolve({ lat, lng, address });
      } else {
        resolve(null);
      }
    });
  });
}
