import { useEffect, useState } from "react";
import { useFollow } from "../hooks/useFollow";
import { useIsFollowing } from "../hooks/useIsFollowing";

interface FollowButtonProps {
  memberId: number;
}

export default function FollowButton({ memberId }: FollowButtonProps) {
  const { data: isFollowing, isLoading } = useIsFollowing(memberId);
  const [isFollowingState, setIsFollowingState] = useState<boolean | null>(
    null
  );
  const { toggleFollow, isPending } = useFollow(memberId, !!isFollowingState);

  useEffect(() => {
    if (isFollowing !== undefined && isFollowing !== null) {
      setIsFollowingState(isFollowing);
      console.log(isFollowing);
    }
  }, [isFollowing]);

  const handleToggle = () => {
    if (isFollowingState !== null) {
      toggleFollow();
      setIsFollowingState((prev) => !prev);
    }
  };

  if (isLoading || isFollowingState === null) {
    return (
      <button
        className="bg-gray-200 text-gray-500 px-4 py-1 rounded-md"
        disabled
      >
        로딩 중...
      </button>
    );
  }

  return (
    <button
      className={`px-4 py-1 rounded-md transition ${
        isFollowingState
          ? "bg-gray-300 text-black"
          : "bg-primary-main text-white"
      }`}
      disabled={isPending}
      onClick={handleToggle}
    >
      {isPending ? (
        "처리 중..."
      ) : isFollowingState ? (
        <span className="text-sm font-medium">팔로잉 중</span>
      ) : (
        <span className="text-sm font-medium">팔로우</span>
      )}
    </button>
  );
}
