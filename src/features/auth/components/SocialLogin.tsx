import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../hooks/useLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();
  const { mutate: loginWithGoogle } = useGoogleLoginMutation();

  const handleKakaoLogin = () => {
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
    window.location.href = url;
  };

  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = "openid profile email";

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <div className="flex flex-col space-y-3">
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

      <span>callback 방식</span>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center bg-white text-black border p-3 rounded w-full"
      >
        <Image
          src="/sns/google.png"
          alt="Google 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        Google 로그인
      </button>
      {/* Apple Login 버튼 UI용 */}
      {/* <button className="flex items-center justify-center bg-black text-white p-3 rounded w-full">
        <Image
          src="/sns/apple.png"
          alt="Apple 로그인"
          width={24}
          height={24}
          className="mr-2"
        />
        Apple 로그인
      </button> */}
    </div>
  );
}
