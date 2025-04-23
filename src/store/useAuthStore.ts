import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  memberId: number;
  email?: string;
  name?: string;
  nickname: string;
  profileImageUrl: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  followerCount: number;
  followingCount: number;
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
  profileInfo: ProfileInfo | null;

  // 전체 유저 정보 저장
  setUser: (user: User) => void;

  // 로그인 직후 memberId만 임시 저장
  setMemberIdOnly: (memberId: number) => void;

  // 프로필만 별도 저장
  setProfileInfo: (info: ProfileInfo) => void;

  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profileInfo: null,

      setUser: (user) => set({ user }),

      // ✅ 로그인 직후 호출하는 함수: memberId만 저장
      setMemberIdOnly: (memberId) =>
        set({
          user: {
            memberId,
            nickname: "",
            profileImageUrl: "",
            accountScope: "PUBLIC",
            followerCount: 0,
            followingCount: 0,
            travelDiaryCount: 0,
            placesCount: 0,
          },
        }),

      setProfileInfo: (info) => set({ profileInfo: info }),
      resetAuth: () => set({ user: null, profileInfo: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
