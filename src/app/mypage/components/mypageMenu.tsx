import Link from "next/link";

const menuItems = [
  { label: "프로필 수정", href: "/mypage/edit-profile" },
  { label: "돌아오고 싶은 여행 일지", href: "/mypage/favorite-journals" },
  { label: "저장한 여행 일지", href: "/mypage/saved-journals" },
  { label: "계정 정보 관리", href: "/mypage/account" },
  { label: "사용자 설정", href: "/mypage/settings" },
];

export default function MyPageMenu() {
  return (
    <ul className="divide-y divide-gray-200">
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="block px-4 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
