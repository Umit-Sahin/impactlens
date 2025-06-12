//app/product/dataset/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserDataset } from "@/lib/dataset";
import { DatasetForm } from "./DatasetForm"; 

export default async function DatasetPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.user?.role) {
    redirect("/signin");
  }

  const dataset = await getUserDataset(session.user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dataset Settings</h1>
      <DatasetForm dataset={dataset} plan={session.user.plan as "BASIC" | "PRO" | "ENTERPRISE"} />

    </div>
  );
}
