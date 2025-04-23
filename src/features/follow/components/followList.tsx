import Image from "next/image";

interface FollowListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  type: "followers" | "followings";
  isMyPage: boolean;
}

export default function FollowList({ data, type, isMyPage }: FollowListProps) {
  return (
    <ul className="space-y-4 mt-4">
      {data.map((user) => (
        <li key={user.memberId} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={user.profileImageUrl}
              className="w-8 h-8 rounded-full"
              alt="userProfile"
              width={16}
              height={16}
            />
            <div>
              <div className="font-medium">{user.nickname}</div>
              <div className="text-xs text-gray-500">
                📘 {user.travelDiaryCount}개 · 📍 {user.placesCount}곳
              </div>
            </div>
          </div>
          {isMyPage && <button>✕</button>}
          {type === "followers" ? (
            <button>✕</button>
          ) : (
            <span className="text-xs text-gray-400">팔로잉 중</span>
          )}
        </li>
      ))}
    </ul>
  );
}
