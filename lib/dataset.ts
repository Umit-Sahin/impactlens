//lib/dataset.ts

import prisma from "@lib/prisma";

export async function getUserDataset(userId: string) {
  const dataset = await prisma.userDataset.findUnique({
    where: { userId },
  });

  // Eğer kayıt yoksa boş değerlerle dön
  return dataset ?? {
    domains: [],
    githubLinks: [],
  };
}
