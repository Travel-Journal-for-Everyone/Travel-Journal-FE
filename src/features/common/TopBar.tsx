"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TopBarProps {
  title: string | undefined;
  backTo?: string;
  center?: boolean;
  rightSlot?: ReactNode;
  showOptionsButton?: boolean;
}

export function TopBar({ center, title, backTo, rightSlot, showOptionsButton }: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-between items-center my-4 -ml-2 relative">
      {center ? (
        <>
          <button className="mr-auto" onClick={handleBack}>
            <ChevronLeft />
          </button>
          <h2 className="mx-auto font-bold">{title}</h2>
          <div className="ml-auto w-6 flex justify-end">{showOptionsButton && rightSlot}</div>
        </>
      ) : (
        <>
          <button onClick={handleBack}>
            <ChevronLeft />
          </button>
          <div className="ml-2 font-bold">{title}</div>
          <div className="ml-auto w-6 flex justify-end">{showOptionsButton && rightSlot}</div>
        </>
      )}
    </div>
  );
}
