"use client";

import ExploreCard from "@/features/explore/components/exploreCard";
import { useJournalList } from "@/features/jorunal/hooks/useJournalList";
import Link from "next/link";

export default function MyJournalList() {
  const { data, isLoading, isError } = useJournalList(0, 10);
  const allJournals = data?.content ?? [];
  const isEmpty = allJournals.length === 0;
  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류가 발생했습니다.</p>;

  if (!data || data.content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center fixed top-0 bottom-0 left-0 right-0">
        <h2 className="text-xl font-semibold mb-2">완성된 여행일지가 없어요.</h2>
        <Link
          href="/journal/write/"
          className="px-6 py-2 rounded-full bg-primary-main text-white hover:brightness-110 transition"
        >
          여행일지작성
        </Link>
      </div>
    );
  }

  return (
    <>
      {isEmpty ? (
        <div className="text-center text-gray-500 py-20">아직 등록된 여행일지가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-20 md:mb-0">
          {data.content.map((journal) => (
            <div key={journal.journalId} className="my-4">
              <Link href={`/my-journal/detail/${journal.journalId}`}>
                <ExploreCard
                  journalId={journal.journalId}
                  title={journal.title}
                  startDate={journal.startDate}
                  endDate={journal.endDate}
                  region={journal.region}
                  hashTag={journal.hashTag}
                  thumbnailUrl={journal.thumbnailUrl}
                  likeCount={0}
                  commentCount={0}
                  memberId={0}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
