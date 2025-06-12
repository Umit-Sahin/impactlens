// app/admin/logs/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import LogsPageWrapper from "app/components/admin/LogsPageWrapper";

export default async function LogsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return <LogsPageWrapper />;
}
