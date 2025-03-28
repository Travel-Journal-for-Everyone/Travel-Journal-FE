import { apiEndpoint } from "@/app/shared/constants";

export async function checkNickname(nickname: string, accessToken: string) {
  const res = await fetch(
    `${apiEndpoint}/v1/member/check-nickname/${nickname}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("닉네임 중복 체크 요청 실패");
  }

  return res.json();
}
