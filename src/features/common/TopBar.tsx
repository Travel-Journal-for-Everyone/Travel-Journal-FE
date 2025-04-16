"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  title: string;
  backTo?: string; // optional
}

export function TopBar({ title, backTo = "/" }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    router.push(backTo);
  };
  return (
    <div className="flex justify-between my-4 -ml-2 ">
      <button className="mr-auto" onClick={handleBack}>
        <ChevronLeft />
      </button>
      <h2 className="mr-auto ml-auto ">{title}</h2>
      <div className="ml-auto w-4"></div>
    </div>
  );
}
