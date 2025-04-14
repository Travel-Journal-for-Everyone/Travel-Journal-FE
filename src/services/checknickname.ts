import axiosInstance from "@/lib/axiosInstance";

export async function checkNickname(nickname: string) {
  const res = await axiosInstance.get(`/v1/members/check-nickname/${nickname}`);
  return res.data;
}
