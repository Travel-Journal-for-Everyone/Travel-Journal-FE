"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { extractLatLngAndDate } from "@/lib/extractLatLng";
import { getLocationNameAsync, searchPlace, waitForKakaoMaps } from "@/services/geoLoactionName";
import { uploadPhotos } from "@/services/photo";

interface ImageMeta {
  file: File | null;
  lat?: number;
  lng?: number;
  keyword?: string;
  takenDateTime: string;
  address?: string;
  photoUrl?: string;
  uploadId?: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (images: ImageMeta[]) => void;
  initialImages?: ImageMeta[];
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (images: ImageMeta[]) => void;
}

export default function ImageUploaderModal({ isOpen, onClose, onSave, initialImages }: Props) {
  const [imagesWithMeta, setImagesWithMeta] = useState<ImageMeta[]>([]);
  const [tempKeywords, setTempKeywords] = useState<Record<string, string>>({});
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setImagesWithMeta(initialImages);
    }
  }, [initialImages]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      imagesWithMeta.forEach((img) => {
        if (img.file instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(img.file)); // cleanup
        }
      });
    };
  }, [imagesWithMeta]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // ✅ Kakao SDK 준비를 기다림
    await waitForKakaoMaps();

    const updatedImages = await Promise.all(
      fileArray.map(async (file) => {
        const extracted = await extractLatLngAndDate(file);

        let locationName = "";
        if (extracted.lat && extracted.lng) {
          locationName = await getLocationNameAsync(extracted.lat, extracted.lng);
        }

        return {
          file,
          lat: extracted.lat,
          lng: extracted.lng,
          keyword: locationName,
          takenDateTime: extracted.takenDateTime ?? "",
          address: locationName,
        } satisfies ImageMeta;
      })
    );

    setImagesWithMeta((prev) => [...prev, ...updatedImages]);
  };

  const handleSave = async () => {
    const hasEmptyKeyword = imagesWithMeta.some((img) => !img.keyword || img.keyword === "위치명 없음");
    if (hasEmptyKeyword) {
      alert("위치명이 없는 사진이 있습니다. 모든 사진에 위치명을 입력해주세요.");
      return;
    }

    try {
      // 1) 신규 파일만 뽑기
      const newItems = imagesWithMeta.map((img, idx) => ({ img, idx })).filter(({ img }) => img.file instanceof File);

      // 신규 파일이 하나도 없으면 업로드 안 하고 그대로 반환(수정 모드에서 많이 발생)
      if (newItems.length === 0) {
        console.log("📤 신규 파일 없음 → 기존+메타만 부모에 전달");
        onSave(imagesWithMeta);
        onClose();
        return;
      }

      // 2) 업로드 호출
      const files = newItems.map(({ img }) => img.file as File);
      console.log(
        "📤 업로드할 파일:",
        files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
      );
      const uploadResult = await uploadPhotos(files);
      console.log("✅ 업로드 응답:", uploadResult);

      // 3) 응답 매핑 — index 기반 매칭 (서버가 파일명 매칭을 보장하지 않으면 이 방법이 안전)
      if (uploadResult.length !== newItems.length) {
        throw new Error(`업로드 응답 개수(${uploadResult.length})와 요청 파일 개수(${newItems.length})가 다릅니다.`);
      }

      // 업로드된 항목을 원래 자리(index)에 반영
      const merged = [...imagesWithMeta];
      newItems.forEach(({ idx }, i) => {
        const { uploadId, uploadFilename } = uploadResult[i]; // 서버 형식에 맞게 사용
        merged[idx] = {
          ...merged[idx],
          // file은 남겨두어도 무방하지만, 부모/서버 페이로드엔 보통 필요 없음
          uploadId,
          // 선택: 서버가 기대하면 유지
          // @ts-expect-error (타입에 없으면 추가)
          uploadFilename,
        };
      });

      // 4) 최종(기존 + 신규) 모두 부모로 전달
      onSave(merged);
      onClose();
    } catch (error) {
      console.error("❌ 업로드 실패:", error);
      alert("사진 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-screen-sm min-h-[60dvh] flex flex-col">
        <h3 className="font-semibold text-lg text-center pb-4">여행 사진 업로드</h3>

        <div className="grid grid-cols-4 gap-2">
          {/* 이미지 추가 버튼 */}
          <label className="aspect-square border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200">
            <Plus className="w-6 h-6 text-gray-500" />
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </label>

          {/* 이미지 미리보기 */}
          {imagesWithMeta.map((img, index) => {
            const imageSrc = img.file instanceof File ? URL.createObjectURL(img.file) : img.photoUrl ?? "";

            return (
              <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                {imageSrc ? (
                  <Image src={imageSrc} alt={`uploaded-${index}`} fill className="object-cover" />
                ) : (
                  <div className="text-sm text-gray-400">이미지 없음</div>
                )}

                {/* 좌측 상단 번호 */}
                <div className="absolute top-1 left-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </div>

                {/* 삭제 버튼 */}
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={() => {
                    setImagesWithMeta((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* 사진 없을 때 안내문구 */}
        {imagesWithMeta.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-400">사진을 추가해주세요.</div>
        )}

        {/* 위치명 입력 및 지정 완료 */}
        {imagesWithMeta.length > 0 && (
          <ul className="mt-12 text-gray-700 pl-2 space-y-2">
            {imagesWithMeta.map((img, idx) => (
              <li key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span>{idx + 1}.</span>
                  {img.keyword && img.keyword !== "위치명 없음" ? (
                    <span>{img.keyword}</span>
                  ) : (
                    <div className="flex gap-1 items-center flex-1">
                      <div className="relative flex items-center flex-1 border rounded border-gray-200 focus-within:border-purple-500">
                        <span className="text-red-500">❗</span>
                        <input
                          type="text"
                          placeholder="위치명을 입력해주세요"
                          className="bg-transparent focus:outline-none py-0.5 flex-1"
                          value={tempKeywords[idx] || ""}
                          onChange={(e) => {
                            const keyword = e.target.value;
                            setTempKeywords((prev) => ({
                              ...prev,
                              [idx]: keyword,
                            }));
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        className="bg-purple-500 text-white px-1 py-0.5 rounded"
                        onClick={() => {
                          const keyword = tempKeywords[idx];
                          if (!keyword) return;

                          searchPlace(keyword, (lat, lng, address) => {
                            setImagesWithMeta((prev) =>
                              prev.map((image, i) =>
                                i === idx
                                  ? {
                                      ...image,
                                      keyword,
                                      lat,
                                      lng,
                                      address,
                                      takenDateTime: image.takenDateTime,
                                    }
                                  : image
                              )
                            );
                          });
                          setTempKeywords((prev) => {
                            const newTemp = { ...prev };
                            delete newTemp[idx];
                            return newTemp;
                          });
                        }}
                      >
                        위치 저장
                      </button>
                    </div>
                  )}
                </div>

                {img.takenDateTime ? (
                  <div className="ml-5 text-xs text-gray-500">
                    {img.address && <div className="mb-0.5">도로명주소: {img.address}</div>}
                    <div>촬영일시: {img.takenDateTime}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 ml-5">
                    <span className="text-red-500 text-xs">❗</span>
                    <input
                      type="date"
                      className="border px-1 py-0.5 rounded text-xs"
                      value={tempKeywords[`date-${idx}-date`] || ""}
                      onChange={(e) => {
                        setTempKeywords((prev) => ({
                          ...prev,
                          [`date-${idx}-date`]: e.target.value,
                        }));
                      }}
                    />
                    <input
                      type="time"
                      className="border px-1 py-0.5 rounded text-xs"
                      value={tempKeywords[`date-${idx}-time`] || ""}
                      onChange={(e) => {
                        setTempKeywords((prev) => ({
                          ...prev,
                          [`date-${idx}-time`]: e.target.value,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      className="bg-purple-500 text-white px-2 py-0.5 rounded"
                      onClick={() => {
                        const date = tempKeywords[`date-${idx}-date`];
                        const time = tempKeywords[`date-${idx}-time`] || "00:00";
                        if (!date) return;

                        const formatted = `${date.replaceAll("-", ".")} ${time}`;
                        setImagesWithMeta((prev) =>
                          prev.map((image, i) => (i === idx ? { ...image, takenDateTime: formatted } : image))
                        );

                        setTempKeywords((prev) => {
                          const newTemp = { ...prev };
                          delete newTemp[`date-${idx}-date`];
                          delete newTemp[`date-${idx}-time`];
                          return newTemp;
                        });
                      }}
                    >
                      저장
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 하단 버튼 */}
        <div className="flex mt-auto gap-2 pb-[env(safe-area-inset-bottom)]">
          <button onClick={onClose} className="text-gray-500 text-sm flex-1 rounded bg-gray-300">
            취소
          </button>
          <button onClick={handleSave} className="bg-purple-500 text-white text-sm px-3 py-2 rounded flex-1">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
