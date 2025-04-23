"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TopBarProps {
  title: string;
  backTo?: string;
  center?: boolean;
  rightSlot?: ReactNode; // ✅ 팔로우 버튼 등 추가할 수 있게!
}

export function TopBar({
  center,
  title,
  backTo = "/",
  rightSlot,
}: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    router.push(backTo);
  };

  return (
    <div className="flex justify-between items-center my-4 -ml-2">
      <button onClick={handleBack}>
        <ChevronLeft />
      </button>

      {center ? (
        <h2 className="mx-auto font-bold">{title}</h2>
      ) : (
        <div className="ml-2 font-bold">{title}</div>
      )}

      <div className="ml-auto">{rightSlot ?? <div className="w-4" />}</div>
    </div>
  );
}
