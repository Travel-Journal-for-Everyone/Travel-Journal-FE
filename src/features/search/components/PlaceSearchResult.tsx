"use client";

import { useSearch } from "../hooks/useSearch";
import Image from "next/image";

interface Props {
  keyword: string;
}

interface PlaceItem {
  placeId: number;
  title: string;
  region: string;
  thumbnailUrl: string;
}

export default function PlaceSearchResult({ keyword }: Props) {
  const { data, isLoading } = useSearch({ tab: "place", keyword });

  if (!keyword)
    return <p className="text-sm text-gray-400">검색어를 입력해주세요</p>;
  if (isLoading) return <p>검색 중...</p>;
  if (!data?.content.length)
    return <p className="text-sm text-gray-400">일치하는 장소가 없습니다</p>;

  return (
    <ul className="flex gap-2">
      {data.content.map((place: PlaceItem) => (
        <li key={place.placeId} className="flex flex-col gap-3  flex-1">
          <div className="relative w-full aspect-square">
            <Image
              src={place.thumbnailUrl || "/icons/default-place.png"}
              alt="place thumbnail"
              fill
              className="rounded-md object-cover "
            />
          </div>
          <div>
            <p className="font-medium">{place.title}</p>
            <p className="text-sm text-gray-500">{place.region}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
