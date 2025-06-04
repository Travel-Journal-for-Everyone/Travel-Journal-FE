import Image from "next/image";
import Link from "next/link";
import { blockUser } from "@/services/blockUser";

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

const handleBlock = async (
  e: React.MouseEvent<HTMLButtonElement>,
  blockedId: number
) => {
  e.preventDefault();
  e.stopPropagation();

  if (!confirm("이 회원을 차단하시겠습니까?")) return;

  try {
    await blockUser(blockedId);
    alert("회원이 차단되었습니다.");
    // TODO: 차단 이후 UI 갱신 필요하면 여기서 처리 (예: 리스트 갱신)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert("차단에 실패했습니다. 다시 시도해주세요.");
  }
};

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
    <ul className="space-y-4 mt-4">
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user.memberId} className="flex justify-between">
            <Link
              href={`/member/${user.memberId}`}
              className="flex items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="relative w-14 h-14 ">
                  <Image
                    src={user.profileImageUrl}
                    alt="userProfile"
                    className="rounded-full"
                    fill
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="font-medium ">{user.nickname}</div>
                  <div className="text-xs text-gray-500 flex">
                    <div className="relative w-4 h-4">
                      <Image
                        src="/icons/Icon-paper-gray-18px.svg"
                        alt="Diary"
                        fill
                      />
                    </div>
                    {user.travelDiaryCount}개 ·
                    <div className="relative w-4 h-4">
                      <Image
                        src="/icons/Icon-pin-gray-18px.svg"
                        alt="profile"
                        fill
                      />
                    </div>
                    {user.placesCount}곳
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
            <button
              type="button"
              onClick={(e) => handleBlock(e, user.memberId)}
            >
              <div className="relative w-6 h-6">
                <Image src="/icons/Icon-close-35px.svg" alt="차단" fill />
              </div>
            </button>
          </li>
        ))
      ) : (
        <div className="text-center text-gray-400 mt-10">
          리스트가 존재하지 않습니다.
        </div>
      )}
    </ul>
  );
}
