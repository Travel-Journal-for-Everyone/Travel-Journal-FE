interface FollowTabProps {
  count: { followerCount: number; followings: number };
  tab: "followers" | "followings";
  onTabChange: (tab: "followers" | "followings") => void;
}

export function FollowTab({ count, tab, onTabChange }: FollowTabProps) {
  return (
    <div className="flex justify-around border-b border-gray-200">
      <button
        onClick={() => onTabChange("followers")}
        className={`flex-1 relative flex flex-col items-center pb-2 transition-colors duration-200 ${
          tab === "followers" ? "text-black font-semibold" : "text-gray-400"
        }`}
      >
        팔로워 {count.followerCount}
        {tab === "followers" && (
          <span className="absolute -bottom-[1px] left-0 w-full h-0.5 bg-purple-500" />
        )}
      </button>

      <button
        onClick={() => onTabChange("followings")}
        className={`flex-1 relative flex flex-col items-center pb-2 transition-colors duration-200 ${
          tab === "followings" ? "text-black font-semibold" : "text-gray-400"
        }`}
      >
        팔로잉 {count.followings}
        {tab === "followings" && (
          <span className="absolute -bottom-[1px] left-0 w-full h-0.5 bg-purple-500" />
        )}
      </button>
    </div>
  );
}
