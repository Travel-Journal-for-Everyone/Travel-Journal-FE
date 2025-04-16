export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" bg-gradient-to-b from-white via-[#E9FDFF] to-[#F9FEFF] md:bg-white md:bg-none h-screen-without-nav  overflow-hidden">
      {children}
    </main>
  );
}
