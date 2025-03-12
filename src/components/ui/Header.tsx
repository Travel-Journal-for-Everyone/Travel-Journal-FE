import Link from "next/link";
// import Image from "next/image";
import Button from "./CommonBtn";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-bborder-gray-200 fixed top-0 left-0 z-50 py-4">
      <div className="md:mx-auto flex justify-between items-center py-1 px-2 md:px-6">
        {/* 왼쪽 로고 */}
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            모두의 여행일지
          </Link>

          {/* 중앙 네비게이션 */}
          <nav className="hidden md:flex gap-6 text-gray-600">
            <Link href="/my-journal" className="hover:text-gray-900">
              나의 일지
            </Link>
            <Link href="/explore" className="hover:text-gray-900">
              탐험하기
            </Link>
          </nav>
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 로그인/회원가입 */}
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            로그인 / 회원가입
          </Link>

          {/* 검색 아이콘 */}
          {/* <button className="p-2 rounded-full hover:bg-gray-100">
            <Image src="/icons/search.svg" alt="검색" width={20} height={20} />
          </button> */}

          {/* 글쓰기 버튼 */}
          <Button variant="outline" size="sm">
            {/* <Image
              src="/icons/write.svg"
              alt="글쓰기"
              width={16}
              height={16}
              className="mr-1"
            /> */}
            글쓰기
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
