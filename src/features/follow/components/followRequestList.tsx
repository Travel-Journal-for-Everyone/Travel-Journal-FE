"use client";

import Image from "next/image";
import {
  useFollowRequests,
  useAcceptFollowRequest,
  useRejectFollowRequest,
} from "../hooks/useFollowRequest";

export default function FollowRequestList() {
  const { data, isLoading } = useFollowRequests();
  const { mutate: accept } = useAcceptFollowRequest();
  const { mutate: reject } = useRejectFollowRequest();

  const requests = data?.content ?? [];

  if (isLoading) return <p className="text-center">로딩 중...</p>;
  if (!requests.length)
    return <p className="text-center">팔로우 요청이 없습니다.</p>;

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-3">팔로우 요청</h3>
      <ul className="flex flex-col gap-4">
        {requests.map((req) => (
          <li
            key={req.followId}
            className="flex items-center justify-between gap-4 pb-2"
          >
            <div className="flex items-center gap-3">
              <div className=" relative aspect-square overflow-hidden rounded-full w-12 h-12">
                <Image
                  src={req.profileImageUrl}
                  alt={`${req.nickname}의 프로필 이미지`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span>{req.nickname}</span>
                <span className="text-sm text-gray-400">
                  {req.travelDiaryCount}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => accept(req.followId)}
                className="bg-primary-main text-sm text-white px-4 py-1 rounded-lg"
              >
                수락
              </button>
              <button
                onClick={() => reject(req.followId)}
                className="bg-white border-2 border-gray-400 text-sm px-4 py-1 rounded-lg"
              >
                거절
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
