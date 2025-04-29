interface FollowTabProps {
  count: { followerCount: number; followings: number };
  tab: "followers" | "followings";
  onTabChange: (tab: "followers" | "followings") => void;
}

export function FollowTab({ count, tab, onTabChange }: FollowTabProps) {
  return (
    <div className="flex justify-around border-b pb-2">
      <button
        onClick={() => onTabChange("followers")}
        className={tab === "followers" ? "font-bold" : ""}
      >
        팔로워 {count.followerCount}
      </button>
      <button
        onClick={() => onTabChange("followings")}
        className={tab === "followings" ? "font-bold" : ""}
      >
        팔로잉 {count.followings}
      </button>
    </div>
  );
}
