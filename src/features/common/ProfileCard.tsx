"use client";

import Image from "next/image";
import { Globe, Lock, User } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  memberId?: number;
  nickname?: string;
  profileImageUrl: string;
  accountScope?: "PUBLIC" | "FRIENDS" | "PRIVATE";
  followerCount: number;
  followingCount: number;
  travelDiaryCount: number;
  placesCount: number;
  mobile: boolean;
}

export default function ProfileCard({
  memberId,
  nickname,
  profileImageUrl,
  accountScope,
  followerCount,
  followingCount,
  travelDiaryCount,
  placesCount,
  mobile,
}: ProfileCardProps) {
  const scopeIcon =
    accountScope === "PUBLIC" ? (
      <Globe className="w-4 h-4" />
    ) : accountScope === "FRIENDS" ? (
      <User className="w-4 h-4" />
    ) : (
      <Lock className="w-4 h-4" />
    );

  const containerClass = mobile ? "md:hidden " : "visible";

  return (
    <div
      className={`${containerClass} max-w-full flex items-center gap-10 mx-auto my-4`}
    >
      <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden">
        <Image
          src={profileImageUrl || "/default-avatar.png"}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="text-base font-semibold">{nickname}</h2>
          {!accountScope ? <span></span> : <span> {scopeIcon}</span>}
        </div>
        <dl className="flex justify-between text-center md:text-base text-sm">
          <Link href={`/follow/${memberId}`}>
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">팔로워</dt>
              <dd className="font-semibold">{followerCount}</dd>
            </div>
          </Link>
          <Link href={`/follow/${memberId}`}>
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">팔로잉</dt>
              <dd className="font-semibold">{followingCount}</dd>
            </div>
          </Link>
          <div>
            <dt className="text-gray-500">여행 일지</dt>
            <dd className="font-bold">{travelDiaryCount}</dd>
          </div>
          <div>
            <dt className="text-gray-500">플레이스</dt>
            <dd className="font-bold">{placesCount}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
