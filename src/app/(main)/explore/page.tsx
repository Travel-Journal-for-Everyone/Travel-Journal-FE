"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemberContentList } from "@/features/member/hooks/useMemberContentList";
import JournalCard from "@/features/explore/components/JournalCardView";
import PlaceCard from "@/features/explore/components/placeCardView";

type TabValue = "diary" | "place";
const tabs: { key: TabValue; label: string }[] = [
  { key: "diary", label: "여행 일지" },
  { key: "place", label: "플레이스" },
];

interface JournalItem {
  journalId: number;
  title: string;
  hashTag: string[];
  startDate: string;
  endDate: string;
}

interface PlaceItem {
  placeId: number;
  title: string;
  region: string;
  thumbnailUrl?: string;
}

export default function ExplorePage() {
  const [tab, setTab] = useState<TabValue>("diary");
  const memberId = useAuthStore((state) => state.user?.memberId) ?? 0;

  const { data: journalData, isLoading: isJournalLoading } =
    useMemberContentList<JournalItem>(memberId, "journals");
  const { data: placeData, isLoading: isPlaceLoading } =
    useMemberContentList<PlaceItem>(memberId, "places");

  const isLoading = tab === "diary" ? isJournalLoading : isPlaceLoading;

  return (
    <div className="max-w-screen-lg mx-auto md:pt-8">
      <h1 className="block md:hidden text-xl font-semibold mb-6 text-center">
        탐험하기
      </h1>

      <div className="flex border-b border-gray-200 mt-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium flex-1 transition-all border-b-2
              ${
                tab === t.key
                  ? "text-black border-purple-500"
                  : "text-gray-400 hover:text-black border-transparent"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 mb-20 md:mb-0">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : tab === "diary" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {journalData?.content.map((j) => (
              <JournalCard
                key={j.journalId}
                journalId={j.journalId}
                title={j.title}
                hashTag={j.hashTag}
                startDate={j.startDate}
                endDate={j.endDate}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {placeData?.content.map((p) => (
              <PlaceCard
                key={p.placeId}
                placeId={p.placeId}
                title={p.title}
                region={p.region}
                thumbnailUrl={p.thumbnailUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
