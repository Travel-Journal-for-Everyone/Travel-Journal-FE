"use client";

import { useState } from "react";
import SearchTabs from "@/features/search/components/searchTabs";
import SearchInput from "@/features/search/components/searchInput";
import MemberSearchResult from "@/features/search/components/MemberSearchResult";
import PlaceSearchResult from "@/features/search/components/PlaceSearchResult";
import JournalSearchResult from "@/features/search/components/JournalSearchResult";

type TabValue = "diary" | "place" | "member";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<"diary" | "place" | "member">("diary");

  return (
    <div className="max-w-screen-lg mx-auto md:pt-8">
      <h1 className="hidden md:block text-xl font-semibold mb-6">검색</h1>
      <SearchInput value={keyword} onChange={setKeyword} />
      <SearchTabs
        currentTab={tab}
        onTabChange={(value) => setTab(value as TabValue)}
      />
      <div className="mt-4 mb-20 md:mb-0">
        {tab === "member" && <MemberSearchResult keyword={keyword} />}
        {tab === "place" && <PlaceSearchResult keyword={keyword} />}
        {tab === "diary" && <JournalSearchResult keyword={keyword} />}
      </div>
    </div>
  );
}
