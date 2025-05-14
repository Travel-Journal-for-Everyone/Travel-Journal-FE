"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearch } from "../hooks/useSearch";

interface Props {
  keyword: string;
}

interface MemberItem {
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  travelDiaryCount: number;
  placesCount: number;
}

export default function MemberSearchResult({ keyword }: Props) {
  const { data, isLoading } = useSearch({ tab: "member", keyword });

  if (!keyword) {
    return <p className="text-sm text-gray-400">검색어를 입력해주세요</p>;
  }

  if (isLoading) {
    return <p>검색 중...</p>;
  }

  if (!data?.content.length) {
    return <p className="text-sm text-gray-400">일치하는 사용자가 없습니다</p>;
  }

  return (
    <ul className="space-y-4 mt-2">
      {data.content.map((member: MemberItem) => (
        <Link
          className="flex items-center gap-3 my-2"
          key={member.memberId}
          href={`/member/${member.memberId}`}
        >
          <Image
            src={member.profileImageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <p className="font-medium">{member.nickname}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/Icon-paper-gray-18px.svg"
                  alt="Diary"
                  width={16}
                  height={16}
                />
                <span>{member.travelDiaryCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/Icon-pin-gray-18px.svg"
                  alt="Place"
                  width={16}
                  height={16}
                />
                <span>{member.placesCount}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
