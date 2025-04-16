import axiosInstance from "@/lib/axiosInstance";

export async function checkNickname(nickname: string) {
  const res = await axiosInstance.get(
    `/v1/member/check-nickname/${encodeURIComponent(nickname)}`
  );
  return res.data;
}
