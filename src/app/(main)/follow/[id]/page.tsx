import FollowPageView from "@/features/follow/ui/FollowPageView";

type PageParams = Promise<{ id: number }>;

export default async function OtherFollowPage({
  params,
}: {
  params: PageParams;
}) {
  const { id } = await params;
  return <FollowPageView memberId={id} />;
}
