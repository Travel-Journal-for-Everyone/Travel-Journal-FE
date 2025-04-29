export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-md m-auto md:pt-20 p-6 md:p-4  md:min-h-screen">
      <main>{children}</main>
    </div>
  );
}
