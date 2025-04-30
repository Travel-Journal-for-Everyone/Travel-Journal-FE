// /store/useOtherAuthStore.ts
import { create } from "zustand";

interface OtherUserInfo {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  followerCount: number;
  followingCount: number;
  travelDiaryCount: number;
  placesCount: number;
}

interface OtherAuthState {
  otherUser: OtherUserInfo | null;
  setOtherUser: (user: OtherUserInfo) => void;
  resetOtherUser: () => void;
}

export const useOtherAuthStore = create<OtherAuthState>((set) => ({
  otherUser: null,
  setOtherUser: (user) => set({ otherUser: user }),
  resetOtherUser: () => set({ otherUser: null }),
}));
