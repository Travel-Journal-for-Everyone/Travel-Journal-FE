import MemberClientPage from "@/features/member/MemberClientPage";

interface Props {
  params: { id: string };
}

export default function MemberPage({ params }: Props) {
  return <MemberClientPage memberId={Number(params.id)} />;
}
