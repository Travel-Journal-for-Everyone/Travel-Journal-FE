import { apiEndpoint } from "@/app/shared/constants";

export async function saveProfile(
  nickname: string,
  profileVisibility: string,
  profileImage: File | null,
  accessToken: string
) {
  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("profileVisibility", profileVisibility);
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const response = await fetch(
    `${apiEndpoint}/v1/member/complete-first-login`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("프로필 저장 실패");
  }

  return response.json(); // ✅ 성공 응답 반환
}
