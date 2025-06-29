// app/admin/dashboard/page.tsx


import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import prisma from "@lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const [userCount, datasets, totalPayment, recentPayment, logLevels] = await Promise.all([
    prisma.user.count(),
    prisma.userDataset.findMany({ select: { domains: true } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
    }),
    prisma.log.groupBy({
      by: ["level"],
      _count: { level: true }
    })
  ]);

  const totalDomains = datasets.reduce((sum, d) => sum + d.domains.length, 0);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
        <p className="text-2xl font-bold text-gray-900">{userCount}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Domains</h3>
        <p className="text-2xl font-bold text-gray-900">{totalDomains}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Payment</h3>
        <p className="text-xl font-semibold text-green-700">${totalPayment._sum.amount?.toFixed(2) || "0.00"}</p>
        <p className="text-sm text-gray-500">
          Last 30 Days: ${recentPayment._sum.amount?.toFixed(2) || "0.00"}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Log Summary</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          {logLevels.map((log) => (
            <li key={log.level} className="flex justify-between">
              <span className="capitalize">{log.level}</span>
              <span className="font-semibold">{log._count.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
