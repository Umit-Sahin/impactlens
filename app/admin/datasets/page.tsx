// app/admin/datasets/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import { getAllDatasetsWithUserInfo } from "@lib/admin";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminDatasetsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const datasets = await getAllDatasetsWithUserInfo();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Datasets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Domains</th>
              <th className="px-4 py-2">GitHub Projects</th>
              <th className="px-4 py-2">Updated</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="px-4 py-2">{d.user.name}</td>
                <td className="px-4 py-2">{d.user.email}</td>
                <td className="px-4 py-2">{d.user.role}</td>
                <td className="px-4 py-2">{d.domains.join(", ")}</td>
                <td className="px-4 py-2">{d.githubLinks.join(", ")}</td>
                <td className="px-4 py-2">
                  {new Date(d.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 space-x-3">
                  <Link href={`/admin/datasets/${d.id}`}>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Edit
                    </span>
                  </Link>
                  <DeleteButton datasetId={d.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
