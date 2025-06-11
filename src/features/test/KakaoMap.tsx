"use client";

import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";

interface Place {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

export default function KakaoMap({ places }: { places: Place[] }) {
  const center = places.length
    ? { lat: places[0].lat, lng: places[0].lng }
    : { lat: 37.5665, lng: 126.978 };

  return (
    <Map center={center} style={{ width: "100%", height: "100%" }} level={5}>
      {/* 마커들 */}
      {places.map((place, idx) => (
        <CustomOverlayMap
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
        >
          <div
            style={{
              backgroundColor: "#A55FF5", // 보라색
              color: "white",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {String.fromCharCode(65 + idx)} {/* A, B, C... */}
          </div>
        </CustomOverlayMap>
      ))}

      {places.length > 1 && (
        <Polyline
          path={places.map((p) => ({
            lat: p.lat,
            lng: p.lng,
          }))}
          strokeWeight={2}
          strokeColor="#A55FF5"
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
      )}
    </Map>
  );
}
