import { OverviewPageContent } from "./_components/PageContent";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ shotglass: string }>;
}) {
  const params = await searchParams;
  const shotglassUuid = params.shotglass;

  if (!shotglassUuid) {
    return redirect("/");
  }

  return <OverviewPageContent shotglassUuid={shotglassUuid} />;
}
