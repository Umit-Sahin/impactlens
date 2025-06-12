-- CreateTable
CREATE TABLE "UserDataset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domains" TEXT[],
    "githubLinks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDataset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDataset_userId_key" ON "UserDataset"("userId");

-- AddForeignKey
ALTER TABLE "UserDataset" ADD CONSTRAINT "UserDataset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
