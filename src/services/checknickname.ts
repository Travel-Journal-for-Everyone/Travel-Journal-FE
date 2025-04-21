import axiosInstance from "@/lib/axiosInstance";

export async function checkNickname(
  nickname: string
): Promise<{ status: "duplicate" | "valid" }> {
  const res = await axiosInstance.get(
    `/v1/member/check-nickname?nickname=${nickname}`
  );
  return res.data;
}
