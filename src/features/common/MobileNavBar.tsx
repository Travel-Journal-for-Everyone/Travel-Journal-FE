"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookText, Search, MapPin, User } from "lucide-react";

const tabs = [
  { href: "/", icon: BookText, label: "나의 일지" },
  { href: "/search", icon: Search, label: "검색하기" },
  { href: "/explore", icon: MapPin, label: "탐험하기" },
  { href: "/mypage", icon: User, label: "프로필" },
];

export default function MobileNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 md:hidden pb-8">
      <ul className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <li
              key={tab.href}
              className="relative flex flex-col items-center py-2 text-xs"
            >
              <Link href={tab.href} className="flex flex-col items-center">
                <tab.icon
                  className={`w-6 h-6 mb-0.5 ${
                    isActive ? "text-primary-main" : "text-gray-400"
                  }`}
                />
                <span
                  className={
                    isActive ? "text-primary-main font-medium" : "text-gray-400"
                  }
                >
                  {tab.label}
                </span>
              </Link>
              {isActive && (
                <span className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[3px] bg-primary-light rounded-full" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
