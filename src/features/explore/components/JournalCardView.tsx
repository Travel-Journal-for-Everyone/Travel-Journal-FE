import Image from "next/image";

interface JournalCardProps {
  journalId: number;
  title: string;
  hashTag: string[];
  startDate: string;
  endDate: string;
}

export default function JournalCard({
  //   journalId,
  title,
  hashTag,
  startDate,
  endDate,
}: JournalCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border bg-white">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src="/Avatars/3d_avatar_1.png"
          alt="journal thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* 본문 영역 */}
      <div className="p-4">
        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mb-2">
          {hashTag.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="text-sm font-semibold truncate mb-1">{title}</h3>

        <p className="text-xs text-gray-500">
          {startDate} ~ {endDate}
        </p>

        {/* <div className="flex items-center gap-4 text-gray-400 mt-3 text-sm">
          <span>♡</span>
          <span>💬</span>
        </div> */}
      </div>
    </div>
  );
}
