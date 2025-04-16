"use client";

import { useState } from "react";
import SearchTabs from "@/features/search/components/searchTabs";
import SearchInput from "@/features/search/components/searchInput";
import MemberSearchResult from "@/features/search/components/MemberSearchResult";

type TabValue = "member" | "diary" | "place";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<"member" | "diary" | "place">("member");

  return (
    <div className="max-w-screen-lg mx-auto px-4 pt-8">
      <h1 className="text-xl font-semibold mb-6">검색</h1>
      <SearchInput value={keyword} onChange={setKeyword} />
      <SearchTabs
        currentTab={tab}
        onTabChange={(value) => setTab(value as TabValue)}
      />
      <div className="mt-4">
        {tab === "member" && <MemberSearchResult keyword={keyword} />}
        {tab === "diary" && <MemberSearchResult keyword={keyword} />}
        {tab === "place" && <MemberSearchResult keyword={keyword} />}
      </div>
    </div>
  );
}
