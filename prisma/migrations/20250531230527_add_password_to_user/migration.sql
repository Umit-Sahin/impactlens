/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "password" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT DEFAULT 'user';
