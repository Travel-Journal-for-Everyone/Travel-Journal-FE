import Image from "next/image";

interface JournalCardProps {
  journalId: number;
  title: string;
  hashTag: string[];
  startDate: string;
  endDate: string;
  region: string;
  nights: number;
  days: number;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

export default function ExploreCard({
  title,
  hashTag,
  startDate,
  endDate,
  region,
  thumbnailUrl,
  likeCount,
  commentCount,
  nickname,
  profileImageUrl,
}: JournalCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border bg-white">
      <div className="relative aspect-square">
        <div className="absolute z-10 flex items-center gap-2 w-full backdrop-blur-sm p-4">
          <Image
            src={profileImageUrl}
            alt={nickname}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="font-medium text-white drop-shadow">{nickname}</span>
        </div>

        <Image
          src={thumbnailUrl}
          alt="journal thumbnail"
          fill
          className="object-cover z-0"
        />

        <div className="flex flex-wrap gap-2 absolute z-10 bottom-0 left-0 p-4">
          {hashTag.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-light bg-primary-main text-white px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 pt-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mb-1">
          {startDate} ~ {endDate}
        </p>

        <p className="text-xs text-gray-600 mb-2">{region}</p>

        <div className="text-xs text-gray-400 flex gap-4">
          <span>좋아요 {likeCount}</span>
          <span>댓글 {commentCount}</span>
        </div>
      </div>
    </div>
  );
}
