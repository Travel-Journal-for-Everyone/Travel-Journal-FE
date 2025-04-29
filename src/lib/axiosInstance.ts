import axios from "axios";
import { apiEndpoint } from "@/app/shared/config/constants";
import { getCookie, setCookie } from "./cookieUtils";
import { useAuthStore } from "@/store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = getCookie("refreshToken");
    const deviceId = getCookie("deviceId");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      deviceId
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${apiEndpoint}/v1/tokens/reissue`, {
          refreshToken,
          deviceId,
        });

        const authHeader =
          res.headers["authorization"] || res.headers["Authorization"];
        const newAccessToken = authHeader?.replace("Bearer ", "");

        if (!newAccessToken) throw new Error("accessToken 누락");

        setCookie("accessToken", newAccessToken);

        // ✅ Authorization 헤더 갱신 후 원래 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (reissueError) {
        useAuthStore.getState().resetAuth(); // 실패 시 로그인 초기화
        return Promise.reject("세션 만료");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
