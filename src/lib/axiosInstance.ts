import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { apiEndpoint } from "@/app/shared/config/constants";

const axiosInstance = axios.create({ baseURL: apiEndpoint });

/** ✅ 1. 요청 인터셉터 - 토큰 자동 삽입 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // ✅ 실행 시점에 직접 호출
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** ✅ 2. 응답 인터셉터 - 토큰 만료 시 재발급 + 재요청 */
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { user, setAccessToken, setUser, resetAuth } =
      useAuthStore.getState();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      user?.refreshToken &&
      user?.deviceId
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${apiEndpoint}/v1/tokens/reissue`, {
          refreshToken: user.refreshToken,
          deviceId: user.deviceId,
        });

        const { accessToken: newToken, user: newUser } = res.data;
        setAccessToken(newToken);
        setUser(newUser);

        // ✅ 재요청 시에도 새 토큰 삽입
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch {
        resetAuth();
        return Promise.reject("세션 만료");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
