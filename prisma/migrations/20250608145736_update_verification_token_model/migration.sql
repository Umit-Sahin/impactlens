/*
  Warnings:

  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL;
