import axiosInstance from "@/lib/axiosInstance";

export async function saveProfile(
  nickname: string,
  profileVisibility: string,
  profileImage: File | null
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

  const res = await axiosInstance.post(
    "/v1/member/complete-first-login",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}
