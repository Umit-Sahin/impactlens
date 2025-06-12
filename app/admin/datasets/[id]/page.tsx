//app/admin/datasets/[id]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";



type PageProps = {
  params: { id: string };
};

export default async function AdminDatasetEditPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const dataset = await prisma.userDataset.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!dataset) notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Edit Dataset</h1>
      <p className="text-sm text-gray-500 mb-4">
        {dataset.user.name} ({dataset.user.email}) - Role: {dataset.user.role}
      </p>

      <form
        action={`/api/admin/dataset/${params.id}`}
        method="POST"
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Domains (seperate with comma)</label>
          <textarea
            name="domains"
            className="w-full border rounded p-2 text-sm"
            defaultValue={dataset.domains.join(", ")}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub Project Links (seperate with comma)</label>
          <textarea
            name="githubLinks"
            className="w-full border rounded p-2 text-sm"
            defaultValue={dataset.githubLinks.join(", ")}
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
