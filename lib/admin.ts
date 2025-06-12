// lib/admin.ts

import prisma from "@/lib/prisma";

// ✅ Dataset'leri kullanıcı bilgileriyle birlikte getir
export async function getAllDatasetsWithUserInfo() {
  return await prisma.userDataset.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

// ✅ Entity listesi — EntityRegistryPage için
export async function getAllEntities() {
  return await prisma.entity.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      location: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
