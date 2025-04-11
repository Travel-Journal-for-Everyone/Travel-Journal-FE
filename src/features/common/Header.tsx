"use client";

import Link from "next/link";
import { useMemberInfo } from "@/features/member/hooks/useMemberInfo";
import Button from "./CommonBtn";
import Image from "next/image";

const Header = () => {
  const { data: member, isLoading } = useMemberInfo();

  return (
    <header className="w-full bg-white shadow-sm border-bborder-gray-200 fixed top-0 left-0 z-50 py-4">
      <div className="md:mx-20 flex justify-between items-center py-1 px-2 md:px-6">
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            모두의 여행일지
          </Link>
          <nav className="hidden md:flex gap-6 text-gray-600">
            <Link href="/my-journal" className="hover:text-gray-900">
              나의 일지
            </Link>
            <Link href="/explore" className="hover:text-gray-900">
              탐험하기
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* 조건부 렌더링 */}
          {isLoading ? null : member ? (
            <Link href="/mypage" className="flex items-center gap-2">
              <Image
                src={member.profileInfo.profileImageUrl}
                alt="프로필"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700">
                {member.profileInfo.nickname}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              로그인 / 회원가입
            </Link>
          )}

          <Button variant="outline" size="sm">
            글쓰기
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
