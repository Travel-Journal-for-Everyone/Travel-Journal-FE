import Header from "@/features/common/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="layout-main">{children}</main>
    </>
  );
}
