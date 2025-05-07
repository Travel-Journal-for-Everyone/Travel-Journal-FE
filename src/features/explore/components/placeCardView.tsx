import Image from "next/image";

interface PlaceCardProps {
  placeId: number;
  title: string;
  region: string;
  thumbnailUrl?: string;
}

export default function PlaceCard({
  //   placeId,
  title,
  region,
  thumbnailUrl,
}: PlaceCardProps) {
  return (
    <div>
      <div className="relative rounded-lg overflow-hidden  bg-white aspect-square">
        <Image
          src={thumbnailUrl || "/images/default-place.jpg"}
          alt="place thumbnail"
          fill
          className="object-cover absolute"
        />
      </div>
      <h3 className="text-lg font-semibold truncate mt-2 mb-1">{title}</h3>
      <p className="text-md text-gray-500">{region}</p>
    </div>
  );
}
