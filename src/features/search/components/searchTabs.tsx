export type TabValue = "member" | "diary" | "place";

interface SearchTabsProps {
  currentTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

const tabs: { key: TabValue; label: string }[] = [
  { key: "member", label: "여행자" },
  { key: "diary", label: "여행 일지" },
  { key: "place", label: "플레이스" },
];

export default function SearchTabs({
  currentTab,
  onTabChange,
}: SearchTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 text-sm font-medium transition-all
            ${
              currentTab === tab.key
                ? "text-black border-b-2 border-purple-500"
                : "text-gray-400 hover:text-black"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
