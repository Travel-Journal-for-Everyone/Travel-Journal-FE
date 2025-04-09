import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  memberId: number;
  email?: string;
  name?: string;
  nickname?: string;
  profileImageUrl?: string;
  refreshToken: string;
  deviceId: string;
}

export interface RegionStat {
  regionName: string;
  travelDiaryCount: number;
  placesCount: number;
}

export interface ProfileInfo {
  nickname: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  profileInfo: ProfileInfo | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setProfileInfo: (info: ProfileInfo) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      profileInfo: null,
      setUser: (user) => {
        console.log("✅ 유저 정보 저장:", user);
        set({ user });
      },
      setAccessToken: (token) => {
        console.log("✅ Access Token 저장:", token);
        set({ accessToken: token });
      },
      setProfileInfo: (info) => {
        console.log("✅ 프로필 정보 저장:", info);
        set({ profileInfo: info });
      },
      resetAuth: () =>
        set({ accessToken: null, user: null, profileInfo: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
