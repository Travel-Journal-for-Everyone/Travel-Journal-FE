import EXIF from "exif-js";

export function extractLatLng(
  file: File
): Promise<{ lat?: number; lng?: number }> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EXIF.getData(file as any, function (this: any) {
      const lat = EXIF.getTag(this, "GPSLatitude");
      const lng = EXIF.getTag(this, "GPSLongitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lngRef = EXIF.getTag(this, "GPSLongitudeRef");

      if (lat && lng) {
        const latitude =
          (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "S" ? -1 : 1);
        const longitude =
          (lng[0] + lng[1] / 60 + lng[2] / 3600) * (lngRef === "W" ? -1 : 1);

        resolve({ lat: latitude, lng: longitude });
      } else {
        resolve({});
      }
    });
  });
}
