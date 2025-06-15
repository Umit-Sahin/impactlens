/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "username",
ADD COLUMN     "currentStep" TEXT,
ADD COLUMN     "emailVerifiedAt" TIMESTAMP(6),
ADD COLUMN     "hasActivePayment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasUsedDemo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invitedAt" TIMESTAMP(3),
ADD COLUMN     "invitedByUserId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "lastPasswordChangeAt" TIMESTAMP(3),
ADD COLUMN     "loginCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "notificationSettings" JSONB,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "planLevel" "Plan",
ADD COLUMN     "preferredLanguage" TEXT,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "surname" TEXT NOT NULL,
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" SET NOT NULL;
