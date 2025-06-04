import { setCookie } from "@/lib/cookieUtils";
import { useAuthStore } from "@/store/useAuthStore";

export interface LoginResponse {
  memberId: number;
  isFirstLogin: boolean;
  refreshToken: string;
  deviceId: string;
}

export async function socialLoginCallbackRequest({
  code,
  provider,
  deviceId,
}: {
  code: string;
  provider: "google" | "kakao" | "apple";
  deviceId?: string;
}): Promise<LoginResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login/${provider}/callback`
  );

  if (!url.searchParams.has("code")) {
    url.searchParams.append("code", code);
  }
  if (deviceId) url.searchParams.append("deviceId", deviceId);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Platform": "web",
      // "Login-Test": "false",
      // 배포시에는 제외
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`로그인 실패: ${text}`);
  }

  const data: LoginResponse = await res.json();

  const authHeader = res.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    throw new Error("Access Token이 응답 헤더에 없습니다.");
  }

  // 쿠키 저장
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", data.refreshToken);
  setCookie("deviceId", data.deviceId);
  setCookie("memberId", data.memberId.toString());
  useAuthStore.getState().setMemberIdOnly(data.memberId);

  return data;
}
