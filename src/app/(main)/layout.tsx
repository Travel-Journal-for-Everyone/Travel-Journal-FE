"use client";
import { usePathname } from "next/navigation";
import Header from "@/features/common/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/profile/setup");

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 md:pt-20 mb-20 md:min-h-screen">
      {!hideHeader && <Header />}
      <main>{children}</main>
    </div>
  );
}
