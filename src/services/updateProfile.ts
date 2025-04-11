import { apiEndpoint } from "@/app/shared/config/constants";

interface UpdateProfilePayload {
  nickname: string;
  profileVisibility: string;
  profileImage?: File | null;
  accessToken: string;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const formData = new FormData();

  const jsonBody = JSON.stringify({
    nickname: payload.nickname,
    accountScope: payload.profileVisibility.toUpperCase(),
  });

  // ✅ 서버 요구사항을 만족시키기 위해 항상 포함
  formData.append(
    "profileRequest",
    new Blob([jsonBody], { type: "application/json" })
  );

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  const res = await fetch(`${apiEndpoint}/v1/member/profile/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로필 수정 실패: ${error}`);
  }

  return res;
}
