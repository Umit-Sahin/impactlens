// app/admin/domains/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "../../components/admin/DeleteButton";


export default async function AdminDomainsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    include: {
      company: true,
      dataset: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Domain Records</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Domains</th>
              <th className="px-4 py-2">GitHub Projects</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.company?.name || "-"}</td>
                <td className="px-4 py-2">
                  {user.dataset?.domains?.join(", ") || "-"}
                </td>
                <td className="px-4 py-2">
                  {user.dataset?.githubLinks?.join(", ") || "-"}
                </td>
                <td className="px-4 py-2 space-x-3">
                  <Link href={`/admin/datasets/${user.dataset?.id || "#"}`}>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Edit
                    </span>
                  </Link>
                  {user.dataset && (
                    <DeleteButton datasetId={user.dataset.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
