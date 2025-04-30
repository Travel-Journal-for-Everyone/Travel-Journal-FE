import Image from "next/image";
import Link from "next/link";

interface MemberItem {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  travelDiaryCount: number;
  placesCount: number;
}

interface FollowListProps {
  data: MemberItem[];
  type: "followers" | "followings";
  isMyPage: boolean;
  onUnfollowSuccess?: () => void;
}
export default function FollowList({
  data,
  type,
  isMyPage,
  onUnfollowSuccess,
}: FollowListProps) {
  const users = data ?? [];
  console.log("FollowList data", data);
  console.log("FollowList users", users);
  return (
    <div className="space-y-4 mt-4">
      {users.length > 0 ? (
        users.map((user) => (
          <Link
            href={`/member/${user.memberId}`}
            key={user.memberId}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-14 h-14 ">
                <Image
                  src={user.profileImageUrl}
                  alt="userProfile"
                  className="rounded-full"
                  fill
                />
              </div>
              <div>
                <div className="font-medium">{user.nickname}</div>
                <div className="text-xs text-gray-500">
                  📘 {user.travelDiaryCount}개 · 📍 {user.placesCount}곳
                </div>
              </div>
            </div>

            {isMyPage && type === "followings" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onUnfollowSuccess?.();
                }}
                className="text-red-500 text-sm"
              >
                언팔로우
              </button>
            )}

            {type === "followers" && (
              <span className="text-xs text-gray-400">팔로워</span>
            )}
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-400 mt-10">
          리스트가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
}
