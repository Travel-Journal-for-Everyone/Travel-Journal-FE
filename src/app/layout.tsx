import type { Metadata } from "next";
import Providers from "@/provider";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable}  antialiased max-w-screen-md m-auto`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
// src/app/layout.tsx
