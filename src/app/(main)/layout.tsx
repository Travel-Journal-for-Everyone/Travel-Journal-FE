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
    <div className="max-w-screen-md m-auto md:pt-20 p-6 md:p-4 md:min-h-screen">
      {!hideHeader && <Header />}
      <main>{children}</main>
    </div>
  );
}
