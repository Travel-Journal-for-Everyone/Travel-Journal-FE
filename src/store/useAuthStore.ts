import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email?: string;
  name?: string;
  nickname?: string;
  profileImageUrl?: string;
  refreshToken: string;
  deviceId: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => {
        console.log("✅ 유저 정보 저장:", user);
        set({ user });
      },
      setAccessToken: (token) => {
        console.log("✅ Access Token 저장:", token);
        set({ accessToken: token });
      },
      logout: () => {
        console.log("🚪 로그아웃 수행");
        set({ user: null, accessToken: null });
        sessionStorage.removeItem("auth-storage"); // ✅ 세션 스토리지 삭제
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          console.log(`🔍 세션 스토리지에서 ${name} 가져옴:`, item);
          return item ? JSON.parse(item) : null; // ✅ JSON 변환
        },
        setItem: (name, value) => {
          console.log(`💾 세션 스토리지에 ${name} 저장:`, value);
          sessionStorage.setItem(name, JSON.stringify(value)); // ✅ JSON 변환 후 저장
        },
        removeItem: (name) => {
          console.log(`🗑️ 세션 스토리지에서 ${name} 삭제`);
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
