"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation } from "../hooks/useLogin";

export default function GoogleTokenLogin() {
  const router = useRouter();
  const { mutate: loginWithGoogle } = useGoogleLoginMutation();

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={(response) => {
          const idToken = response.credential;
          if (!idToken) {
            console.error("❌ ID 토큰 없음");
            return;
          }

          loginWithGoogle(idToken, {
            onSuccess: (data) => {
              if (data.isFirstLogin) {
                router.push("/profile/setup");
              } else {
                router.push("/");
              }
            },
            onError: (err) => {
              console.error("❌ 로그인 실패:", err);
            },
          });
        }}
        onError={() => {
          console.log("Google 로그인 실패");
        }}
      />
    </div>
  );
}
