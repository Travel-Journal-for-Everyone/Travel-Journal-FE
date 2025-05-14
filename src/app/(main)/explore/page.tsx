"use client";

import { useInfinitePage } from "@/lib/useInfinitePage";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import ExploreCard from "@/features/explore/components/exploreCard";
import { mockJournalData } from "@/utils/exploremockData";

interface JournalItem {
  journalId: number;
  title: string;
  hashTag: string[];
  startDate: string;
  endDate: string;
  region: string;
  nights: number;
  days: number;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

export default function ExplorePage() {
  const {
    data: journalData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePage<JournalItem>({
    queryKey: ["exploreJournals"],
    endpoint: "/v1/explore/journals/feed",
    enabled: true,
  });

  const sentinelRef = useInfiniteScroll(() => {
    if (hasNextPage) fetchNextPage();
  });

  const pages = journalData?.pages ?? [];
  const allJournals = pages.flatMap((page) => page.content);
  const isEmpty = allJournals.length === 0;

  const renderPages = isEmpty ? mockJournalData.pages : pages;
  const renderJournals = renderPages.flatMap((page) => page.content);
  const isMock = isEmpty;

  return (
    <div className="max-w-screen-lg mx-auto md:pt-8">
      <h1 className="block md:hidden text-xl font-semibold mb-6 text-center">
        탐험하기
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-20 md:mb-0">
        {renderJournals.map((j) => (
          <ExploreCard key={j.journalId} {...j} />
        ))}
      </div>

      {!isMock && (
        <div
          ref={sentinelRef}
          className="h-10 mt-8 text-center text-sm text-gray-400"
        >
          {isFetchingNextPage ? "불러오는 중..." : ""}
        </div>
      )}
    </div>
  );
}
