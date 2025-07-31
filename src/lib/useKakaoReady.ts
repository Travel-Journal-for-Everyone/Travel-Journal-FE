import { useEffect, useState } from "react";

export function useKakaoReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("🌀 useKakaoReady effect mounted");

    if (window.kakao?.maps) {
      setReady(true);
      console.log("✅ Kakao Maps Ready Immediately");
      return;
    }

    const check = setInterval(() => {
      console.log("⏳ Checking for kakao.maps...");
      if (window.kakao?.maps) {
        setReady(true);
        console.log("✅ Kakao Maps Ready by Interval");
        clearInterval(check);
      }
    }, 200);

    return () => clearInterval(check);
  }, []);

  return ready;
}
