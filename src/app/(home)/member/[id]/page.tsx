import MemberClientPage from "@/features/member/MemberClientPage";
type PageParams = Promise<{ id: number }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  return <MemberClientPage memberId={id} />;
}
