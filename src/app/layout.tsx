import Script from "next/script";
import type { Metadata } from "next";
import { Providers } from "@/provider";
import localFont from "next/font/local";
import "./globals.css";
import MobileNavBar from "@/features/common/MobileNavBar";
import { KAKAO_MAP_API } from "./constants/kakao";
import { KakaoInitTrigger } from "@/KakaoInitTrigger";

const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "모두의 여행일지",
  description: "여행일지를 작성하고 공유해보세요!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script src={KAKAO_MAP_API} strategy="beforeInteractive" />
      </head>
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <KakaoInitTrigger />
          <MobileNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
