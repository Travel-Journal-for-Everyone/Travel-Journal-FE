import type { Metadata } from "next";
import Providers from "@/provider";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/Header"; // ✅ Header 유지

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
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <Header />

          <div className="max-w-screen-md m-auto pt-20 px-2 md:px-4 shadow-sm rounded-sm min-h-screen">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
