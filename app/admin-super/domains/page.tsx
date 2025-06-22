// 📄 app/admin-super/domains/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import prisma from "@lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

/* ----------------------------- 📌 Arayüz Tipi ----------------------------- */
interface SearchParams {
  page?: string;
  limit?: string;
}

/* ---------------------- 🔐 Giriş ve Yetki Kontrolü ------------------------ */
export default async function AdminSuperDomainsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized"); // Erişim kontrolü
  }

  /* ---------------------- 📄 Sayfalandırma Değerleri ---------------------- */
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = parseInt(searchParams?.limit || "10", 10);
  const skip = (page - 1) * limit;

  /* ------------- 🗃️ Kullanıcıları Veri Tabanından Çekme ------------------ */
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      include: {
        company: true,
        dataset: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  /* ----------------------------- 🧾 UI Çıktısı ---------------------------- */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Domain Records</h1>

      {/* 📋 Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border rounded overflow-hidden">
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
                  <Link href={`/admin-super/datasets/${user.dataset?.id || "#"}`}>
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

      {/* 🔁 Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600 mt-4 rounded border">
          <span>Total: {total} records</span>
          <div className="space-x-2">
            <Link href={`?page=${page - 1}&limit=${limit}`}>
              <button
                disabled={page <= 1}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`?page=${p}&limit=${limit}`}>
                <button
                  className={`px-3 py-1 border rounded ${
                    p === page
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {p}
                </button>
              </Link>
            ))}
            <Link href={`?page=${page + 1}&limit=${limit}`}>
              <button
                disabled={page >= totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
