"use client";

import { useJournalList } from "@/features/jorunal/hooks/useJournalList";
import Image from "next/image";

export default function MyJournalList() {
  const { data, isLoading, isError } = useJournalList(0, 10);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류가 발생했습니다.</p>;

  if (!data || data.content.length === 0) {
    return <p>작성한 여행일지가 없습니다.</p>;
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8 space-y-6">
      {data.content.map((journal) => (
        <div
          key={journal.journalId}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          {journal.coverImageUrl && (
            <div className="mb-4 aspect-video relative w-full rounded overflow-hidden">
              <Image
                src={journal.coverImageUrl}
                alt={journal.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h2 className="text-lg font-bold mb-2">{journal.title}</h2>
          <p className="text-sm text-gray-500 mb-1">
            {journal.startDate} ~ {journal.endDate}
          </p>
          <p className="text-sm text-gray-500">{journal.region}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {journal.hashTag.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary-light text-primary-main px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* 디버깅용 pre */}
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
        {JSON.stringify(data.content, null, 2)}
      </pre>
    </div>
  );
}
