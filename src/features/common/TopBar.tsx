"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TopBarProps {
  title: string | undefined;
  backTo?: string;
  center?: boolean;
  rightSlot?: ReactNode;
}

export function TopBar({ center, title, backTo, rightSlot }: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-between items-center my-4 -ml-2">
      {center ? (
        <>
          <button className="mr-auto" onClick={handleBack}>
            <ChevronLeft />
          </button>
          <h2 className="mx-auto font-bold">{title}</h2>
          <div className="ml-auto w-4">
            {rightSlot ?? <div className="w-4" />}
          </div>
        </>
      ) : (
        <>
          <button onClick={handleBack}>
            <ChevronLeft />
          </button>

          <div className="ml-2 font-bold">{title}</div>
          <div className="ml-auto">{rightSlot ?? <div className="w-4" />}</div>
        </>
      )}
    </div>
  );
}
