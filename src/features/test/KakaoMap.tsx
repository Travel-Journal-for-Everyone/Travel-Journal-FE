"use client";

import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useEffect, useRef } from "react";

interface Place {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

export default function KakaoMap({ places, visible }: { places: Place[]; visible: boolean }) {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const center = places.length ? { lat: places[0].lat, lng: places[0].lng } : { lat: 37.5665, lng: 126.978 };

  // 슬라이드 전환으로 visible이 true가 될 때 지도 리사이즈 트리거
  useEffect(() => {
    if (visible && mapRef.current) {
      kakao.maps.event.trigger(mapRef.current, "resize");
    }
  }, [visible]);

  return (
    <Map
      center={center}
      style={{ width: "100%", height: "100%" }}
      level={5}
      onCreate={(map) => {
        mapRef.current = map;
      }}
    >
      {/* 마커들 */}
      {places.map((place, idx) => (
        <CustomOverlayMap key={place.id} position={{ lat: place.lat, lng: place.lng }}>
          <div
            style={{
              backgroundColor: "#A55FF5",
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
            {String.fromCharCode(65 + idx)}
          </div>
        </CustomOverlayMap>
      ))}

      {/* 선 */}
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
