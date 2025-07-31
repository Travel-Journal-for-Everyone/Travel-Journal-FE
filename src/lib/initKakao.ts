export function initKakao(callback?: () => void) {
  if (typeof window === "undefined") return;

  if (window.kakao?.maps?.load) {
    window.kakao.maps.load(() => {
      console.log("✅ Kakao Maps SDK loaded");
      callback?.();
    });
  } else {
    console.warn("❌ kakao.maps.load를 사용할 수 없습니다.");
  }
}
