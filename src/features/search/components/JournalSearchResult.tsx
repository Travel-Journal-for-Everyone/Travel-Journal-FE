"use client";

import Link from "next/link";
import { useSearch } from "../hooks/useSearch";

interface Props {
  keyword: string;
}
interface JournalItem {
  journalId: number;
  title: string;
  startDate: string;
  endDate: string;
  hashTag: string[];
  nights: number;
  days: number;
}

export default function JournalSearchResult({ keyword }: Props) {
  const { data, isLoading } = useSearch({ tab: "diary", keyword });

  if (!keyword) {
    return <p className="text-sm text-gray-400">검색어를 입력해주세요</p>;
  }

  if (isLoading) {
    return <p>검색 중...</p>;
  }

  if (!data?.content.length) {
    return (
      <p className="text-sm text-gray-400">일치하는 여행일지가 없습니다</p>
    );
  }

  return (
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <ul className="space-y-4 mt-2">
      {data.content.map((Journal: JournalItem) => (
        <li key={Journal.journalId} className="p-4 bg-neutral-gray7 rounded-md">
          <Link href={`/diary/${Journal.journalId}`} className="block">
            <div className="mb-2 flex flex-wrap gap-2">
              {Journal.hashTag.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-light text-primary-main px-2 py-1 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="font-semibold text-base">{Journal.title}</p>
            <p className="text-sm text-gray-500 my-1">
              {Journal.startDate} ~ {Journal.endDate}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
