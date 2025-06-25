import Header from "@/features/common/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className=" bg-gradient-to-b from-white via-[#E9FDFF] to-[#F9FEFF] md:bg-white md:bg-none overflow-x-hidden p-4 pt-6 max-w-desktop min-h-screen">
        {children}
        {/* h-screen-without-nav  height값의 경우 추후에 레이아웃 전용 리팩토링에서 공통구조로 설계예정*/}
      </main>
    </>
  );
}
