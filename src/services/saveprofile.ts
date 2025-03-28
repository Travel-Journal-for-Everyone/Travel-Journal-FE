import { apiEndpoint } from "@/app/shared/constants";

export async function saveProfile(
  nickname: string,
  profileVisibility: string,
  profileImage: File | null,
  accessToken: string
) {
  const formData = new FormData();

  const jsonBody = JSON.stringify({
    nickname,
    accountScope: profileVisibility.toUpperCase(),
  });
  formData.append(
    "firstLoginRequest",
    new Blob([jsonBody], { type: "application/json" })
  );

  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const res = await fetch(`${apiEndpoint}/v1/member/complete-first-login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로필 저장 실패: ${error}`);
  }

  return res.json();
}
