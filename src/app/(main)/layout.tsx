export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-md m-auto md:pt-20 px-2 md:px-4  md:min-h-screen">
      <main>{children}</main>
    </div>
  );
}
