import Image from "next/image";
import { useMemberSearch } from "../hooks/useSearchMember";
import Link from "next/link";

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
        <Link
          className="flex items-center gap-3 my-2"
          key={member.memberId}
          href={`member/${member.memberId}`}
        >
          <Image
            src={member.profileImageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
            width={16}
            height={16}
          />
          <p className="font-medium">{member.nickname}</p>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/Icon-paper-gray-18px.svg"
              alt="Diary"
              width={16}
              height={16}
            />
            <span className="text-gray-500">{member.travelDiaryCount}</span>
            <Image
              src="/icons/Icon-pin-gray-18px.svg"
              alt="profile"
              width={16}
              height={16}
            />
            <span className="text-gray-500">{member.placesCount}</span>
          </div>
        </Link>
      ))}
    </ul>
  );
}
