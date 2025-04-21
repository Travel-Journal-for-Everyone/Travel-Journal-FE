import { deleteCookie, getCookie } from "@/lib/cookieUtils";
import { apiEndpoint } from "@/app/shared/config/constants";
import axiosInstance from "@/lib/axiosInstance";

export async function logout() {
  const deviceId = getCookie("deviceId");
  if (!deviceId) throw new Error("디바이스 ID가 없습니다.");

  const formData = new FormData();
  formData.append("deviceId", deviceId);

  await axiosInstance.post(`${apiEndpoint}/v1/auth/logout`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("deviceId");
  deleteCookie("memberId");
}
