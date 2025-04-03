export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // ✅ 전체 화면으로 레이아웃 적용 안 함
}
