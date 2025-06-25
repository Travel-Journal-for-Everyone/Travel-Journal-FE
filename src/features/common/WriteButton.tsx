"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NotebookPen } from "lucide-react"; // 예시

export default function WriteButton() {
  const pathname = usePathname();

  // 특정 경로에서만 숨기기
  const hiddenRoutes = ["/journal/write", "/profile/setup"];
  const isHidden = hiddenRoutes.some((path) => pathname.startsWith(path));

  if (isHidden) return null;

  return (
    <Link href="/journal/write" className="ml-auto my-4 mr-4">
      <div className="rounded-full p-2 border w-12 h-12 flex justify-center items-center">
        <NotebookPen />
      </div>
    </Link>
  );
}
