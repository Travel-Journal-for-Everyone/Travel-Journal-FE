import { ImageMeta } from "@/features/jorunal/hooks/useCreateJournal";

export function generateJournalDaySpots(imagesWithMeta: ImageMeta[]) {
  const uniqueSpots: {
    lat: number;
    lng: number;
    name: string;
  }[] = [];

  for (const img of imagesWithMeta) {
    if (!img.lat || !img.lng) continue;

    const alreadyExists = uniqueSpots.some(
      (spot) =>
        Math.abs(spot.lat - img.lat!) < 0.00001 &&
        Math.abs(spot.lng - img.lng!) < 0.00001
    );

    if (!alreadyExists) {
      uniqueSpots.push({
        lat: img.lat,
        lng: img.lng,
        name: img.keyword ?? "이름 없는 장소",
      });
    }
  }

  return uniqueSpots.map((spot, index) => ({
    spotOrder: index + 1,
    spotName: spot.name,
    latitude: spot.lat,
    longitude: spot.lng,
  }));
}
