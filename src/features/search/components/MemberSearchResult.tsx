import Image from "next/image";
import { useMemberSearch } from "../hooks/useSearchMember";

interface Props {
  keyword: string;
}

export default function MemberSearchResult({ keyword }: Props) {
  const { data, isLoading } = useMemberSearch({ keyword });

  if (!keyword)
    return <p className="text-sm text-gray-400">검색어를 입력해주세요</p>;
  if (isLoading) return <p>검색 중...</p>;

  return (
    <ul className="space-y-4 mt-2">
      {data?.content.map((member) => (
        <li key={member.memberId} className="flex items-center gap-3">
          <Image
            src={member.profileImageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
            width={16}
            height={16}
          />
          <div>
            <p className="font-medium">{member.nickname}</p>
            <p className="text-xs text-gray-500">✈️ 23 📍 77</p>{" "}
            {/* dummy로 표시 */}
          </div>
        </li>
      ))}
    </ul>
  );
}
