//app/product/data-entry/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function DataEntryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Data Entry</h1>
      <p className="text-sm text-gray-600">
        Burada ürünle ilgili temel veri girişlerini yapabilirsiniz.
      </p>
    </div>
  );
}
