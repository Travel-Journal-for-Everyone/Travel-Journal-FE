"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileEdit } from "./hooks/useProfileEdit";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileEdit() {
  const router = useRouter();

  const profileInfo = useAuthStore((state) => state.profileInfo);
  const accessToken = useAuthStore.getState().accessToken;

  const [nickname, setNickname] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    checkNicknameMutation,
    updateProfileMutation,
    isNicknameValid,
    setIsNicknameValid,
  } = useProfileEdit();

  useEffect(() => {
    if (profileInfo) {
      setNickname(profileInfo.nickname);
      setProfileVisibility(profileInfo.accountScope.toLowerCase());
      setPreview(profileInfo.profileImageUrl);
    }
  }, [profileInfo]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameValid(null); // 변경 시 중복확인 초기화
  };

  const checkNicknameAvailability = async () => {
    if (!nickname.trim()) return;
    try {
      const data = await checkNicknameMutation.mutateAsync(nickname);
      setIsNicknameValid(data.success);
    } catch (error) {
      console.error("❌ 닉네임 중복 확인 오류:", error);
      setIsNicknameValid(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken || !profileInfo) {
      alert("로그인이 필요합니다.");
      return;
    }

    const nicknameChanged =
      nickname.trim() && nickname !== profileInfo.nickname;
    const visibilityChanged =
      profileVisibility.toUpperCase() !== profileInfo.accountScope;
    const imageChanged = !!profileImage;

    if (!nicknameChanged && !visibilityChanged && !imageChanged) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    if (nicknameChanged && !isNicknameValid) {
      alert("닉네임 중복 확인이 필요합니다.");
      return;
    }

    updateProfileMutation.mutate(
      {
        nickname,
        profileVisibility,
        profileImage: imageChanged ? profileImage : null,
        accessToken,
      },
      {
        onSuccess: () => {
          const updatedProfileImageUrl = imageChanged
            ? preview
            : useAuthStore.getState().profileInfo?.profileImageUrl ?? "";

          useAuthStore.getState().setProfileInfo({
            nickname,
            accountScope: profileVisibility.toUpperCase() as
              | "PUBLIC"
              | "FRIENDS"
              | "PRIVATE",
            profileImageUrl: updatedProfileImageUrl,
          });

          alert("✅ 프로필이 저장되었습니다!");
          router.push("/mypage");
        },
        onError: (err) => {
          console.error("❌ 프로필 저장 실패:", err);
          alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleProfileSubmit}
        className="w-full p-8 rounded-lg flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-semibold">프로필 수정</h2>

        <label className="relative cursor-pointer">
          <div className="w-24 h-24 rounded-full border overflow-hidden flex items-center justify-center bg-gray-200">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
                width={96}
                height={96}
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
              className={`px-3 py-2 rounded min-w-32 ${
                checkNicknameMutation.isPending
                  ? "bg-gray-400"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={checkNicknameMutation.isPending}
            >
              {checkNicknameMutation.isPending ? "확인 중..." : "중복 확인"}
            </button>
          </div>
          {isNicknameValid === false && (
            <p className="text-red-500 text-sm mt-1">
              이미 사용 중인 아이디입니다.
            </p>
          )}
          {isNicknameValid === true && (
            <p className="text-green-500 text-sm mt-1">
              사용 가능한 닉네임입니다.
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-600">프로필 공개 범위</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="border p-2 w-full rounded outline-none"
          >
            <option value="public">전체 공개</option>
            <option value="friends">친구 공개</option>
            <option value="private">비공개</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white rounded ${
            updateProfileMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "저장 중..." : "작성 완료"}
        </button>
      </form>
    </div>
  );
}
