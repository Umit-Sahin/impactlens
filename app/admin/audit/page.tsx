// app/admin/audit/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuditTrailPageWrapper from "app/components/admin/AuditTrailPageWrapper";

export default async function AuditTrailPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return <AuditTrailPageWrapper />;
}
