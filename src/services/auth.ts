import { useAuthStore } from "@/store/useAuthStore";

interface LoginResponse {
  memberId: number;
  isFirstLogin: boolean;
  refreshToken: string;
  deviceId: string;
}

export async function kakaoLoginRequest(code: string): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login/kakao/callback?code=${code}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("카카오 로그인 실패");
  }

  const data: LoginResponse = await res.json();
  console.log("🔍 로그인 API 응답 데이터:", data);

  const authHeader = res.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    throw new Error("Access Token이 응답 헤더에 없습니다.");
  }

  console.log("✅ 추출된 Access Token:", accessToken);

  const user = {
    id: data.memberId,
    refreshToken: data.refreshToken,
    deviceId: data.deviceId,
    isFirstLogin: data.isFirstLogin,
  };

  useAuthStore.getState().setAccessToken(accessToken);
  useAuthStore.getState().setUser(user);

  return data;
}
