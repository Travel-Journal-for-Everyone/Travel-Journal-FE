import { setCookie } from "@/lib/cookieUtils";

interface LoginResponse {
  memberId: number;
  isFirstLogin: boolean;
  refreshToken: string;
  deviceId: string;
}

import { useAuthStore } from "@/store/useAuthStore"; // 👈 추가

export async function kakaoLoginRequest(code: string): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login/kakao/callback?code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Platform": "web",
      },
    }
  );

  if (!res.ok) throw new Error("카카오 로그인 실패");

  const data: LoginResponse = await res.json();
  const authHeader = res.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) throw new Error("Access Token이 없습니다.");

  const { refreshToken, deviceId, memberId } = data;

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
  setCookie("deviceId", deviceId);
  setCookie("memberId", memberId.toString());

  useAuthStore.getState().setMemberIdOnly(memberId);

  return data;
}

export async function googleLoginRequest(
  idToken: string
): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login/google/id-token`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "X-Platform": "web",
      },
    }
  );

  if (!res.ok) throw new Error("구글 로그인 실패");

  const data: LoginResponse = await res.json();
  const authHeader = res.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    throw new Error("Access Token이 응답 헤더에 없습니다.");
  }

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", data.refreshToken);
  setCookie("deviceId", data.deviceId);
  setCookie("memberId", data.memberId.toString());

  useAuthStore.getState().setMemberIdOnly(data.memberId);

  return data;
}
