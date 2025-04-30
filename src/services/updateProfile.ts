import axiosInstance from "@/lib/axiosInstance";
import { apiEndpoint } from "@/app/shared/config/constants";

type UpdateProfileRequest = {
  nickname: string;
  profileVisibility: string;
  profileImage: File | null;
};

export async function updateProfile(payload: UpdateProfileRequest) {
  const formData = new FormData();

  const jsonBody = JSON.stringify({
    nickname: payload.nickname,
    accountScope: payload.profileVisibility.toUpperCase(),
  });

  formData.append(
    "profileRequest",
    new Blob([jsonBody], { type: "application/json" })
  );

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  try {
    const res = await axiosInstance.put(
      `${apiEndpoint}/v1/member/profile/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err.message || "프로필 수정 실패";
    throw new Error(`❌ ${errorMessage}`);
  }
}
