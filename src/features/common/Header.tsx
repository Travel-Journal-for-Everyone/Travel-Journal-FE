"use client";

import Link from "next/link";
import { useMyInfo } from "@/features/member/hooks/useMemberInfo";
import Button from "./CommonBtn";
import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: member, isLoading } = useMyInfo();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="hidden md:block w-full bg-white shadow-gray-50 shadow-sm fixed top-0 left-0 z-50 py-4">
      <div className="md:mx-20 flex justify-between items-center ">
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
          {isClient && !isLoading && member ? (
            <>
              <Link href="/mypage" className="flex items-center gap-2">
                <Image
                  src={member.profileInfo.profileImageUrl}
                  alt="프로필"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
              <Link href="/search">
                <Search />
              </Link>
            </>
          ) : isClient && !isLoading ? (
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              로그인 / 회원가입
            </Link>
          ) : null}

          <Link href="/journal/write">
            <Button variant="outline" size="sm">
              글쓰기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
