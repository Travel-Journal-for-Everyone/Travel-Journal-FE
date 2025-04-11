import { apiEndpoint } from "@/app/shared/config/constants";
import { useMutation } from "@tanstack/react-query";

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: async (idToken: string) => {
      const response = await fetch(
        `${apiEndpoint}/v1/auth/login/google/id-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "X-Platform": "web",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      return response.json();
    },
  });
};
