import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkNickname } from "@/services/checknickname";
import { updateProfile } from "@/services/updateProfile";
import { useAuthStore } from "@/store/useAuthStore";

export function useProfileEdit() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const checkNicknameMutation = useMutation({
    mutationFn: async (nickname: string) => {
      if (!accessToken) throw new Error("accessToken 없음");
      const result = await checkNickname(nickname, accessToken);
      setIsNicknameValid(result.success);
      return result;
    },
    onError: () => setIsNicknameValid(false),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
  });

  return {
    checkNicknameMutation,
    updateProfileMutation,
    isNicknameValid,
    setIsNicknameValid,
  };
}
