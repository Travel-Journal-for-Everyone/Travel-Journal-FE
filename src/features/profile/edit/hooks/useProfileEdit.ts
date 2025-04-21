import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkNickname } from "@/services/checknickname";
import { updateProfile } from "@/services/updateProfile";

export function useProfileEdit() {
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const checkNicknameMutation = useMutation({
    mutationFn: async (nickname: string) => {
      const result = await checkNickname(nickname);
      const isValid = result.status === "valid";
      setIsNicknameValid(isValid);
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
