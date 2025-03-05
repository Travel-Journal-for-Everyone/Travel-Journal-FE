"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSetup() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameValid(true); // 입력 중에는 에러 메시지 숨기기
  };

  const checkNicknameAvailability = () => {
    // ✅ 닉네임 중복 확인 API 요청 (더미 처리)
    if (nickname === "지지") {
      setIsNicknameValid(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file)); // ✅ 미리보기 URL 생성
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNicknameValid || nickname.trim() === "") return;

    // ✅ FormData를 이용해 프로필 정보 저장 API 호출 (예시)
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("profileVisibility", profileVisibility);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    console.log("✅ 프로필 저장 완료:", Object.fromEntries(formData.entries()));

    router.push("/profile/welcome"); // ✅ Welcome 페이지로 이동
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleProfileSubmit}
        className="w-full  p-8 rounded-lg flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-semibold">프로필 작성</h2>

        <label className="relative cursor-pointer">
          <div className="w-24 h-24 rounded-full border overflow-hidden flex items-center justify-center bg-gray-200">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 absolute bottom-0 right-0">
                📷
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="w-full">
          <label className="block text-gray-600">닉네임</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="border p-2 w-full rounded"
            />
            <button
              type="button"
              onClick={checkNicknameAvailability}
              className="bg-gray-300 px-3 py-2 rounded min-w-32"
            >
              중복 확인
            </button>
          </div>
          {!isNicknameValid && (
            <p className="text-red-500 text-sm mt-1">
              이미 사용 중인 아이디입니다.
            </p>
          )}
        </div>

        {/* ✅ 프로필 공개 범위 선택 */}
        <div className="w-full">
          <label className="block text-gray-600">프로필 공개 범위</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="border p-2 w-full rounded outline-none"
          >
            <option value="public">전체 공개</option>
            <option value="private">비공개</option>
          </select>
        </div>

        {/* ✅ 작성 완료 버튼 */}
        <button
          type="submit"
          className={`w-full py-2 text-white rounded ${
            nickname.trim() !== "" && isNicknameValid
              ? "bg-blue-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
}
