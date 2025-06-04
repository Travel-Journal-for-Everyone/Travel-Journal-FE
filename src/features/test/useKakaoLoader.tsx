import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "",
    // 타입 undefined → 빈 문자열로 대체
    libraries: ["clusterer", "drawing", "services"],
  });
}
