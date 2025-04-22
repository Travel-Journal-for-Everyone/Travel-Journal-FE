import axiosInstance from "@/lib/axiosInstance";

export async function checkNickname(
  nickname: string
): Promise<{ status: "duplicate" | "valid" | "containsBadWord" }> {
  try {
    await axiosInstance.get(`/v1/member/check-nickname/${nickname}`);
    return { status: "valid" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.status;

    if (status === 409 && message === "duplicate") {
      return { status: "duplicate" };
    }

    if (status === 409 && message === "containsBadWord") {
      return { status: "containsBadWord" };
    }

    throw new Error("닉네임 확인 중 알 수 없는 오류가 발생했습니다.");
  }
}
