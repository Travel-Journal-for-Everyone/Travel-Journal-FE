import EXIF from "exif-js";

export function extractLatLngAndDate(file: File): Promise<{
  lat?: number;
  lng?: number;
  takenDateTime?: string;
}> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EXIF.getData(file as any, function (this: any) {
      const lat = EXIF.getTag(this, "GPSLatitude");
      const lng = EXIF.getTag(this, "GPSLongitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      const dateTime = EXIF.getTag(this, "DateTimeOriginal");

      let latitude, longitude;
      if (lat && lng) {
        latitude =
          (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "S" ? -1 : 1);
        longitude =
          (lng[0] + lng[1] / 60 + lng[2] / 3600) * (lngRef === "W" ? -1 : 1);
      }

      resolve({
        lat: latitude,
        lng: longitude,
        takenDateTime: dateTime
          ? dateTime.replace(/:/g, ".").replace(" ", " ")
          : undefined,
      });
    });
  });
}
