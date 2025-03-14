"use client";

import { useMutation } from "@tanstack/react-query";
import { checkNickname } from "@/services/checknickname";
import { saveProfile } from "@/services/saveprofile";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useProfile() {
  const router = useRouter();
  const accessToken = useAuthStore.getState().accessToken;

  const checkNicknameMutation = useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname, accessToken!),
  });

  const saveProfileMutation = useMutation({
    mutationFn: ({
      nickname,
      profileVisibility,
      profileImage,
    }: {
      nickname: string;
      profileVisibility: string;
      profileImage: File | null;
    }) => saveProfile(nickname, profileVisibility, profileImage, accessToken!),
    onSuccess: () => {
      console.log("프로필 저장 성공!");
      router.push("/profile/welcome");
    },
    onError: (error) => {
      console.error("프로필 저장 실패:", error);
    },
  });

  return { checkNicknameMutation, saveProfileMutation };
}
