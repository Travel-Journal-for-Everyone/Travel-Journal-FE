import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { apiEndpoint } from "@/app/shared/config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchWithAuth<T = any>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> {
  const { accessToken, user, setAccessToken, setUser, resetAuth } =
    useAuthStore.getState();

  const makeRequest = async (token: string) => {
    return axios({
      ...config,
      url: `${apiEndpoint}${url}`,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    return await makeRequest(accessToken!);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error.response?.status === 401 &&
      user?.refreshToken &&
      user?.deviceId
    ) {
      try {
        const res = await axios.post(`${apiEndpoint}/v1/tokens/reissue`, {
          refreshToken: user.refreshToken,
          deviceId: user.deviceId,
        });

        const { accessToken: newToken, user: newUser } = res.data;

        setAccessToken(newToken);
        setUser(newUser);

        return await makeRequest(newToken);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (refreshError) {
        resetAuth();
        throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
      }
    }

    throw error;
  }
}
