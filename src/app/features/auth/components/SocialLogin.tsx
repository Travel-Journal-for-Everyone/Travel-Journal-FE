"use client";

export default function SocialLogin() {
  const handleKakaoLogin = async () => {
    try {
      console.log("🟡 Kakao Login 버튼 클릭됨");

      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;

      console.log("카카오 로그인 요청 완료");
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="bg-yellow-400 p-3 rounded w-full"
    >
      🟡 카카오 로그인
    </button>
  );
}
