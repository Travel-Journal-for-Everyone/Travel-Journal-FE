import { useMutation } from "@tanstack/react-query";
import { checkNickname } from "@/services/checknickname";
import { saveProfile } from "@/services/saveprofile";
import { useRouter } from "next/navigation";

export function useProfile() {
  const router = useRouter();

  const checkNicknameMutation = useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
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
    }) => saveProfile(nickname, profileVisibility, profileImage),
    onSuccess: () => {
      router.push("/profile/welcome");
    },
    onError: (error) => {
      console.error("프로필 저장 실패:", error);
    },
  });

  return { checkNicknameMutation, saveProfileMutation };
}
