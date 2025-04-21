import { logout } from "../auth/hooks/useLogout";

export function BtnLogout() {
  const handleLogOut = async () => {
    try {
      await logout();
      // ✅ 필요하면 로그아웃 후 이동 처리
      // router.push("/login");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return <button onClick={handleLogOut}>로그아웃</button>;
}
