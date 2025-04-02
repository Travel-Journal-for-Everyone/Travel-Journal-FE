import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../hooks/useLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();
  const { mutate: loginWithGoogle } = useGoogleLoginMutation();

  const handleKakaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Kakao Login */}
      <button
        onClick={handleKakaoLogin}
        className="flex items-center justify-center bg-yellow-400 p-3 rounded w-full"
      >
        <Image
          src="/sns/kakao.png"
          alt="카카오 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        카카오 로그인
      </button>

      {/* Google Login (ID Token 기반) */}
      <div className="w-full">
        <GoogleLogin
          onSuccess={(response) => {
            const idToken = response.credential;
            if (!idToken) {
              console.error("ID 토큰 없음");
              return;
            }

            loginWithGoogle(idToken, {
              onSuccess: (data) => {
                console.log("✅ 로그인 성공:", data);

                // 라우팅 분기 처리
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

      {/* Apple Login 버튼 UI용 */}
      <button className="flex items-center justify-center bg-black text-white p-3 rounded w-full">
        <Image
          src="/sns/apple.png"
          alt="Apple 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        Apple 로그인
      </button>
    </div>
  );
}
