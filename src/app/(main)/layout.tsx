"use client";
import { usePathname } from "next/navigation";
import Header from "@/features/common/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/profile/setup");

  return (
    <main className="layout-common">
      {!hideHeader && <Header />}
      <div className="layout-content">{children}</div>
    </main>
  );
}
