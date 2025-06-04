import axiosInstance from "@/lib/axiosInstance";

export async function blockUser(blockedId: number) {
  try {
    const res = await axiosInstance.post(`/v1/block/${blockedId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
