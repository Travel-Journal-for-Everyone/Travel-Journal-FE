"use client";

import { useEffect } from "react";
import { initKakao } from "@/lib/initKakao";

export function KakaoInitTrigger() {
  useEffect(() => {
    initKakao();
  }, []);

  return null;
}
